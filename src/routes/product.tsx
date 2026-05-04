import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root.tsx";
import ProductDetail from "@/pages/ProductDetail";

export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$slug",
  component: ProductDetail,
});
