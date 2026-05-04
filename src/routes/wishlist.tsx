import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root.tsx";
import Wishlist from "@/pages/Wishlist";

export const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: Wishlist,
});
