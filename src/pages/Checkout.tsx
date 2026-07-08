import { useState, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import Container from "@/components/layout/Container.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/context/CartContext.tsx";
import { confirmPayment, retryPayment } from "@/api/orders.ts";
import { ApiError } from "@/api/client.ts";
import { toast } from "sonner";
import PaymentForm from "@/components/checkout/PaymentForm.tsx";
import { CheckoutForm } from "@/components/checkout/CheckoutForm.tsx";
import type { CouponData } from "@/schemas/checkout";
import type { Order } from "@/schemas/productSchema.ts";
import ProductImg from "@/assets/product_one.png";

const SESSION_KEY = "pending_order";

type PendingOrder = {
  id: number;
  order_number: string;
  total: number;
  payment_intent_client_secret: string | null;
};

export default function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    clearCart,
    subtotal,
    activeCoupon
  } = useCart();

  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<PendingOrder | null>(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(() => {
    if (activeCoupon) {
      return {
        code: activeCoupon.code,
        type: activeCoupon.type,
        value: activeCoupon.value,
        discount_amount: activeCoupon.discount_amount,
        min_order_amount: activeCoupon.min_order_amount ?? null,
        description: activeCoupon.description ?? null,
      };
    }
    return null;
  });

  useEffect(() => {
    if (order) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(order));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [order]);

  const handleOrderCreated = async (result: Order) => {
    // If the payment method is cash, or no stripe client secret was returned, consider it placed immediately
    const isCash = !result.payment_intent_client_secret;
    if (isCash) {
      clearCart();
      setOrder(null);
      await navigate({
        to: "/order-success",
        search: { orderNumber: result.order_number },
      });
      toast.success("Order placed successfully!");
      return;
    }

    setOrder({
      id: result.id,
      order_number: result.order_number,
      total: result.total,
      payment_intent_client_secret: result.payment_intent_client_secret ?? null,
    });
  };

  const handlePaymentSuccess = async () => {
    const currentOrder = order!;

    try {
      const confirmation = await confirmPayment(currentOrder.id);

      if (confirmation.paid) {
        clearCart();
        setOrder(null);
        await navigate({
          to: "/order-success",
          search: { orderNumber: currentOrder.order_number },
        });
        toast.success("Payment successful!");
      } else if (confirmation.stripe_status === "processing") {
        await new Promise((r) => setTimeout(r, 2000));
        const retry = await confirmPayment(currentOrder.id);
        if (retry.paid) {
          clearCart();
          setOrder(null);
          await navigate({
            to: "/order-success",
            search: { orderNumber: currentOrder.order_number },
          });
          toast.success("Payment successful!");
        } else {
          setError("Payment is still processing. Please check your orders page.");
        }
      } else {
        setError(
          confirmation.stripe_status === "requires_payment_method"
            ? "Payment was declined. Please try a different card."
            : "Payment verification failed. Please try again."
        );
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to verify payment. Please try again.");
      }
    }
  };

  const handleRetryPayment = async (): Promise<string | null> => {
    if (!order) return null;
    const result = await retryPayment(order.id);
    return result.payment_intent_client_secret;
  };

  const handleCloseModal = () => {
    setOrder(null);
  };

  if (items.length === 0 && !order) {
    return (
      <Container>
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
          <h2 className="mt-4 text-xl font-semibold">Nothing to check out</h2>
          <p className="mt-2 text-gray-500">
            Your cart is empty. Add some items first.
          </p>
          <Link to="/new-arrivals">
            <Button className="mt-6 rounded-full">Browse New Arrivals</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const discount = appliedCoupon ? appliedCoupon.discount_amount : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <CheckoutForm
              cartItems={items}
              subtotal={subtotal}
              onOrderCreated={handleOrderCreated}
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={
                      item.product_id +
                      (item.size_id ? "-" + item.size_id : "")
                    }
                    className="flex gap-3"
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = ProductImg;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                        {item.size_name
                          ? ` | Size: ${item.size_name}`
                          : ""}
                      </p>
                      <p className="font-semibold text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                    <span className="font-medium">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {order && (
        <PaymentForm
          order={order}
          onSuccess={handlePaymentSuccess}
          onRetryPayment={handleRetryPayment}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
}
