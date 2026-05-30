import { useState } from "react";
import { createPortal } from "react-dom";
import { Search, Heart, ShoppingBag, MapPin, Menu, X, Copy, Check, ChevronRight, Sparkles } from "lucide-react";
import { CartItem, Product } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  favorites: Product[];
  onOpenFavorites: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenInfo: () => void;
  onOpenFeedback: () => void;
}

export default function Header({
  cart,
  onOpenCart,
  favorites,
  onOpenFavorites,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenInfo,
  onOpenFeedback,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cep, setCep] = useState("45600-002");
  const [showCepEditor, setShowCepEditor] = useState(false);
  const [editingCep, setEditingCep] = useState("45600-002");

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const saveCep = () => {
    setCep(editingCep);
    setShowCepEditor(false);
  };

  const navCategories = [
    { name: "Novidades", id: "all" },
    { name: "Conjuntos", id: "Conjuntos" },
    { name: "Vestidos", id: "Vestidos" },
    { name: "Coletes & Blazers", id: "Coletes" },
    { name: "Croppeds & Blusas", id: "Croppeds & Blusas" },
    { name: "Sandálias", id: "Sandálias" },
    { name: "Bolsas", id: "Bolsas" },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md font-sans text-brand-900 sticky top-0 z-40 border-b border-brand-300">
      {/* Top Banner Notice - Mimicking Zattini header and address selector */}
      <div className="bg-brand-900 text-white text-[11px] py-2 px-4 font-mono tracking-wider border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-brand-300" />
            <span className="text-gray-300">Enviar para:</span>
            {showCepEditor ? (
              <div className="flex items-center gap-1 bg-brand-950 px-2 py-0.5 border border-brand-800">
                <input
                  type="text"
                  value={editingCep}
                  onChange={(e) => setEditingCep(e.target.value)}
                  className="bg-transparent border-none text-white text-[11px] w-20 outline-none p-0 focus:ring-0 rounded-none"
                  maxLength={9}
                />
                <button
                  onClick={saveCep}
                  className="text-[10px] text-brand-200 hover:text-white uppercase font-bold px-1"
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCepEditor(true)}
                className="hover:underline font-medium text-brand-200 transition-all cursor-pointer flex items-center gap-1"
              >
                Itabuna, BA - CEP {cep}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px] tracking-widest text-gray-300">
            <button onClick={onOpenInfo} className="hover:text-white transition-colors cursor-pointer uppercase">
              Nossa Loja Física
            </button>
            <span>|</span>
            <button onClick={onOpenFeedback} className="hover:text-white transition-colors cursor-pointer uppercase">
              Depoimentos de Clientes
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar with Logo, Search, and Cart Indicators */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex items-center gap-1.5 text-brand-900 px-3 py-1.5 hover:bg-brand-50 active:scale-95 bg-brand-50/40 border border-brand-200 hover:border-brand-300 rounded-none transition-all cursor-pointer shadow-2xs"
          id="btn-mobile-menu-open"
          title="Abrir Menu de Navegação"
        >
          <Menu size={16} strokeWidth={2} />
          <span className="text-[10px] tracking-[0.18em] uppercase font-mono font-bold text-brand-800 leading-none">Menu</span>
        </button>

        {/* Brand Logo - Serif design for elegant boutique look */}
        <div
          onClick={() => onSelectCategory("all")}
          className="flex flex-col items-center sm:items-start cursor-pointer select-none transition-transform hover:opacity-90"
        >
          <h1 className="text-2xl sm:text-3xl tracking-widest font-serif font-black uppercase text-brand-900 leading-none">
            Charme
          </h1>
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-brand-600 mt-1 font-semibold leading-none">
            Moda Feminina
          </span>
        </div>

        {/* Dynamic Search Box */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <input
            type="text"
            placeholder="O que você procura hoje na Charme?"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-brand-100/40 border border-brand-300 text-brand-900 placeholder-brand-500/70 text-sm px-4 py-2.5 pr-10 rounded-none outline-hidden focus:border-brand-900 focus:bg-white transition-all font-sans"
          />
          <Search size={18} className="absolute right-3.5 text-brand-600 pointer-events-none" />
        </div>

        {/* Action icons (WhatsApp status, Favorites, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-3.5">
          {/* Favorites triggers */}
          <button
            onClick={onOpenFavorites}
            className="p-2 hover:bg-brand-100 rounded-full text-brand-900 relative transition-all cursor-pointer group"
            id="btn-favorites-toggle"
            title="Meus Favoritos"
          >
            <Heart size={21} className="group-hover:scale-105" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white font-mono font-bold text-[9px] w-4 h-4 flex items-center justify-center rounded-full scale-95 shadow-md">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart trigger indicator */}
          <button
            onClick={onOpenCart}
            className="p-2 hover:bg-brand-100 rounded-full text-brand-900 relative transition-all cursor-pointer group"
            id="btn-cart-toggle"
            title="Meu Carrinho"
          >
            <ShoppingBag size={21} className="group-hover:scale-105" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 bg-brand-700 text-white font-mono font-bold text-[9px] w-4 h-4 flex items-center justify-center rounded-full scale-95 shadow-md">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories Desktop Navigation Bar (Responsive Grid) */}
      <nav className="hidden md:block border-t border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 flex justify-center py-2.5 gap-6 lg:gap-8 font-sans font-medium text-xs sm:text-sm text-brand-900">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onSearchChange("");
              }}
              className={`pb-1 hover:text-brand-600 transition-all relative group cursor-pointer tracking-wider uppercase font-semibold ${
                selectedCategory === cat.id
                  ? "text-brand-700 font-bold"
                  : "text-brand-800"
              }`}
            >
              {cat.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-600 transition-transform origin-left duration-300 ${
                  selectedCategory === cat.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          ))}
          <button
            onClick={() => {
              const element = document.getElementById("virtual-closet");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="pb-1 text-pink-700 hover:text-pink-900 transition-all relative group cursor-pointer tracking-wider uppercase font-bold flex items-center gap-1.5"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            VIRTUAL CLOSET (IG)
          </button>
        </div>
      </nav>

      {/* Dynamic Search Box for Mobile only */}
      <div className="md:hidden px-4 pb-3.5 flex">
        <div className="w-full relative flex items-center">
          <input
            type="text"
            placeholder="O que você procura hoje?"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-brand-100/40 border border-brand-300 text-brand-900 placeholder-brand-500/70 text-xs px-4 py-2.5 pr-10 rounded-none outline-hidden focus:border-brand-900 focus:bg-white"
          />
          <Search size={16} className="absolute right-3.5 text-brand-600 pointer-events-none" />
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && typeof document !== "undefined" && createPortal(
          <div className="fixed inset-0 z-100 flex md:hidden font-sans" id="mobile-menu-overlay">
            {/* Backdrop mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-brand-950/60 backdrop-blur-xs cursor-pointer z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer sheet panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between z-50 overflow-hidden border-r border-brand-200"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Header inside Panel */}
                  <div className="p-5 border-b border-brand-200 flex items-center justify-between">
                    <div className="flex flex-col">
                      <h2 className="text-xl tracking-widest font-serif font-black uppercase text-brand-900 leading-none">
                        Charme
                      </h2>
                      <span className="text-[8px] tracking-widest uppercase font-mono text-brand-600 mt-1">
                        Moda Feminina
                      </span>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 hover:bg-brand-100 rounded-full text-brand-900 cursor-pointer active:scale-95 transition-all"
                      id="btn-mobile-menu-close"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Scrollable Navigation List */}
                  <div className="flex flex-col gap-5 p-5 overflow-y-auto max-h-[calc(100vh-215px)] scrollbar-thin">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-400 font-bold font-mono">
                      Categorias de Looks
                    </h3>
                    <div className="flex flex-col divide-y divide-brand-100 border border-brand-250/70 bg-brand-50/10 shadow-xs">
                      {navCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              onSelectCategory(cat.id);
                              onSearchChange("");
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center justify-between text-left text-sm py-3 px-4 transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? "bg-brand-900 text-white font-bold tracking-wide shadow-xs"
                                : "text-brand-800 hover:bg-brand-50/80 hover:text-brand-950 font-semibold"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {cat.id === "all" && <Sparkles size={13} className={isSelected ? "text-brand-200" : "text-brand-500"} />}
                              {cat.name}
                            </span>
                            <ChevronRight
                              size={14}
                              className={`transition-transform duration-200 ${
                                isSelected ? "text-brand-200 translate-x-0.5" : "text-brand-400"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const element = document.getElementById("virtual-closet");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full flex items-center justify-between text-left text-xs py-3 px-4 bg-gradient-to-r from-pink-50/80 to-rose-50/80 text-pink-850 font-bold border border-pink-100/60 shadow-xs hover:from-pink-100/80 hover:to-rose-100/80 transition-all cursor-pointer active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                        </span>
                        <span>Lookbook Instagram (Virtual Closet)</span>
                      </div>
                      <ChevronRight size={14} className="text-pink-400" />
                    </button>
                  </div>
                </div>

                {/* Bottom info cards on Drawer */}
                <div className="border-t border-brand-200 p-5 flex flex-col gap-2 text-xs text-brand-700 bg-brand-50/50">
                  <p className="font-semibold text-brand-900 flex items-center gap-1">
                    <span>📍</span> Itabuna-BA
                  </p>
                  <p className="text-[11px] text-brand-600 leading-relaxed">Rua 22, n 56, Parque Boa Vista</p>
                  <div className="flex gap-4 mt-2 font-mono text-[10px] border-t border-brand-200/60 pt-2.5">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenInfo();
                      }}
                      className="underline hover:text-brand-900 text-left cursor-pointer"
                    >
                      Informações
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenFeedback();
                      }}
                      className="underline hover:text-brand-900 text-left cursor-pointer"
                    >
                      Depoimentos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </header>
  );
}
