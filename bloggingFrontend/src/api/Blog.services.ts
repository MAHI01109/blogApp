import axios from "./axios"


export const fetchAllBlogs = async () => {
    try {
        const response = await axios.get('/blog/all-blogs');
        return response.data.blogs
    } catch (error) {
        console.log(error);
    }
}