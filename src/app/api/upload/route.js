import nextConnect from "next-connect";
import multer from "multer";
import cloudinary from "../../../lib/cloudinary";

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
    const fileBuffer = req.file.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileBuffer}`
    );
    res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
