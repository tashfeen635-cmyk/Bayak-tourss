export function buildImageUrl(url: string, width?: number): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return url;

  const transforms = ["q_auto", "f_auto"];
  if (width) transforms.unshift(`w_${width}`);

  parts.splice(uploadIndex + 1, 0, transforms.join(","));
  return parts.join("/");
}
