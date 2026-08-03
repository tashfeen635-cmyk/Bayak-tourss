export const dynamic = "force-dynamic";

import { count } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  CalendarCheck,
  Compass,
  Star,
  Image,
  Inbox,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [destinations, bookings, customTrips, team, testimonials, gallery, inquiries] =
    await Promise.all([
      count("destinations"),
      count("bookings"),
      count("customTrips"),
      count("team"),
      count("testimonials"),
      count("gallery"),
      count("inquiries"),
    ]);

  return { destinations, bookings, customTrips, team, testimonials, gallery, inquiries };
}

const statCards = [
  {
    label: "Destinations",
    key: "destinations" as const,
    icon: MapPin,
    href: "/admin/destinations",
    color: "text-blue-500",
  },
  {
    label: "Bookings",
    key: "bookings" as const,
    icon: CalendarCheck,
    href: "/admin/bookings",
    color: "text-green-500",
  },
  {
    label: "Custom Trips",
    key: "customTrips" as const,
    icon: Compass,
    href: "/admin/custom-trips",
    color: "text-cyan-500",
  },
  {
    label: "Team Members",
    key: "team" as const,
    icon: TrendingUp,
    href: "/admin/team",
    color: "text-orange-500",
  },
  {
    label: "Testimonials",
    key: "testimonials" as const,
    icon: Star,
    href: "/admin/testimonials",
    color: "text-yellow-500",
  },
  {
    label: "Gallery Images",
    key: "gallery" as const,
    icon: Image,
    href: "/admin/gallery",
    color: "text-pink-500",
  },
  {
    label: "Inquiries",
    key: "inquiries" as const,
    icon: Inbox,
    href: "/admin/inquiries",
    color: "text-purple-500",
  },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here&apos;s an overview of your site.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Link key={card.key} href={card.href}>
            <Card className="hover:border-gold/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <card.icon className={`size-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats[card.key]}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
