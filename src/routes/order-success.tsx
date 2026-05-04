import { createRoute } from "@tanstack/react-router";
import { z } from "zod";
import { rootRoute } from "@/routes/root.tsx";
import OrderSuccess from "@/pages/OrderSuccess";

export const orderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-success",
  validateSearch: z.object({
    orderNumber: z.string().optional(),
  }),
  component: OrderSuccess,
});
