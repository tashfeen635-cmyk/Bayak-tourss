"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Upload,
  Check,
  Ban,
  Star,
} from "lucide-react";

interface Testimonial {
  _id?: string;
  name: string;
  country: string;
  text: string;
  rating: number;
  avatar: string;
  status?: "pending" | "approved" | "rejected";
}

const emptyForm: Testimonial = {
  name: "",
  country: "",
  text: "",
  rating: 5,
  avatar: "",
};

const statusTabs = ["all", "pending", "approved", "rejected"] as const;
type StatusTab = (typeof statusTabs)[number];

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Testimonial>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const fetchedRef = useRef(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchItems();
    }
  }, [fetchItems]);

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ ...emptyForm });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `/api/testimonials/${editingItem._id}`
        : "/api/testimonials";

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...payload } = formData as unknown as Record<string, unknown>;
      if (!editingItem) {
        payload.status = "approved";
      }

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchItems();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, avatar: data.url }));
      }
    } catch {
      // silent
    } finally {
      setUploading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && item.status === "pending") ||
      (activeTab === "approved" && (item.status === "approved" || !item.status)) ||
      (activeTab === "rejected" && item.status === "rejected");

    const matchesSearch =
      !search ||
      [item.name, item.text, item.country].some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      );

    return matchesTab && matchesSearch;
  });

  const counts = {
    all: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved" || !i.status).length,
    rejected: items.filter((i) => i.status === "rejected").length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Testimonials
        </h1>
        <Button onClick={() => openModal()} size="sm">
          <Plus className="size-4 mr-1" />
          Add New
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {counts[tab] > 0 && (
              <span className="ml-1.5 text-xs text-muted-foreground">
                {counts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search testimonials..."
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
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rating</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Review</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      <Loader2 className="size-5 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      No testimonials found.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const status = item.status || "approved";
                    return (
                      <tr
                        key={item._id}
                        className="border-b border-border last:border-0 hover:bg-muted/50"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {item.avatar ? (
                              <img
                                src={item.avatar}
                                alt={item.name}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                                {item.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.country && (
                                <div className="text-xs text-muted-foreground">{item.country}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-yellow-500">
                            {"★".repeat(Math.max(0, Math.min(5, item.rating)))}
                            {"☆".repeat(5 - Math.max(0, Math.min(5, item.rating)))}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <span className="text-muted-foreground line-clamp-2">
                            {String(item.text ?? "").length > 80
                              ? String(item.text).slice(0, 80) + "..."
                              : item.text}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              status === "approved"
                                ? "bg-green-100 text-green-700"
                                : status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => handleStatus(item._id!, "approved")}
                                  title="Approve"
                                >
                                  <Check className="size-3.5 text-green-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => handleStatus(item._id!, "rejected")}
                                  title="Reject"
                                >
                                  <Ban className="size-3.5 text-red-600" />
                                </Button>
                              </>
                            )}
                            {status === "rejected" && (
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => handleStatus(item._id!, "approved")}
                                title="Restore"
                              >
                                <Check className="size-3.5 text-green-600" />
                              </Button>
                            )}
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
                              onClick={() => handleDelete(item._id!)}
                            >
                              <Trash2 className="size-3.5 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
                {editingItem ? "Edit Testimonial" : "New Testimonial"}
              </CardTitle>
              <Button variant="ghost" size="icon-sm" onClick={() => setIsModalOpen(false)}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Avatar</label>
                {formData.avatar ? (
                  <div className="relative group w-fit">
                    <img
                      src={formData.avatar}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, avatar: "" }))}
                      className="absolute top-0 right-0 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : null}
                <label className="cursor-pointer">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted-foreground hover:border-gold/50 hover:text-gold transition-colors">
                    <Upload className="size-4" />
                    {uploading ? "Uploading..." : "Choose image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Reviewer name"
                  required
                />
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Country</label>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                  placeholder="e.g. Pakistan"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Rating (1-5)</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= formData.rating
                            ? "fill-gold text-gold"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Review Text *</label>
                <textarea
                  className="w-full min-h-[100px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                  value={formData.text}
                  onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
                  placeholder="What they said..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || uploading || !formData.name || !formData.text}
                >
                  {saving && <Loader2 className="size-4 animate-spin mr-1" />}
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
