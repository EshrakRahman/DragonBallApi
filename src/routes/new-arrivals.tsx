import { createRoute } from "@tanstack/react-router";
import { z } from "zod";
import { rootRoute } from "@/routes/root.tsx";
import NewArrivalsPage from "@/pages/NewArrivals";

export const newArrivalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new-arrivals",
  validateSearch: z.object({
    page: z.string().optional().default("1"),
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    size: z.string().optional(),
  }),
  component: NewArrivalsPage,
});
