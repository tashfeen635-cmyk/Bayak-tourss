"use client";

import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "name", label: "Name", required: true },
  { key: "country", label: "Country", required: true },
  { key: "text", label: "Testimonial Text", type: "textarea" as const, required: true },
  { key: "rating", label: "Rating (1-5)", type: "number" as const },
  { key: "avatar", label: "Avatar", type: "image" as const },
];

const displayColumns = ["Name", "Country", "Rating", "Text"];

export default function TestimonialsPage() {
  return (
    <AdminDataTable
      title="Testimonials"
      apiEndpoint="/api/testimonials"
      fields={fields}
      displayColumns={displayColumns}
      renderCell={(item, key) => {
        if (key === "rating") {
          const rating = Math.max(0, Math.min(5, Number(item.rating) || 0));
          return (
            <span className="text-yellow-500">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>
          );
        }
        if (key === "text") {
          const text = String(item.text ?? "");
          return text.length > 80 ? text.slice(0, 80) + "..." : text;
        }
        return String(item[key] ?? "");
      }}
    />
  );
}
