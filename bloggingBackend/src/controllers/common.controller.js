import Category from "../models/Category.model.js";

export const createCategory = async (req, res) => {
  const categories = [
    { name: "AI & Machine Learning" },
    { name: "Cybersecurity" },
    { name: "Mobile Development" },
    { name: "UI/UX Design" },
    { name: "Cloud Computing" },
    { name: "Testing & QA" },
    { name: "Performance Optimization" },
    { name: "Software Architecture" },
    { name: "Open Source" },
    { name: "Career & Interviews" },
    { name: "Food" },
    { name: "Travel" },
    { name: "Sports" },
    { name: "Health & Fitness" },
    { name: "Fashion" },
    { name: "Beauty" },
    { name: "Photography" },
    { name: "Parenting" },
    { name: "Finance" },
    { name: "Home Decor" },
    { name: "Personal Development" },
    { name: "Relationships" },
    { name: "Education" },
    { name: "Lifestyle" },
    { name: "Entertainment" },
    { name: "Pets" },
    { name: "DIY & Crafts" },
    { name: "Gardening" },
    { name: "Automotive" },
    { name: "Spirituality" },
    { name: "Web Accessibility" },
    { name: "Data Structures" },
    { name: "Algorithms" },
    { name: "Project Management" },
    { name: "Tech News" },
    { name: "API Design" },
    { name: "GraphQL" },
    { name: "Dev Tools" },
    { name: "WebSockets" },
    { name: "NoSQL Databases" },
    { name: "Agile Development" },
    { name: "Version Control" },
    { name: "Static Site Generators" },
    { name: "Code Reviews" },
    { name: "Continuous Integration" },
    { name: "Productivity Tips" },
    { name: "Freelancing" },
    { name: "Web Animation" },
    { name: "Data Visualization" },
    { name: "Web3 & Blockchain" },
  ];
  try {
    const category = await Category.find();
    res.status(200).json({ message: "succes", category });
  } catch (err) {
    console.error("Error inserting categories:", err);
  }
};

export const getBlogCategory = async (req, res) => {
  try {
    async function fetchdata() {
      const categories = await Category.find();
      const updatedCategories = await categories.map((category) => {
        return {
          id: category?._id,
          value: category?.name.toLowerCase(),
          label:
            category?.name.charAt(0).toUpperCase() + category?.name.slice(1),
        };
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(updatedCategories);
        }, 5000);
      });
    }
    const data = await fetchdata();

    res.status(200).json({ message: "success", result: data });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCategoryWithBlogs = async (categoryId) => {
  const category = await Category.findById(categoryId).populate("blogs");
  return category;
};
