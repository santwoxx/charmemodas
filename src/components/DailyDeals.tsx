import { useState, useEffect } from "react";
import { Clock, ChevronLeft, ChevronRight, ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface DailyDealsProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: { name: string; hex: string }) => void;
  onToggleFavorite: (p: Product) => void;
  favorites: Product[];
}

export default function DailyDeals({
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  favorites,
}: DailyDealsProps) {
  // Real-time animated timer ticking downwards
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 33,
    seconds: 9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let h = prev.hours;
        let m = prev.minutes;
        let s = prev.seconds - 1;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          // Reset timer back to plausible time once finished
          h = 5;
          m = 59;
          s = 59;
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format with leading zeros
  const formatNum = (num: number) => num.toString().padStart(2, "0");

  const dailyDealProducts = PRODUCTS.filter((p) => p.isDailyDeal);

  return (
    <div className="w-full bg-white py-10 border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Deal Title Bar - Cashless Lookbook Header Section */}
        <div className="flex flex-col md:flex-row items-stretch justify-between bg-brand-900 border border-brand-700 rounded-none overflow-hidden mb-6 shadow-sm">
          {/* Main Badge Name */}
          <div className="bg-brand-900 text-white font-sans font-black uppercase text-xs sm:text-sm px-6 py-4 flex items-center gap-2.5 tracking-[0.15em] rounded-none border-r-0 md:border-r border-brand-850">
            <span className="w-2 h-2 rounded-none bg-green-500" />
            <span>Destaques da Coleção</span>
          </div>

          <div className="flex flex-1 flex-col sm:flex-row items-center justify-between px-5 py-3 sm:py-0 gap-3 bg-brand-920 text-white font-sans font-medium text-xs tracking-wide">
            <span className="text-brand-300 font-semibold uppercase font-mono text-[9px] sm:text-[10px] tracking-widest text-center sm:text-left">
              Alta-Costura, Toque Macio & Looks Desenhas Para Exalar Sua Essência
            </span>
          </div>
        </div>

        {/* Horizontal Scrollable Deals List Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyDealProducts.map((product) => {
              const isFavorite = favorites.some((fav) => fav.id === product.id);
              const defaultSize = product.sizes[0];
              const defaultColor = product.colors[0];

              return (
                <div
                  key={product.id}
                  className="bg-brand-50 rounded-none overflow-hidden border border-brand-200 hover:border-brand-400 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  {/* Image and badges wrapper */}
                  <div className="relative aspect-4/5 w-full bg-white overflow-hidden cursor-pointer rounded-none">
                    {/* Exclusive Lookbook Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-brand-900 border border-brand-800 text-white font-mono text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-none shadow-xs z-10">
                      Atelier
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product);
                      }}
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-none z-10 transition-colors shadow-xs ${
                        isFavorite
                          ? "bg-red-500 text-white"
                          : "bg-white/80 hover:bg-white text-brand-900"
                      }`}
                      title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                    >
                      <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
                    </button>

                    {/* Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => onSelectProduct(product)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick view panel on hover */}
                    <div className="absolute inset-x-0 bottom-0 bg-brand-900/80 backdrop-blur-xs text-white py-2 text-center text-xs font-sans font-bold uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform cursor-pointer"
                         onClick={() => onSelectProduct(product)}>
                      Ampliar Detalhes Look
                    </div>
                  </div>

                  {/* Pricing Description and fast buy buttons */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating stars */}
                      <div className="flex items-center gap-1 text-amber-500 text-[10.5px] font-sans font-semibold mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                              strokeWidth={2}
                            />
                          ))}
                        </div>
                        <span className="text-brand-600">({product.reviewsCount})</span>
                      </div>

                      {/* Title */}
                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="text-xs sm:text-sm font-bold text-brand-900 tracking-tight leading-snug cursor-pointer hover:text-brand-700 min-h-[38px] line-clamp-2 font-display"
                      >
                        {product.name}
                      </h4>

                      <span className="text-[10px] uppercase tracking-wide font-mono text-brand-500 font-semibold mt-1 block">
                        {product.fabric} • {product.category}
                      </span>
                    </div>

                    {/* Exclusive Tag and Request Book */}
                    <div className="mt-4 pt-3 border-t border-brand-200/60">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-brand-600 font-extrabold block">
                        Modelo Exclusivo
                      </span>

                      <span className="text-[10.5px] text-brand-500 block leading-tight font-sans font-medium mt-1">
                        Disponível sob consulta de tamanho no atelier físico.
                      </span>

                      {/* Fast Action Buttons */}
                      <div className="mt-3.5 flex gap-1.5">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="flex-1 bg-white hover:bg-brand-200 text-brand-900 border border-brand-300 font-sans text-[10.5px] uppercase tracking-widest font-bold py-2 rounded-none transition-all text-center cursor-pointer"
                        >
                          Ver Look
                        </button>
                        <button
                          onClick={() => {
                            onAddToCart(product, defaultSize, defaultColor);
                          }}
                          className="px-3.5 bg-brand-900 hover:bg-brand-800 text-white font-sans text-[11px] rounded-none transition-all flex items-center justify-center cursor-pointer"
                          title="Fazer Reserva do Look"
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          <span className="text-[9.5px] uppercase tracking-wider font-bold">Reservar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
