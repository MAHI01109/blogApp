import User from "../models/User.model.js";
import passport from "passport";
import uploadOnCloudinary from "../utils/cloudnary.js";


export const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userData = { username, email, password };

  User.register(userData, password, (err, user) => {
    if (err) {
      console.error("Registration error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    passport.authenticate("local")(req, res, () => {
      res.status(201).json({ message: "User registered successfully", user });
    });
  });
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!user) return res.status(401).json({ message: info.message });
    req.login(user, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

export const getAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
};

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const updateAccountDetails = async (req, res) => {
  try {
    const userId = req?.session?.passport?.user;
    if (!userId) {
      return res.status(400).json({ message: "user is not valid" });
    };
    const updateData = req.body;

    // Handle file uploads if present (profileImage, coverImage)
    if (req.files?.profileImage?.[0]) {
      const profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
      if (profileImage.url) updateData.profileImage = profileImage.url;
    }
    if (req.files?.coverImage?.[0]) {
      const coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
      if (coverImage.url) updateData.coverImage = coverImage.url;
    }


    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -hash -salt");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    };

    res.status(200).json({ message: "User updated successfully", user: updatedUser });

  } catch (error) {
    console.log(error.message, "somthing went wrong");
    res.status(500).json({ message: "Something went wrong. Try again." });
  };
};

export const updateUserProfileImage = async (req, res) => {

  try {
    const userId = req?.session?.passport?.user;
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar file is missing" })
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      return res.status(400).json({ message: "Error while uploading on profile image" })
    };

    const user = await User.findByIdAndUpdate(userId, {
      $set: { profileImage: avatar.url }
    }, { new: true }
    ).select("-password");

    return res.status(200).json({ message: "upsated successfull user profile image", user: user })

  } catch (error) {
    console.log(error.message, "somthing went wrong");
    res.status(500).json({ message: "Something went wrong. Try again." });
  };
};


export const updateUserCoverImage = async (req, res) => {
  try {
    const userId = req?.session?.passport?.user;
    const coverImageLocalPath = req.file?.path;
    
    if (!coverImageLocalPath) {
      return res.status(400).json({ message: 'Cover image file is missing' });
    };
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage.url) {
      return res.status(400).json({ message: 'Error while uploading on cover image' })
    };

    const user = await User.findByIdAndUpdate(userId, { $set: { coverImage: coverImage.url } }, { new: true }).select("-password");

    return res.status(200).json({ message: 'cover image updated successfuly', user });

  } catch (error) {
    console.log(error.message, "somthing went wrong");
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
}