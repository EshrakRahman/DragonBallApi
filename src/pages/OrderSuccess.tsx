import Container from "@/components/layout/Container.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useSearch} from "@tanstack/react-router";

const CheckIcon = () => (
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            />
        </svg>
    </div>
);

const InfoIcon = () => (
    <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>

);
export default function OrderSuccess() {

    const {orderNumber} = useSearch({from: "/order-success"});

    const hasOrder = Boolean(orderNumber);

    return (
        <Container>
            <div className="py-20 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${hasOrder ? "bg-green-100" : "bg-gray-100"}`}>
                    {hasOrder ? <CheckIcon /> : <InfoIcon />}
                </div>
                <h1 className="text-3xl font-bold mb-4">{hasOrder ? 'Order Placed' : 'No order information'}</h1>
                <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
                <p className="text-gray-500 mb-8">
                    {hasOrder ? 'Thank you for your purchase' : 'We could not find any order information.'}
                </p>
                {hasOrder ? (
                    <p className="text-gray-500 mb-8">Your order number is
                        <span className="font-semibold text-black">{orderNumber}</span>
                    </p>)
                 : (
                    <p className="text-gray-500 mb-8">This page is shown after successful checkout.</p>
                    )}
                <div className="flex items-center justify-center gap-4">
                    <Link to="/">
                        <Button className="rounded-full px-8">Continue Shopping</Button>
                    </Link>

                    <Link to="/orders">
                        <Button variant="outline" className="rounded-full px-8">View my orders</Button>
                    </Link>
                </div>

            </div>
        </Container>
    );
}
