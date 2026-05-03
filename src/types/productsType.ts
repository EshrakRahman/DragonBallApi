export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;    // Changed to string to match API "899.99"
    quantity?: number;
    image: string;
    rating?: number | null | undefined;
    category?: string | null;
    createdAt?: string; // API returns string "2026-05-02..."
};