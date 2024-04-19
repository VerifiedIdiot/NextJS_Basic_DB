import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import multer from "multer";
import nextConnect from "next-connect";
import { v4 as uuidv4 } from "uuid";
import { firebaseClient } from "@/app/firebaseConfig/firebaseConfig";

const storage = getStorage(firebaseClient);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 최대 파일 크기: 5MB
  },
});

const handler = nextConnect();

handler.use(upload.single("image"));

handler.post(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image uploaded");
  }

  try {
    const file = req.file;
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    const imageRef = ref(storage, `images/${uniqueFileName}`);
    const snapshot = await uploadBytes(imageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);

    res
      .status(201)
      .json({ message: "Image uploaded successfully", url: downloadURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
