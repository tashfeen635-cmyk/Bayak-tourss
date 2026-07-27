import { ObjectId } from "mongodb";

export interface Destination {
  _id?: ObjectId;
  id: string;
  name: string;
  region: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  category: string[];
  featured: boolean;
  availableDates: string[];
  included: string[];
  itinerary: ItineraryDay[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Reel {
  _id?: ObjectId;
  id: string;
  destination: string;
  description: string;
  video: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeamMember {
  _id?: ObjectId;
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  specialization: string;
  languages: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Testimonial {
  _id?: ObjectId;
  id?: string;
  name: string;
  country: string;
  text: string;
  rating: number;
  avatar: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GalleryImage {
  _id?: ObjectId;
  id?: string;
  src: string;
  alt: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Customer {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  _id?: ObjectId;
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  destinationId: string;
  destinationName: string;
  groupType: string;
  adults: number;
  children: number;
  travelDate: string;
  duration: string;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor";
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Settings {
  _id?: ObjectId;
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
  updatedAt?: Date;
}

export interface Stats {
  _id?: ObjectId;
  label: string;
  value: number;
}

export interface WhyChooseUs {
  _id?: ObjectId;
  label: string;
  description: string;
}
