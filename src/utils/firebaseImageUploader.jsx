import { config } from "@/config/env.config";
import { Storage } from "@/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";


function handleFileStorage(env) {
  switch (env) {
    case "development":
      return config.LOCAL_FILE;
    case "demo":
      return config.DEMO_FILE;
    case "vapt":
      return config.VAPT_FILE;
    case "securend":
      return config.SECUREND_FILE;
  }
}

// ---------------------- firebase image uploader start ------------------------
export const Imageuploader = async (image) => {
  const extension = image.name.split('.').pop();
  try {
    const imageref = ref(Storage, `${handleFileStorage(config.REACT_ENV)}/${uuid()}.${extension}`);
    const object = await uploadBytes(imageref, image);
    const url = await getDownloadURL(imageref);
    return { image_url: url, image_id: object.metadata.name };
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  };
};
// =====================firebase image uploader end ==============================



// --------------------- firebase image delete start ---------------------------
export const DeleteImage = async (path) => {
  try {
    const imageRef = ref(Storage, `${handleFileStorage(config.REACT_ENV)}/${path}`);
    await deleteObject(imageRef);
  } catch (error) {
    console.log(error);
  };
};
// ------------------- firebase image delete end -------------------------------


// ---------------------- firebase image update start -----------------------------
export const UpdateImage = async (newImage, image) => {
  try {
    await DeleteImage(image);
    return await Imageuploader(newImage)
  } catch (error) {
    console.log(error);
  };
};
// ------------------- firebase image update end -------------------------------















