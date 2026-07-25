"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2 } from "lucide-react";

interface Settings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    socialLinks: { instagram: "", facebook: "", tiktok: "" },
    seo: { title: "", description: "", keywords: [] },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Settings
        </h1>
        <Button onClick={handleSave} disabled={saving} size="sm">
          {saving ? (
            <Loader2 className="size-4 animate-spin mr-1" />
          ) : (
            <Save className="size-4 mr-1" />
          )}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Site Name</label>
            <Input
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Contact Email</label>
            <Input
              type="email"
              value={settings.contactEmail}
              onChange={(e) =>
                setSettings({ ...settings, contactEmail: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Contact Phone</label>
            <Input
              value={settings.contactPhone}
              onChange={(e) =>
                setSettings({ ...settings, contactPhone: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Address</label>
            <Input
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Instagram</label>
            <Input
              value={settings.socialLinks.instagram}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Facebook</label>
            <Input
              value={settings.socialLinks.facebook}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">TikTok</label>
            <Input
              value={settings.socialLinks.tiktok}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, tiktok: e.target.value },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Default Title</label>
            <Input
              value={settings.seo.title}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, title: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Default Description</label>
            <textarea
              className="w-full min-h-[80px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
              value={settings.seo.description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, description: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Keywords (comma-separated)
            </label>
            <Input
              value={settings.seo.keywords.join(", ")}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: {
                    ...settings.seo,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
