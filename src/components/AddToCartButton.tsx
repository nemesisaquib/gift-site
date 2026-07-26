"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    expressDelivery?: boolean;
  };
  isMobile?: boolean;
}

export default function AddToCartButton({ product, isMobile }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();
  const added = isInCart(product.id);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!added) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.image,
        delivery: product.expressDelivery ? "Today — Same Day" : "Standard Delivery"
      });
      addToast("Successfully added to cart");
    } else {
      router.push("/checkout");
    }
  };

  if (isMobile) {
    return (
      <button 
        onClick={handleAddToCart}
        className={`flex-1 border-2 border-[#e91e63] font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 ${added ? 'bg-[#e91e63] text-white shadow-md' : 'text-[#e91e63] hover:bg-pink-50'}`}
      >
        {added ? <><i className="fa-solid fa-check text-green-300"></i> View Cart</> : <><i className="fa-solid fa-cart-shopping"></i> Add to Cart</>}
      </button>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`border-2 border-[#e91e63] font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm ${added ? 'bg-[#e91e63] text-white shadow-lg' : 'text-[#e91e63] hover:bg-pink-50'}`}
    >
      {added ? <><i className="fa-solid fa-check text-green-300"></i> View Cart</> : <><i className="fa-solid fa-cart-shopping"></i> Add to Cart</>}
    </button>
  );
}
