import { Storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";


// ---------------------- firebase image uploader start ------------------------
export const Imageuploader = async (image) => {
  const extension = image.name.split('.').pop();
  try {
    const imageref = ref(Storage, `TMS_IMAGE/${uuid()}.${extension}`);
    const object = await uploadBytes(imageref, image);
    const url = await getDownloadURL(imageref);
    return { image: url, image_id: object.metadata.name };
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  };
};














