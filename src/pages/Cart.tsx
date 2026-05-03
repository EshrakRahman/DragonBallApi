import Container from "@/components/layout/Container.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Gradient Graphic T-Shirt",
    price: 145,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    quantity: 1,
    size: "Large",
    color: "Brown"
  },
  {
    id: 2,
    name: "Plain White T-Shirt",
    price: 90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    quantity: 2,
    size: "Medium",
    color: "White"
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 250,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    quantity: 1,
    size: "Small",
    color: "Blue"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return {...item, quantity: newQty};
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl">${item.price}</span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">${total}</span>
                </div>
              </div>

              <Button className="w-full py-3 rounded-full text-lg">
                Proceed to Checkout
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Free shipping on orders over $500
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}