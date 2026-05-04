import { createRoute } from "@tanstack/react-router";
import { z } from "zod";
import { rootRoute } from "@/routes/root.tsx";
import CategoryProducts from "@/pages/CategoryProducts";

export const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories/$slug",
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  component: CategoryProducts,
});
