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
  GripVertical,
} from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface Destination {
  _id?: string;
  name: string;
  region: string;
  description: string;
  image: string;
  duration: string;
  category: string[];
  availableDates: string[];
  included: string[];
  notIncluded: string[];
  itinerary: ItineraryDay[];
  featured: boolean;
}

const PREDEFINED_CATEGORIES = ["Autumn", "Blossom", "Honeymoon", "Family", "Trekking", "Bike tours", "Kalash Festival"];

const emptyForm: Destination = {
  name: "",
  region: "",
  description: "",
  image: "",
  duration: "",
  category: [],
  availableDates: [],
  included: [],
  notIncluded: [],
  itinerary: [],
  featured: false,
};

export default function DestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Destination | null>(null);
  const [formData, setFormData] = useState<Destination>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [datesInput, setDatesInput] = useState("");
  const [includedInput, setIncludedInput] = useState("");
  const [notIncludedInput, setNotIncludedInput] = useState("");
  const fetchedRef = useRef(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/destinations");
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

  const openModal = (item?: Destination) => {
    if (item) {
      setEditingItem(item);
      const dates = Array.isArray(item.availableDates) ? item.availableDates : toArr(item.availableDates);
      const inc = Array.isArray(item.included) ? item.included : toArr(item.included);
      const notInc = Array.isArray(item.notIncluded) ? item.notIncluded : toArr(item.notIncluded);
      setDatesInput(dates.join(", "));
      setIncludedInput(inc.join(", "));
      setNotIncludedInput(notInc.join(", "));
      setFormData({
        ...item,
        category: Array.isArray(item.category) ? item.category : toArr(item.category),
        availableDates: dates,
        included: inc,
        notIncluded: notInc,
        itinerary: Array.isArray(item.itinerary) ? item.itinerary : [],
      });
    } else {
      setEditingItem(null);
      setFormData({ ...emptyForm });
      setDatesInput("");
      setIncludedInput("");
      setNotIncludedInput("");
    }
    setIsModalOpen(true);
    setUploadError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `/api/destinations/${editingItem._id}` : "/api/destinations";

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...payload } = {
        ...formData,
        availableDates: datesInput.split(",").map((s) => s.trim()).filter(Boolean),
        included: includedInput.split(",").map((s) => s.trim()).filter(Boolean),
        notIncluded: notIncludedInput.split(",").map((s) => s.trim()).filter(Boolean),
      } as unknown as Record<string, unknown>;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSaveError(data.error || "Failed to save destination. Please try again.");
        return;
      }

      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (deleting || saving) return;
    if (!confirm("Are you sure you want to delete this destination?")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data.error || "Failed to delete destination. Please try again.");
        return;
      }
      fetchItems();
    } catch (error) {
      console.error("Failed to delete:", error);
      setDeleteError("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        setUploadError(data.error || "Upload failed.");
      }
    } catch {
      setUploadError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const addItineraryDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: "", description: "" },
      ],
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, day: i + 1 })),
    }));
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      ),
    }));
  };

  const moveItineraryDay = (index: number, direction: -1 | 1) => {
    setFormData((prev) => {
      const arr = [...prev.itinerary];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= arr.length) return prev;
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return { ...prev, itinerary: arr.map((d, i) => ({ ...d, day: i + 1 })) };
    });
  };

  const filteredItems = items.filter((item) =>
    search
      ? [item.name, item.region, item.description]
          .some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
      : true
  );

  const selectedCategory = (formData.category as string[])[0] ?? "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Destinations
        </h1>
        <Button onClick={() => openModal()} size="sm">
          <Plus className="size-4 mr-1" />
          Add New
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {deleteError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {deleteError}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Region</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Categories</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Featured</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Itinerary</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      <Loader2 className="size-5 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No destinations found.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-border last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.region}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(item.category) ? item.category : []).map((c) => (
                            <span
                              key={c}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {item.featured ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Yes
                          </span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {Array.isArray(item.itinerary) ? item.itinerary.length : 0} days
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => openModal(item)} disabled={deleting}>
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(item._id!)}
                            disabled={deleting}
                          >
                            {deleting ? (
                              <Loader2 className="size-3.5 animate-spin text-destructive" />
                            ) : (
                              <Trash2 className="size-3.5 text-destructive" />
                            )}
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
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingItem ? "Edit Destination" : "New Destination"}
              </CardTitle>
              <Button variant="ghost" size="icon-sm" onClick={() => setIsModalOpen(false)}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                {formData.image ? (
                  <div className="relative group w-full max-w-[240px]">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-36 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : null}
                {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
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
                  placeholder="e.g. Hunza Valley Adventure"
                  required
                />
              </div>

              {/* Region */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Region *</label>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData((prev) => ({ ...prev, region: e.target.value }))}
                  placeholder="e.g. Gilgit-Baltistan"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Description *</label>
                <textarea
                  className="w-full min-h-[100px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Describe the destination..."
                  required
                />
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  placeholder="e.g. 5 Days / 4 Nights"
                />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          category: selectedCategory === cat ? [] : [cat],
                        }))
                      }
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-gold text-white shadow-md"
                          : "border border-border bg-card text-muted-foreground hover:border-gold/30 hover:text-gold"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Dates */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Available Dates (comma-separated)</label>
                <Input
                  value={datesInput}
                  onChange={(e) => setDatesInput(e.target.value)}
                  onBlur={() =>
                    setFormData((prev) => ({
                      ...prev,
                      availableDates: datesInput.split(",").map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  placeholder="e.g. March 15-20, April 1-6, May 10-15"
                />
              </div>

              {/* Included */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Included (comma-separated)</label>
                <Input
                  value={includedInput}
                  onChange={(e) => setIncludedInput(e.target.value)}
                  onBlur={() =>
                    setFormData((prev) => ({
                      ...prev,
                      included: includedInput.split(",").map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  placeholder="e.g. Hotel, Transport, Guide, Meals"
                />
              </div>

              {/* Not Included */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Not Included (comma-separated)</label>
                <Input
                  value={notIncludedInput}
                  onChange={(e) => setNotIncludedInput(e.target.value)}
                  onBlur={() =>
                    setFormData((prev) => ({
                      ...prev,
                      notIncluded: notIncludedInput.split(",").map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  placeholder="e.g. Flights, Visa, Personal expenses"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                  }
                  className="rounded"
                />
                <label className="text-sm font-medium">Featured</label>
              </div>

              {/* Itinerary */}
              <div className="space-y-3 border-t border-border pt-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">Day-by-Day Itinerary</label>
                  <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                    <Plus className="size-3.5 mr-1" />
                    Add Day
                  </Button>
                </div>

                {formData.itinerary.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No itinerary days added yet. Click &quot;Add Day&quot; to start building the itinerary.
                  </p>
                )}

                <div className="space-y-3">
                  {formData.itinerary.map((day, i) => (
                    <div
                      key={i}
                      className="relative rounded-lg border border-border bg-muted/30 p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="size-4 text-muted-foreground cursor-grab" />
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                            {day.day}
                          </span>
                          <span className="text-sm font-medium">Day {day.day}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => moveItineraryDay(i, -1)}
                            disabled={i === 0}
                          >
                            &#9650;
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => moveItineraryDay(i, 1)}
                            disabled={i === formData.itinerary.length - 1}
                          >
                            &#9660;
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeItineraryDay(i)}
                          >
                            <X className="size-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <Input
                        value={day.title}
                        onChange={(e) => updateItineraryDay(i, "title", e.target.value)}
                        placeholder="Day title (e.g. Arrival in Gilgit)"
                      />
                      <textarea
                        className="w-full min-h-[60px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                        value={day.description}
                        onChange={(e) => updateItineraryDay(i, "description", e.target.value)}
                        placeholder="What happens on this day..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save error */}
              {saveError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {saveError}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || uploading || !formData.name || !formData.region || !formData.description}
                >
                  {saving && <Loader2 className="size-4 animate-spin mr-1" />}
                  {editingItem ? "Save Changes" : "Create"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Saving/Deleting overlay */}
      {(saving || deleting) && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-card px-10 py-8 shadow-2xl">
            <Loader2 className="size-10 animate-spin text-gold" />
            <p className="text-sm font-medium text-muted-foreground">
              {deleting ? "Deleting destination…" : editingItem ? "Saving changes…" : "Creating destination…"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function toArr(v: unknown): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}
