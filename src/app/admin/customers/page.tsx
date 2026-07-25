"use client";

import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "name", label: "Name", required: true },
  { key: "email", label: "Email", type: "email" as const, required: true },
  { key: "phone", label: "Phone", required: true },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
];

const displayColumns = ["Name", "Email", "Phone", "Country", "City", "Joined"];

export default function CustomersPage() {
  return (
    <AdminDataTable
      title="Customers"
      apiEndpoint="/api/customers"
      fields={fields}
      displayColumns={displayColumns}
      renderCell={(item, key) => {
        if (key === "joined")
          return new Date(item.createdAt as string).toLocaleDateString();
        return String(item[key] ?? "");
      }}
    />
  );
}
