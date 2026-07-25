"use client";

import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "name", label: "Name", required: true },
  { key: "region", label: "Region", required: true },
  { key: "description", label: "Description", type: "textarea" as const, required: true },
  { key: "price", label: "Price (PKR)", type: "number" as const, required: true },
  { key: "originalPrice", label: "Original Price", type: "number" as const },
  { key: "duration", label: "Duration", required: true },
  { key: "rating", label: "Rating", type: "number" as const },
  { key: "reviews", label: "Reviews", type: "number" as const },
  { key: "image", label: "Image", type: "image" as const },
  { key: "category", label: "Categories (comma-separated)" },
  { key: "featured", label: "Featured", type: "checkbox" as const },
  { key: "availableDates", label: "Available Dates (comma-separated)" },
  { key: "included", label: "Included (comma-separated)" },
];

const displayColumns = ["Name", "Region", "Price", "Duration", "Rating", "Featured"];

export default function DestinationsPage() {
  return (
    <AdminDataTable
      title="Destinations"
      apiEndpoint="/api/destinations"
      fields={fields}
      displayColumns={displayColumns}
      renderCell={(item, key) => {
        if (key === "price")
          return `PKR ${(item.price as number)?.toLocaleString()}`;
        if (key === "featured")
          return item.featured ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Yes
            </span>
          ) : (
            <span className="text-muted-foreground">No</span>
          );
        return String(item[key] ?? "");
      }}
    />
  );
}
