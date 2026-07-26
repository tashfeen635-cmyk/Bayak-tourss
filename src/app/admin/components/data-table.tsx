"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";

interface Field {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "url" | "email" | "checkbox" | "image";
  options?: string[];
  required?: boolean;
  hidden?: boolean;
}

interface AdminDataTableProps {
  title: string;
  apiEndpoint: string;
  fields: Field[];
  displayColumns: string[];
  renderCell?: (item: Record<string, unknown>, key: string) => React.ReactNode;
}

export function AdminDataTable({
  title,
  apiEndpoint,
  fields,
  displayColumns,
  renderCell,
}: AdminDataTableProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchItems();
    }
  }, [fetchItems]);

  const openModal = (item?: Record<string, unknown>) => {
    if (item) {
      setEditingItem(item);
      const form: Record<string, unknown> = {};
      fields.forEach((f) => {
        form[f.key] = item[f.key] ?? "";
      });
      setFormData(form);
    } else {
      setEditingItem(null);
      const form: Record<string, unknown> = {};
      fields.forEach((f) => {
        if (f.type === "checkbox") form[f.key] = false;
        else if (f.type === "number") form[f.key] = 0;
        else form[f.key] = "";
      });
      setFormData(form);
    }
    setIsModalOpen(true);
    setUploadError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `${apiEndpoint}/${editingItem._id}`
        : apiEndpoint;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`${apiEndpoint}/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    search
      ? Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      : true
  );

  const visibleFields = fields.filter((f) => !f.hidden);

  const handleFileUpload = async (fieldKey: string, file: File) => {
    setUploading(fieldKey);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, [fieldKey]: data.url }));
      } else {
        setUploadError(data.error || "Upload failed. Check server configuration.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Network error. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          {title}
        </h1>
        <Button onClick={() => openModal()} size="sm">
          <Plus className="size-4 mr-1" />
          Add New
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {displayColumns.map((col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3 font-medium text-muted-foreground"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={displayColumns.length + 1}
                      className="text-center py-8 text-muted-foreground"
                    >
                      <Loader2 className="size-5 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={displayColumns.length + 1}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No items found.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item._id as string}
                      className="border-b border-border last:border-0 hover:bg-muted/50"
                    >
                      {displayColumns.map((col) => {
                        const field = fields.find((f) => f.label === col || f.key === col);
                        const key = field?.key || col.toLowerCase().replace(/\s+/g, "_");
                        return (
                          <td key={col} className="px-4 py-3">
                            {renderCell
                              ? renderCell(item, key)
                              : String(item[key] ?? "")}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openModal(item)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(item._id as string)}
                          >
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingItem ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {visibleFields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-sm font-medium">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full min-h-[80px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                      value={(formData[field.key] as string) || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      required={field.required}
                    />
                  ) : field.type === "select" && field.options ? (
                    <select
                      className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
                      value={(formData[field.key] as string) || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      required={field.required}
                    >
                      <option value="">Select...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={(formData[field.key] as boolean) || false}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.key]: e.target.checked })
                        }
                        className="rounded"
                      />
                      {field.label}
                    </label>
                  ) : field.type === "image" ? (
                    <div className="space-y-2">
                      {(formData[field.key] as string) ? (
                        <div className="relative group w-full max-w-[200px]">
                          <img
                            src={formData[field.key] as string}
                            alt={field.label}
                            className="w-full h-32 object-cover rounded-lg border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, [field.key]: "" })}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ) : null}
                      {uploadError && (
                        <p className="text-xs text-red-500">{uploadError}</p>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted-foreground hover:border-gold/50 hover:text-gold transition-colors">
                          <Upload className="size-4" />
                          {uploading === field.key ? "Uploading..." : "Choose image"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(field.key, file);
                          }}
                        />
                      </label>
                    </div>
                  ) : field.type === "number" ? (
                    <Input
                      type="number"
                      value={(formData[field.key] as number) || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: Number(e.target.value),
                        })
                      }
                      required={field.required}
                    />
                  ) : (
                    <Input
                      type={field.type || "text"}
                      value={(formData[field.key] as string) || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving || uploading !== null}>
                  {saving ? (
                    <Loader2 className="size-4 animate-spin mr-1" />
                  ) : null}
                  {editingItem ? "Save Changes" : "Create"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
