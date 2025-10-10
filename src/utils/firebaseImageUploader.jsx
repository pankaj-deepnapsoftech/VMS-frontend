import { config } from "@/config/env.config";
import { Storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";


function handleFileStorage (env) {
    switch (env) {
        case "development":
            return config.LOCAL_FILE;
        case "Demo":
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














