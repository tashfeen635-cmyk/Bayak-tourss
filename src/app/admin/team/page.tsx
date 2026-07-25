import { AdminDataTable } from "../components/data-table";

const fields = [
  { key: "name", label: "Name", required: true },
  { key: "role", label: "Role", required: true },
  { key: "bio", label: "Bio", type: "textarea" as const, required: true },
  { key: "image", label: "Image", type: "image" as const },
  { key: "experience", label: "Experience" },
  { key: "specialization", label: "Specialization" },
  { key: "languages", label: "Languages (comma-separated)" },
];

const displayColumns = ["Name", "Role", "Experience", "Specialization"];

export default function TeamPage() {
  return (
    <AdminDataTable
      title="Team Members"
      apiEndpoint="/api/team"
      fields={fields}
      displayColumns={displayColumns}
    />
  );
}
