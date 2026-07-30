"use client";

import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "customerName", label: "Customer Name", required: true },
  { key: "email", label: "Email", type: "email" as const, required: true },
  { key: "phone", label: "Phone", required: true },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "destinationName", label: "Destination", required: true },
  { key: "groupType", label: "Group Type", type: "select" as const, options: ["Solo", "Couple", "Family", "Friends", "Corporate", "Student", "Other"] },
  { key: "adults", label: "Adults", type: "number" as const },
  { key: "children", label: "Children", type: "number" as const },
  { key: "duration", label: "Duration" },
  { key: "specialRequests", label: "Special Requests", type: "textarea" as const },
  { key: "status", label: "Status", type: "select" as const, options: ["pending", "confirmed", "cancelled", "completed"] },
];

const displayColumns = ["Customer Name", "Destination", "Status", "Created"];

export default function BookingsPage() {
  return (
    <AdminDataTable
      title="Bookings"
      apiEndpoint="/api/bookings"
      fields={fields}
      displayColumns={displayColumns}
      renderCell={(item, key) => {
        if (key === "status") {
          const colors: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-700",
            confirmed: "bg-green-100 text-green-700",
            cancelled: "bg-red-100 text-red-700",
            completed: "bg-blue-100 text-blue-700",
          };
          const status = (item.status as string) || "pending";
          return (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || ""}`}
            >
              {status}
            </span>
          );
        }
        if (key === "created")
          return new Date(item.createdAt as string).toLocaleDateString();
        return String(item[key] ?? "");
      }}
    />
  );
}
