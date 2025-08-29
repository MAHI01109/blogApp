import mongoose, { Schema } from 'mongoose';

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ],
}, { timestamps: true }
)

const Category = new mongoose.model("Category", categoriesSchema);

export default Category;


