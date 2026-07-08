import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutSchema } from '../../schemas/checkout';
import type { CheckoutInput, CouponData } from '../../schemas/checkout';
import type { Order } from '../../schemas/productSchema';
import { useApplyCoupon, usePlaceOrder } from '../../hooks/useCheckout';
import { CreditCard, Banknote, Tag, Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  cartItems: any[];
  subtotal: number;
  onOrderCreated: (order: Order) => void;
  appliedCoupon: CouponData | null;
  setAppliedCoupon: (coupon: CouponData | null) => void;
}

export function CheckoutForm({
  cartItems,
  subtotal,
  onOrderCreated,
  appliedCoupon,
  setAppliedCoupon,
}: CheckoutFormProps) {
  const [couponCodeInput, setCouponCodeInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm<CheckoutInput>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      items: cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        size_id: item.size_id || null
      })),
      payment_method: 'stripe',
      shipping_address: {
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
      },
      notes: '',
    }
  });

  const paymentMethod = watch('payment_method');
  const applyCouponMutation = useApplyCoupon();
  const placeOrderMutation = usePlaceOrder();

  const handleApplyCoupon = async () => {
    if (!couponCodeInput.trim()) return;

    applyCouponMutation.mutate(
      { code: couponCodeInput.trim(), subtotal },
      {
        onSuccess: (data) => {
          setAppliedCoupon(data);
          setValue('coupon_code', data.code);
        },
        onError: (error) => {
          const apiErrors = error.response?.data?.errors;
          if (apiErrors && apiErrors.code) {
            setError('coupon_code', {
              type: 'server',
              message: apiErrors.code[0],
            });
          } else {
            setError('coupon_code', {
              type: 'server',
              message: error.response?.data?.message || 'Failed to apply coupon.',
            });
          }
        }
      }
    );
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setValue('coupon_code', undefined);
  };

  const onSubmit = async (data: CheckoutInput) => {
    placeOrderMutation.mutate(data, {
      onSuccess: (order) => {
        onOrderCreated(order);
      },
      onError: (error) => {
        const apiErrors = error.response?.data?.errors;
        if (apiErrors) {
          Object.entries(apiErrors).forEach(([key, messages]) => {
            const msgs = messages as string[];
            if (key.startsWith('shipping_address.')) {
              const field = key.replace('shipping_address.', '') as keyof CheckoutInput['shipping_address'];
              setError(`shipping_address.${field}`, {
                type: 'server',
                message: msgs[0]
              });
            } else if (key === 'coupon_code') {
              setError('coupon_code', {
                type: 'server',
                message: msgs[0]
              });
            } else {
              setError(key as any, {
                type: 'server',
                message: msgs[0]
              });
            }
          });
        } else {
          setError('root', {
            type: 'server',
            message: error.response?.data?.message || 'Checkout failed. Please try again.'
          });
        }
      }
    });
  };

  const discount = appliedCoupon ? appliedCoupon.discount_amount : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const finalTotal = Math.max(0, subtotal + shipping - discount);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all text-sm";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {errors.root && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {errors.root.message}
        </div>
      )}

      {/* Contact & Shipping Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Shipping Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className={inputClass}
              disabled={placeOrderMutation.isPending}
              {...register('shipping_address.name')}
            />
            {errors.shipping_address?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.shipping_address.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="10+ digit phone"
              className={inputClass}
              disabled={placeOrderMutation.isPending}
              {...register('shipping_address.phone')}
            />
            {errors.shipping_address?.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.shipping_address.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          <input
            type="text"
            placeholder="123 Main St, Apt 4B"
            className={inputClass}
            disabled={placeOrderMutation.isPending}
            {...register('shipping_address.address')}
          />
          {errors.shipping_address?.address && (
            <p className="text-red-500 text-xs mt-1">{errors.shipping_address.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="col-span-2 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
            <input
              type="text"
              placeholder="New York"
              className={inputClass}
              disabled={placeOrderMutation.isPending}
              {...register('shipping_address.city')}
            />
            {errors.shipping_address?.city && (
              <p className="text-red-500 text-xs mt-1">{errors.shipping_address.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
            <input
              type="text"
              placeholder="NY"
              className={inputClass}
              disabled={placeOrderMutation.isPending}
              {...register('shipping_address.state')}
            />
            {errors.shipping_address?.state && (
              <p className="text-red-500 text-xs mt-1">{errors.shipping_address.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">ZIP Code</label>
            <input
              type="text"
              placeholder="10001"
              className={inputClass}
              disabled={placeOrderMutation.isPending}
              {...register('shipping_address.zip')}
            />
            {errors.shipping_address?.zip && (
              <p className="text-red-500 text-xs mt-1">{errors.shipping_address.zip.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
          <input
            type="text"
            placeholder="US"
            className={inputClass}
            disabled={placeOrderMutation.isPending}
            {...register('shipping_address.country')}
          />
          {errors.shipping_address?.country && (
            <p className="text-red-500 text-xs mt-1">{errors.shipping_address.country.message}</p>
          )}
        </div>
      </section>

      {/* Payment Method Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Payment Method</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === 'stripe'
                ? 'border-black bg-gray-50/50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-semibold text-sm">Credit / Debit Card</p>
                <p className="text-xs text-gray-400">Pay securely via Stripe</p>
              </div>
            </div>
            <input
              type="radio"
              value="stripe"
              className="accent-black h-4 w-4"
              disabled={placeOrderMutation.isPending}
              {...register('payment_method')}
            />
          </label>

          <label
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === 'cash'
                ? 'border-black bg-gray-50/50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Banknote className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-semibold text-sm">Cash on Delivery</p>
                <p className="text-xs text-gray-400">Pay when order arrives</p>
              </div>
            </div>
            <input
              type="radio"
              value="cash"
              className="accent-black h-4 w-4"
              disabled={placeOrderMutation.isPending}
              {...register('payment_method')}
            />
          </label>
        </div>
      </section>

      {/* Order Notes Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Order Notes (Optional)</h2>
        <textarea
          placeholder="e.g. Leave at the front door, ring doorbell, etc."
          rows={3}
          className={`${inputClass} resize-none`}
          disabled={placeOrderMutation.isPending}
          {...register('notes')}
        />
      </section>

      {/* Coupon Field Container */}
      <section className="space-y-3 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <Tag className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Promo Code</h3>
        </div>

        {!appliedCoupon ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCodeInput}
              onChange={(e) => setCouponCodeInput(e.target.value)}
              placeholder="ENTER CODE"
              disabled={applyCouponMutation.isPending || placeOrderMutation.isPending}
              className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-sm uppercase bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={applyCouponMutation.isPending || placeOrderMutation.isPending}
              className="bg-black hover:bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2 hover:cursor-pointer"
            >
              {applyCouponMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Apply
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800">
            <div>
              <p className="font-semibold uppercase">Coupon Applied: {appliedCoupon.code}</p>
              <p className="text-emerald-600 mt-0.5">{appliedCoupon.description}</p>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              disabled={placeOrderMutation.isPending}
              className="text-red-500 font-semibold hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {errors.coupon_code && (
          <p className="text-red-500 text-xs mt-1">{errors.coupon_code.message}</p>
        )}
      </section>

      {/* Pricing Breakdown inside form for calculation visibility */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600 font-medium">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold border-t pt-2 text-gray-900">
          <span>Total to Pay</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={placeOrderMutation.isPending || cartItems.length === 0}
        className="w-full bg-black hover:bg-black/90 text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm text-lg hover:cursor-pointer"
      >
        {placeOrderMutation.isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Placing Order...
          </>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}
