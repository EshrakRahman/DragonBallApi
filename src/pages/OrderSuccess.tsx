import Container from "@/components/layout/Container.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useSearch } from "@tanstack/react-router";

export default function OrderSuccess() {
  const { orderNumber } = useSearch({ from: "/order-success" });

  return (
    <Container>
      <div className="py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
        <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
        <p className="text-gray-500 mb-8">
          Your order number is{" "}
          <span className="font-semibold text-black">
            {orderNumber || "Processing..."}
          </span>
        </p>
        <Link to="/">
          <Button className="rounded-full px-8">Continue Shopping</Button>
        </Link>
      </div>
    </Container>
  );
}
