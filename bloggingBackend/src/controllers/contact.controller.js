import Contact from '../models/Contact.mode.js';

export const userQuery = async (req, res) => {

    try {
        const { name, email, usermessage } = req.body
        if (!name || !email || !usermessage) {
            return res.status(400).json({ message: "all field are required" })
        };
        const response = await Contact.create({
            name: name,
            email: email,
            message: usermessage
        });
        return res.status(200).json({ message: 'your message is added successfully', response });
    } catch (error) {
        console.log(error.message, "somthing went wrong");
        res.status(500).json({ message: "Something went wrong. Try again." });
    };
};