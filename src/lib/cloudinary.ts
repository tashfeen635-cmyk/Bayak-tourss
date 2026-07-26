import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File): Promise<{ url: string; publicId: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "bayak-tours",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function extractPublicId(url: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;

  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    const afterUpload = parts.slice(uploadIndex + 1);

    if (afterUpload[0] && /^\d+$/.test(afterUpload[0])) {
      afterUpload.shift();
    }

    const pathWithExt = afterUpload.join("/");
    const lastDot = pathWithExt.lastIndexOf(".");
    if (lastDot === -1) return pathWithExt;
    return pathWithExt.substring(0, lastDot);
  } catch {
    return null;
  }
}
