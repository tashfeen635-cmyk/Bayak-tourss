"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  Trash2,
  X,
  Loader2,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

interface Inquiry {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  destination?: string;
  travelDates?: string;
  message: string;
  createdAt?: string;
}

export default function InquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/inquiries");
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

  const handleDelete = async (id: string) => {
    if (deleting) return;
    if (!confirm("Delete this inquiry?")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data.error || "Failed to delete. Please try again.");
        return;
      }

      setSelected(null);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete:", error);
      setDeleteError("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const fullName = (item: Inquiry) =>
    [item.firstName, item.lastName].filter(Boolean).join(" ") || "—";

  const filteredItems = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [
      item.firstName,
      item.lastName,
      item.email,
      item.phone,
      item.destination,
      item.travelDates,
      item.message,
    ].some((v) => String(v ?? "").toLowerCase().includes(q));
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
            Inquiries
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} submission{items.length === 1 ? "" : "s"} from the contact form
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search inquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {deleteError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
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
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Destination</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Submitted</th>
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
                      {items.length === 0
                        ? "No inquiries yet. Submissions from the contact form will appear here."
                        : "No inquiries match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-border last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                            {(item.firstName || "?").charAt(0)}
                          </div>
                          <span className="font-medium">{fullName(item)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.email || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.phone || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.destination || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setSelected(item)}
                            title="View"
                          >
                            <Eye className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(item._id!)}
                            disabled={deleting}
                            title="Delete"
                          >
                            {deleting ? (
                              <Loader2 className="size-3.5 animate-spin" />
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

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Inquiry Details</CardTitle>
              <Button variant="ghost" size="icon-sm" onClick={() => setSelected(null)}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-base font-bold text-gold">
                  {(selected.firstName || "?").charAt(0)}
                </div>
                <div>
                  <div className="text-base font-semibold">{fullName(selected)}</div>
                  {selected.createdAt && (
                    <div className="text-xs text-muted-foreground">
                      Submitted {new Date(selected.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selected.email && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <Mail className="size-4 shrink-0 text-muted-foreground" />
                    <a href={`mailto:${selected.email}`} className="text-sm hover:text-gold truncate">
                      {selected.email}
                    </a>
                  </div>
                )}
                {selected.phone && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <Phone className="size-4 shrink-0 text-muted-foreground" />
                    <a href={`tel:${selected.phone}`} className="text-sm hover:text-gold">
                      {selected.phone}
                    </a>
                  </div>
                )}
                {selected.destination && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <MapPin className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm">{selected.destination}</span>
                  </div>
                )}
                {selected.travelDates && (
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm">{selected.travelDates}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <MessageSquare className="size-4 text-gold" />
                  Message
                </div>
                <p className="whitespace-pre-wrap rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                  {selected.message || "—"}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selected._id!)}
                  disabled={deleting}
                >
                  {deleting && <Loader2 className="size-4 animate-spin mr-1" />}
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
