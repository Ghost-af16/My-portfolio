export interface Project {
  id: string;
  title: string;
  videoUrl: string;
  videoId: string;
  platform: "youtube" | "vimeo" | "instagram" | "behance" | "dribbble" | "drive";
  category: string;
  tags: string[];
  priority: number;
  featured?: boolean;
  thumbnailUrl?: string;
  uploadDate?: string;
  durationMinutes?: number;
  description?: string;
  technologies?: string[];
  built?: string;
  challenge?: string;
  linkType?: "embed" | "external";
}

export interface SiteSettings {
  name: string;
  role: string;
  tagline: string;
  location: string;
  bio: string;
  heroVideoId: string;
  profilePhotoUrl: string;
  aboutHeading: string;
  phone: string;
  whatsapp: string;
  email: string;
  bookingUrl: string;
  resumeUrl: string;
  socials: Record<string, string>;
}

export interface HeroConfig {
  images: string[];
  intervalMs: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
  order: number;
}

export interface Content {
  settings: SiteSettings;
  hero: HeroConfig;
  projects: Project[];
  testimonials: Testimonial[];
  filters: string[];
}
