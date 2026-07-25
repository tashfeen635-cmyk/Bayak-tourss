"use client";

import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "src", label: "Image", type: "image" as const, required: true },
  { key: "alt", label: "Alt Text", required: true },
  { key: "category", label: "Category", type: "select" as const, options: ["Mountains", "Lakes", "Adventure", "Nature", "Culture", "Other"] },
];

const displayColumns = ["Alt", "Category", "Image"];

export default function GalleryPage() {
  return (
    <AdminDataTable
      title="Gallery Images"
      apiEndpoint="/api/gallery"
      fields={fields}
      displayColumns={displayColumns}
      renderCell={(item, key) => {
        if (key === "src") {
          const url = String(item.src ?? "");
          if (!url) return <span className="text-muted-foreground text-xs">No image</span>;
          return (
            <img
              src={url}
              alt={String(item.alt ?? "")}
              className="h-10 w-10 rounded object-cover"
            />
          );
        }
        return String(item[key] ?? "");
      }}
    />
  );
}
