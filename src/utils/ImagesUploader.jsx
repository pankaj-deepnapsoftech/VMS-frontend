import axios from "axios";


export const ImageUploader = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post("https://images.deepmart.shop/upload", formData);
        return res.data?.[0];
    } catch (error) {
        console.error("Image upload failed:", error);
        return null;
    }
};