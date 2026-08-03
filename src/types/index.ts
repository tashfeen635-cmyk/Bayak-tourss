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
  image: string;
  category: string[];
  featured: boolean;
  availableDates: string[];
  included: string[];
  notIncluded: string[];
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
  poster?: string;
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
  order?: number;
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
  duration: string;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomTrip {
  _id?: ObjectId;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  groupType: string;
  adults: number;
  children: number;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
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
