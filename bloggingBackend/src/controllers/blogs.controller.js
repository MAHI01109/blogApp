import Blog from "../models/Blog.model.js";
import Category from "../models/Category.model.js";
import calculatePostTime from "../utils/calculateLastTime.js";
import extractDateFromISOString from "../utils/extractDate.js";
import uploadOnCloudinary from "../utils/cloudnary.js";
import User from "../models/User.model.js";

export const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const search = req.query.search || " ";

  let authorIds = [];
  let categoryIds = [];

  if (search.trim() !== "") {
    try {
      const users = await User.find(
        { username: { $regex: search, $options: "i" } },
        "_id"
      );
      authorIds = users.map((u) => u._id);
    } catch (error) {
      console.log(error);
    }
  }

  if (search.trim() !== "") {
    try {
      const category = await Category.find(
        { name: { $regex: search, $options: "i" } },
        "_id"
      );
      categoryIds = category.map((u) => u._id);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [search] } },
        ...(authorIds.length > 0 ? [{ author: { $in: authorIds } }] : []),
        ...(categoryIds.lenght > 0 ? [{ category: { $in: categoryIds } }] : []),
      ],
    };

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .populate([
        { path: "owner", select: "email profileImage username" },
        { path: "author", select: "username" },
      ])
      .skip(skip)
      .limit(limit);
    // console.log(blogs);

    const updatedBlogs = blogs.map((item) => ({
      id: item?._id,
      title: item?.title,
      slug: item?.slug,
      author: item?.author?.username || "Unknown",
      postTime: calculatePostTime(item?.createdAt),
      tags: item?.tags,
      thumbnail: item?.thumbnailsImage,
      excerpt: item?.excerpt,
    }));

    return res.status(200).json({
      message: "All blog posts fetched",
      page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
      blogs: updatedBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getHotBlogs = async (req, res) => {
  try {
    const response = await Blog.find().limit(5).sort({ createdAt: -1 });
    const updatedBlogs = response.map((blog) => {
      return {
        id: blog?._id,
        thumbnail: blog?.thumbnailsImage,
        title: blog?.title,
        category: blog?.category,
        date: extractDateFromISOString(blog?.createdAt),
      };
    });

    return res
      .status(200)
      .json({ message: "successfull", blogs: updatedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const userId = req?.session?.passport?.user;
    const blogs = await Blog.find({ owner: userId });
    const updatedBlogs = blogs.map((item) => ({
      id: item?._id,
      title: item?.title,
      slug: item?.slug,
      author: item?.author,
      time: calculatePostTime(item?.createdAt),
      tags: item?.tags,
      thumbnailsImage: item?.thumbnailsImage,
    }));

    return res
      .status(200)
      .json({ message: "All blog posts fetched", blogs: updatedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// api used for latest blog in home
export const getLatestBlogs = async (req, res) => {
  try {
    const now = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(now.getDate() - 5);

    const blogs = await Blog.find({
      createdAt: {
        $gte: fiveDaysAgo,
        $lte: now,
      },
    })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username" });

    const updatedBlogs = blogs.map((item) => {
      return {
        id: item?._id,
        title: item?.title,
        slug: item?.slug,
        author: item?.author.username || "Unknown",
        time: calculatePostTime(item?.createdAt),
        tags: item?.tags,
        thumbnail: item?.thumbnailsImage,
      };
    });

    return res
      .status(200)
      .json({ message: "Last 5 days blogs fetched", blogs: updatedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPopularBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ views: -1 });
    const updatedBlogs = blogs.map((item) => ({
      id: item?._id,
      title: item?.title,
      slug: item?.slug,
      author: item?.author,
      time: calculatePostTime(item?.createdAt),
      date: extractDateFromISOString(item?.createdAt),
      tags: item?.tags,
      thumbnail: item?.thumbnailsImage,
    }));

    return res
      .status(200)
      .json({ message: "Last 5 days blogs fetched", blogs: updatedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getBlogBYslugId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "invalid blog id" });
    }
    const blog = await Blog.find({ slug: id }).populate([
      { path: "owner", select: "profileImage username email" },
      { path: "author", select: "username" },
    ]);
    if (!blog) {
      return res.status(400).json({ message: "invalid blog " });
    }
    // console.log(blog);

    const updatedBlog = blog.map((item) => {
      return {
        id: item?._id,
        title: item?.title,
        slug: item?.slug,
        content: item?.content,
        thumbnail: item?.thumbnailsImage,
        views: item?.views,
        excerpt: item?.excerpt,
        postDate: extractDateFromISOString(item?.createdAt),
        postTime: calculatePostTime(item?.createdAt),
        category: item?.category,
        author: item?.author?.username,
        tags: item?.tags,
        isFeatured: item?.isFeatured,
        owner: item?.owner,
      };
    });
    //   console.log(updatedBlog);

    res.status(200).json({ message: "your blog ", blog: updatedBlog });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const postBlogs = async (req, res) => {
  try {
    const userId = req?.session?.passport?.user;
    const coverImageLocalPath = req?.file?.path;
    // console.log(coverImageLocalPath);

    if (!coverImageLocalPath) {
      return res.status(400).json({ message: "Cover image file is missing" });
    }

    const thumbnailsImageUrl = await uploadOnCloudinary(coverImageLocalPath);

    if (!thumbnailsImageUrl.url) {
      return res
        .status(400)
        .json({ message: "Error while uploading on profile image" });
    }
    const { category, content, excerpt, isFeatured, slug, tags, title } =
      req.body;
    // console.log(req.body);

    if (
      !category ||
      !content ||
      !excerpt ||
      typeof isFeatured === "undefined" ||
      !slug ||
      !tags ||
      !title
    ) {
      return res.status(400).json({ message: "All field are required" });
    }
    const tagsArray = Array.isArray(tags)
      ? tags
      : tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
    const updatedSlug = slug.split(" ").join("-");
    // console.log(slug, updatedSlug);

    const newPost = await Blog.create({
      ...req.body,
      tags: tagsArray,
      owner: userId,
      slug: updatedSlug,
      thumbnailsImage: thumbnailsImageUrl.url,
      author: userId,
    });
    return res
      .status(201)
      .json({ message: "post added successfully", newPost });
  } catch (error) {
    console.log(error, "somthing went wrong");
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};
