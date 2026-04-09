"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import { Ebook, useCart } from "../../context/CartContext";

interface EbookCardProps {
  ebook: Ebook;
}

export default function EbookCard({ ebook }: EbookCardProps) {
  const { addToCart, isItemInCart } = useCart();
  const alreadyInCart = isItemInCart(ebook.id);

  return (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-[32px] border border-slate-100 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-slate-100 mb-6">
        <Image
          src={ebook.imageUrl}
          alt={ebook.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="px-2 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-[#0F172A] leading-tight tracking-tight group-hover:text-accent-blue transition-colors duration-300">
            {ebook.title}
          </h3>
          <span className="text-lg font-black text-accent-blue tabular-nums">
            ${ebook.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
          {ebook.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => addToCart(ebook)}
            disabled={alreadyInCart}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 
              ${alreadyInCart 
                ? "bg-slate-100 text-slate-400 cursor-default" 
                : "bg-[#0F172A] text-white hover:bg-accent-blue hover:shadow-xl hover:shadow-accent-blue/20"
              }`}
          >
            {alreadyInCart ? (
              <>
                <Check className="w-4 h-4" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-blue/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
