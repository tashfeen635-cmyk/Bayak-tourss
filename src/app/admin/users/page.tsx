"use client";

import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "name", label: "Name", required: true },
  { key: "email", label: "Email", type: "email" as const, required: true },
  { key: "password", label: "Password", type: "text" as const },
  { key: "role", label: "Role", type: "select" as const, options: ["admin", "editor"] },
];

const displayColumns = ["Name", "Email", "Role", "Created"];

export default function UsersPage() {
  return (
    <AdminDataTable
      title="Users"
      apiEndpoint="/api/users"
      fields={fields}
      displayColumns={displayColumns}
      renderCell={(item, key) => {
        if (key === "role") {
          const role = (item.role as string) || "editor";
          return (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {role}
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
