import { Ebook } from "../context/CartContext";

export const ebooks: Ebook[] = [
  {
    id: "eb-01",
    title: "The Leap to Leadership",
    description: "A comprehensive guide to transitioning from an individual contributor to a strategic leader with impact.",
    price: 49.00,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "eb-02",
    title: "Mastering Professional Visibility",
    description: "Learn how to advocate for your work and build a network that highlights your value naturally.",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "eb-03",
    title: "The Career Pivot Blueprint",
    description: "Tactical steps for shifting industries or roles without starting from the bottom of the ladder.",
    price: 55.00,
    imageUrl: "https://images.unsplash.com/photo-1543004629-ff56958490c3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "eb-04",
    title: "Ownership & Initiative",
    description: "Developing the mindset of a high-performer who creates opportunities rather than wait for them.",
    price: 29.00,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
  },
];

// Next.js 16 Cache Components - Prerendered data layer
export async function getEbooks() {
  "use cache";
  // Simulating a minor delay to demonstrate async capability
  return ebooks;
}
