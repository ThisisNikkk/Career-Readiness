"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const { cart, removeFromCart, totalPrice, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-slate-300">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight mb-4">Your cart is empty.</h2>
        <p className="text-slate-500 font-medium max-w-sm mb-10 leading-relaxed">
          Looks like you haven't added any premium resources yet. Start building your career toolkit today.
        </p>
        <Link 
          href="/resources" 
          className="bg-[#0F172A] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-blue hover:shadow-xl hover:shadow-accent-blue/20 transition-all flex items-center gap-3"
        >
          Browse eBooks <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Selected Resources</h2>
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="group relative bg-white border border-slate-100 p-4 sm:p-6 rounded-[32px] flex gap-6 items-center hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
          >
            <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight truncate mb-1">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Digital Edition</p>
              <div className="text-lg font-black text-accent-blue tabular-nums">
                ${item.price.toFixed(2)}
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 sticky top-32">
          <h2 className="text-xl font-black text-[#0F172A] tracking-tight mb-8">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between text-sm font-medium text-slate-500">
              <span>Items ({itemCount})</span>
              <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-slate-500">
              <span>Taxes</span>
              <span className="tabular-nums">$0.00</span>
            </div>
            <div className="h-px bg-slate-100 my-6" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-[#0F172A]">Total</span>
              <span className="text-2xl font-black text-accent-blue tabular-nums">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-[#0F172A] text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-200 transition-all flex items-center justify-center gap-3">
            Secure Checkout <ArrowRight className="w-4 h-4" />
          </button>
          
          <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] px-4">
            Instant digital delivery to your inbox upon successful payment.
          </p>
        </div>
      </div>
    </div>
  );
}
