"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartContextType {
  cart: Ebook[];
  addToCart: (item: Ebook) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  isItemInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Ebook[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("career_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("career_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (item: Ebook) => {
    setCart((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isItemInCart = (id: string) => cart.some((item) => item.id === id);

  const itemCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        totalPrice,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
