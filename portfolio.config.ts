import type { PortfolioConfig } from "./src/lib/config";

const config: PortfolioConfig = {
  personal: {
    name: "Viraj Vaibhav",
    role: "Computer Science Student, Developer & Hardware Enthusiast",
    tagline: "I build things and learn how they work.",
    location: "Dehradun, India",
    bio: "I'm a B.Tech Computer Science and Engineering student specializing in Cyber Security at Shivalik University.\n\nI enjoy building software and hardware projects and learning how the technology around me works.\n\nMy interests range from programming and Linux to PCB design, 3D modelling, game development, and FPV builds.",
    profilePhotoUrl: "/viraj-profile.png",
    aboutHeading: "A student who likes making things.",
  },
  contact: { email: "virajmuz16@gmail.com", resumeUrl: "https://in.linkedin.com/in/viraj-vaibhav-9127b4351" },
  socials: { linkedin: "https://in.linkedin.com/in/viraj-vaibhav-9127b4351", github: "https://github.com/Ghost-af16" },
  theme: {
    palette: "custom",
    customColors: { bg: "#050806", bgLight: "#09110c", bgCard: "#0d1811", accent: "#66ff8a", accentHover: "#9affb2" },
    fonts: "minimal",
  },
  sections: { hero: true, about: true, experience: true, services: true, portfolio: true, gallery: true, testimonials: false, contact: true },
  services: [
    { title: "Software Development", description: "Building useful programs with Python, C++, and Java.", icon: "Code2" },
    { title: "Web Development", description: "Creating responsive websites with HTML and modern web tools.", icon: "Globe2" },
    { title: "Hardware & PCB Design", description: "Designing circuits and custom boards with KiCad.", icon: "CircuitBoard" },
    { title: "3D Design & Prototyping", description: "Turning ideas into practical 3D models with FreeCAD.", icon: "Box" },
    { title: "Game Development", description: "Experimenting with interactive projects in Godot and Unreal Engine.", icon: "Gamepad2" },
  ],
  experiences: [
    {
      organization: "CollageOx",
      role: "Co-Founder",
      period: "Aug 2026 – Present",
      description: "I co-founded CollageOx, a platform where students can share ideas, projects, and updates.",
      url: "https://collageox.onrender.com/#feed",
    },
    {
      organization: "Hack Club",
      role: "Hackathon Organizer",
      period: "Nov 2024 – Present",
      description: "I organize game jams and help students build and ship their first 2D games.",
    },
    {
      organization: "Daydream Muzaffarpur",
      role: "Co-Organizer",
      period: "Aug 2025 – Sep 2025",
      description: "I co-organized Daydream Muzaffarpur, part of a global game jam held across 190 countries. Our event ranked in the top 10. I managed transportation, project quality, and integrity while helping students from five schools ship their first 2D games.",
    },
    {
      organization: "Counterspell Muzaffarpur",
      role: "Co-Organizer",
      period: "Oct 2024 – Nov 2024",
      description: "I co-organized a game jam for more than 200 teenagers. I helped participants create their first 2D games and managed food supplies during the event.",
    },
    {
      organization: "AMD Partnered Program",
      role: "Printed Circuit Board Designer",
      period: "Dec 2025 – Apr 2026",
      description: "I worked as a PCB designer through a partnered program with AMD.",
    },
  ],
  portfolioFilters: ["Featured", "Hardware", "Software", "Games", "All"],
  platforms: ["drive"],
  hero: { backgroundMedia: ["/viraj-workbench.png"], intervalMs: 6000 },
  gallery: [
    { src: "/viraj-workbench.png", alt: "My electronics and development workbench" },
    { src: "/viraj-profile.png", alt: "My visit to a mountain viewpoint" },
    { src: "/viraj-fpv.png", alt: "My FPV quadcopter build" },
    { src: "/gallery/counterspell-demo.jpg", alt: "I demonstrate our project at Counterspell Muzaffarpur" },
    { src: "/gallery/counterspell-collaboration.jpg", alt: "I work with a mentor during Counterspell Muzaffarpur" },
    { src: "/gallery/counterspell-presentation.jpg", alt: "I present our 3D project at Counterspell Muzaffarpur" },
    { src: "/gallery/counterspell-team.jpg", alt: "My team at Counterspell Muzaffarpur" },
  ],
  seo: {
    siteUrl: "http://localhost:3000",
    locale: "en-IN",
    serviceTypes: ["Software Development", "Hardware Design", "Web Development"],
    expertise: ["Python", "C++", "Java", "Linux", "KiCad", "FreeCAD", "Godot", "Unreal Engine", "FPV Building"],
  },
  analytics: { googleAnalyticsId: "" },
  storage: "local",
};

export default config;
