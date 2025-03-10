import nextConnect from "next-connect";
import { NextResponse } from "next/server";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect({
  onError: (err, req, res) => {
    return NextResponse.json(
      { error: `Server error: ${err.message}` },
      { status: 500 }
    );
  },
  onNoMatch: (req, res) => {
    return NextResponse.json(
      { error: `Method ${req.method} not allowed` },
      { status: 405 }
    );
  },
});

handler.use(upload.single("file"));

export async function POST(request) {
  try {
    const req = request;
    const res = {
      json: (data) => NextResponse.json(data),
      status: (code) => ({
        json: (data) => NextResponse.json(data, { status: code }),
      }),
    };

    await handler.run(req, res);

    const fileBuffer = req.file.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileBuffer}`
    );

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
