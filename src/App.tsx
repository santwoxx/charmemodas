import { useState, useMemo } from "react";
import {
  Heart,
  ShoppingBag,
  Trash2,
  X,
  CreditCard,
  Check,
  Award,
  Sparkles,
  MapPin,
  HelpCircle,
  TrendingUp,
  Instagram,
  FileText,
  Star,
  Users,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import Header from "./components/Header";
import BannerCarousel from "./components/BannerCarousel";
import CategoryHighlights from "./components/CategoryHighlights";
import DailyDeals from "./components/DailyDeals";
import InstagramFeed from "./components/InstagramFeed";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import { PRODUCTS, REVIEWS } from "./data";
import { Product, CartItem } from "./types";

export default function App() {
  // Application levels state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Layout presentation drawers states
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [brandStoryOpen, setBrandStoryOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [filtersOpenOnMobile, setFiltersOpenOnMobile] = useState(false);

  // Sorting products
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  // Filtering products
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>("all");
  const [selectedFabricFilter, setSelectedFabricFilter] = useState<string>("all");

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.hex === color.hex
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += 1;
        return nextCart;
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    quantity: number,
    size: string,
    colorHex: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.hex === colorHex
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: string, colorHex: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          )
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Favorites operations
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const isFav = prev.some((p) => p.id === product.id);
      if (isFav) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Filter & sort logic for the product catalog
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by main category selected from menu
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
               selectedCategory.toLowerCase().includes(p.category.toLowerCase())
      );
    }

    // Filter by search bar query
    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by size chips
    if (selectedSizeFilter !== "all") {
      result = result.filter((p) => p.sizes.includes(selectedSizeFilter));
    }

    // Filter by fabric materials
    if (selectedFabricFilter !== "all") {
      result = result.filter((p) => p.fabric.toLowerCase().includes(selectedFabricFilter.toLowerCase()));
    }

    // Sort operations
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchTerm, selectedSizeFilter, selectedFabricFilter, sortBy]);

  // Scroll smoothly to target blocks
  const scrollToFeedback = () => {
    const el = document.getElementById("customer-feedback-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToInstagram = () => {
    const el = document.getElementById("virtual-closet");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-between selection:bg-brand-300 selection:text-brand-900 overflow-x-hidden font-sans antialiased text-brand-900">
      
      {/* 1. Header (Navbar, Search, Cart toggle) */}
      <Header
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        favorites={favorites}
        onOpenFavorites={() => setFavoritesOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenInfo={() => setInfoOpen(true)}
        onOpenFeedback={scrollToFeedback}
      />

      {/* 2. Banner Carousel (Romantic & Natural Linen collections slides) */}
      <BannerCarousel
        onShopCollection={(cat) => setSelectedCategory(cat)}
        onOpenCouponDisclaimer={() => {}}
      />

      {/* 3. Category Highlights (Stories styling for Feedback, looks, story) */}
      <CategoryHighlights
        onOpenBrandStory={() => setBrandStoryOpen(true)}
        onOpenInfo={() => setInfoOpen(true)}
        onScrollToFeedback={scrollToFeedback}
        onScrollToInstagram={scrollToInstagram}
      />

      {/* 4. Deals of the Day component featuring countdown timer */}
      <DailyDeals
        onSelectProduct={setSelectedProduct}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />

      {/* Secondary Offers category banner grid - Styled to reflect Print 1 banner grids */}
      <section className="bg-white py-12 border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-600 font-extrabold flex items-center justify-center gap-1.5">
              <TrendingUp size={11} className="text-brand-600" />
              CAMPANHAS DO MÊS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black uppercase text-brand-900 tracking-wide mt-1">
              Seleções Especiais Charme
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offer Card 1 - Vests & Coletes */}
            <div className="relative group bg-brand-100 rounded-none overflow-hidden aspect-16/10 border border-brand-300 shadow-sm flex items-center p-6 md:p-8">
              <img
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop"
                alt="Coletes Linho"
                className="absolute inset-0 w-full h-full object-cover origin-right group-hover:scale-105 transition-transform duration-700 pointer-events-none brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-r from-brand-950/75 via-brand-950/40 to-transparent z-1" />
              <div className="relative z-10 max-w-xs text-white">
                <span className="text-[9px] uppercase font-mono tracking-widest font-bold bg-brand-650 px-2 py-0.5 rounded-none">
                  Alfaiataria Moderna
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-extrabold mt-2 uppercase tracking-wide leading-tight">
                  Coletes e Conjunto de Linho Puro
                </h4>
                <button
                  onClick={() => setSelectedCategory("Conjuntos")}
                  className="mt-4 bg-white text-brand-950 hover:bg-brand-100 font-sans text-[10px] font-extrabold tracking-[0.15em] uppercase px-3.5 py-2 rounded-none select-none active:scale-95 transition-transform cursor-pointer shadow-sm"
                >
                  Confira Looks
                </button>
              </div>
            </div>

            {/* Offer Card 2 - Dresses */}
            <div className="relative group bg-brand-100 rounded-none overflow-hidden aspect-16/10 border border-brand-300 shadow-sm flex items-center p-6 md:p-8">
              <img
                src="https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=600&auto=format&fit=crop"
                alt="Vestidos Fluídos"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-r from-brand-950/75 via-brand-950/40 to-transparent z-1" />
              <div className="relative z-10 max-w-xs text-white">
                <span className="text-[9px] uppercase font-mono tracking-widest font-bold bg-brand-650 px-2 py-0.5 rounded-none">
                  Fluidez & Elegância
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-extrabold mt-2 uppercase tracking-wide leading-tight">
                  Vestidos para Florescer sua Essência
                </h4>
                <button
                  onClick={() => setSelectedCategory("Vestidos")}
                  className="mt-4 bg-white text-brand-950 hover:bg-brand-100 font-sans text-[10px] font-extrabold tracking-[0.15em] uppercase px-3.5 py-2 rounded-none select-none active:scale-95 transition-transform cursor-pointer shadow-sm"
                >
                  Confira Looks
                </button>
              </div>
            </div>

            {/* Offer Card 3 - Clothing Materials Premium */}
            <div className="relative group bg-brand-100 rounded-none overflow-hidden aspect-16/10 border border-brand-300 shadow-sm flex items-center p-6 md:p-8">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                alt="Looks Charme"
                className="absolute inset-0 w-full h-full object-cover origin-left group-hover:scale-105 transition-transform duration-700 pointer-events-none brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-r from-brand-950/75 via-brand-950/40 to-transparent z-1" />
              <div className="relative z-10 max-w-xs text-white">
                <span className="text-[9px] uppercase font-mono tracking-widest font-bold bg-brand-650 px-2 py-0.5 rounded-none">
                  Design Autoral
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-extrabold mt-2 uppercase tracking-wide leading-tight">
                  Modelagens Sofisticadas & Tecidos Nobres
                </h4>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="mt-4 bg-white text-brand-950 hover:bg-brand-100 font-sans text-[10px] font-extrabold tracking-[0.15em] uppercase px-3.5 py-2 rounded-none select-none active:scale-95 transition-transform cursor-pointer shadow-sm"
                >
                  Ver Todo Catálogo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Store Clothes Grid & Filter Sidebar Panel */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8" id="catalog-section">
        {/* Sidebar filters */}
        <div className="lg:col-span-3 space-y-4">
          <button
            onClick={() => setFiltersOpenOnMobile(!filtersOpenOnMobile)}
            className="w-full lg:hidden bg-white hover:bg-brand-100 text-brand-900 border border-brand-300 p-4 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-between cursor-pointer shadow-3xs"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-brand-700 animate-pulse" />
              Filtrar & Ordenar Catálogo
            </span>
            <span className="text-brand-600 font-mono text-[10px]">{filtersOpenOnMobile ? "Ocultar ▲" : "Expandir ▼"}</span>
          </button>

          <div className={`${filtersOpenOnMobile ? "block" : "hidden lg:block"} space-y-6`}>
            <div className="bg-white p-5 rounded-none border border-brand-200 shadow-xs">
              {/* Header info */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-200">
                <span className="font-serif font-extrabold text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal size={14} className="text-brand-750" />
                  Filtrar Propostas
                </span>
                {(selectedSizeFilter !== "all" || selectedFabricFilter !== "all" || sortBy !== "featured") && (
                  <button
                    onClick={() => {
                      setSelectedSizeFilter("all");
                      setSelectedFabricFilter("all");
                      setSortBy("featured");
                    }}
                    className="text-[10px] uppercase font-mono underline text-brand-600 hover:text-brand-900 font-bold"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Sorting items */}
              <div className="py-4 border-b border-brand-150">
                <span className="text-[10.5px] uppercase font-mono tracking-wide text-brand-500 font-bold block mb-2.5">
                  Organizar Looks:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-brand-50 border border-brand-300 text-xs text-brand-900 rounded-none p-2 outline-hidden focus:border-brand-500 font-medium"
                >
                  <option value="featured">Destaques da Grife</option>
                  <option value="price-asc">Preço: Menor para Maior</option>
                  <option value="price-desc">Preço: Maior para Menor</option>
                </select>
              </div>

              {/* Filter by Size */}
              <div className="py-4 border-b border-brand-150">
                <span className="text-[10.5px] uppercase font-mono tracking-wide text-brand-500 font-bold block mb-3">
                  Filtrar Tamanho:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["all", "PP", "P", "M", "G", "GG", "Único"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSizeFilter(sz)}
                      className={`px-3 py-1.5 rounded-none text-xs border font-mono font-bold transition-all cursor-pointer ${
                        selectedSizeFilter === sz
                          ? "bg-brand-900 text-white border-brand-900 shadow-3xs"
                          : "bg-brand-50 hover:bg-brand-100 text-brand-800 border-brand-200"
                      }`}
                    >
                      {sz === "all" ? "Todos" : sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by Fabrics */}
              <div className="py-4">
                <span className="text-[10.5px] uppercase font-mono tracking-wide text-brand-500 font-bold block mb-3">
                  Material / Tecido:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["all", "Linho", "Seda", "Cetim", "Crepe"].map((fabric) => (
                    <button
                      key={fabric}
                      onClick={() => setSelectedFabricFilter(fabric)}
                      className={`px-2.5 py-1.5 rounded-none text-xs border font-medium transition-all cursor-pointer ${
                        selectedFabricFilter === fabric
                          ? "bg-brand-900 text-white border-brand-900 shadow-3xs"
                          : "bg-brand-50 hover:bg-brand-100 text-brand-800 border-brand-200"
                      }`}
                    >
                      {fabric === "all" ? "Todos os tecidos" : fabric}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Physical Address details widget box */}
            <div className="bg-brand-900 text-white p-5 rounded-none border border-brand-800 shadow-sm font-sans space-y-3.5">
              <div className="flex items-center gap-2">
                <MapPin size={17} className="text-brand-300 animate-pulse" />
                <span className="font-serif font-black uppercase tracking-[0.15em] text-xs sm:text-sm">
                  Nossa Casa Física
                </span>
              </div>
              <p className="text-xs text-brand-200 leading-relaxed font-medium">
                Visite-nos em Itabuna, BA e confira nossos provadores amplos, com café especial te esperando para experimentar cada look!
              </p>
              <div className="text-[11px] text-gray-300 font-mono space-y-0.5">
                <p>📍 Rua 22, n 56, Parque Boa Vista</p>
                <p>📞 WhatsApp: (73) 98195-2110</p>
                <p>⏰ Seg a Sex: 09h às 19h • Sáb: 09h às 15h</p>
              </div>
              <button
                onClick={() => setBrandStoryOpen(true)}
                className="w-full bg-white hover:bg-brand-100 text-brand-950 font-sans text-[10px] font-extrabold tracking-[0.15em] uppercase py-2.5 rounded-none active:scale-95 transition-transform cursor-pointer"
              >
                Nossa Essência
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic products results card grids */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-brand-200">
            <h3 className="font-serif font-extrabold text-lg sm:text-xl uppercase tracking-wide">
              {selectedCategory === "all" ? "Todos os Looks" : `Looks: ${selectedCategory}`}
              {searchTerm && <span className="text-xs text-brand-500 lowercase font-sans ml-2">buscando por "{searchTerm}"</span>}
            </h3>
            <span className="text-xs text-brand-500 font-mono font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? "look encontrado" : "looks encontrados"}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-none p-12 text-center border border-brand-200 flex flex-col items-center justify-center">
              <span className="text-3xl mb-3">🔍</span>
              <h4 className="font-serif font-bold text-base text-brand-900">Nenhum look corresponde aos termos selecionados</h4>
              <p className="text-xs text-brand-500 max-w-sm mt-1 leading-relaxed">
                Tente limpar os filtros de tamanho e tecido ou digite outro termo na barra de pesquisa superior.
              </p>
              <button
                onClick={() => {
                  setSelectedSizeFilter("all");
                  setSelectedFabricFilter("all");
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 bg-brand-900 text-white text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-none cursor-pointer"
              >
                Ver Todas as Novidades
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isFavorite = favorites.some((fav) => fav.id === product.id);
                const defaultSize = product.sizes[0];
                const defaultColor = product.colors[0];

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-none overflow-hidden border border-brand-250 hover:border-brand-400 hover:shadow-md transition-all group flex flex-col justify-between h-full animate-fade-in"
                  >
                    {/* Image and quick actions */}
                    <div className="relative aspect-4/5 w-full bg-brand-50 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <div className="absolute top-2.5 left-2.5 bg-brand-900 border border-brand-850 text-white font-mono text-[8px] sm:text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-none z-10 shadow-xs">
                        Exclusivo
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(product);
                        }}
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-none z-10 transition-all cursor-pointer ${
                          isFavorite
                            ? "bg-red-500 text-white"
                            : "bg-white/90 hover:bg-white text-brand-920"
                        } shadow-xs border border-brand-200`}
                      >
                        <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
                      </button>

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover action block */}
                      <div
                        className="absolute inset-x-0 bottom-0 bg-brand-900/85 backdrop-blur-xs text-white py-2.5 text-center text-[10px] font-sans font-bold uppercase tracking-[0.15em] translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-center gap-1.5"
                      >
                        <Eye size={12} /> Espionar Peça
                      </div>
                    </div>

                    {/* Text Details and price */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Fabric and stars */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9.5px] uppercase tracking-wider font-mono text-brand-400 font-bold">
                            {product.fabric}
                          </span>
                          <div className="flex text-amber-500 text-[9px]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Title */}
                        <h4
                          onClick={() => setSelectedProduct(product)}
                          className="text-xs sm:text-sm font-bold text-brand-900 tracking-tight cursor-pointer hover:text-brand-700 min-h-[38px] line-clamp-2"
                        >
                          {product.name}
                        </h4>
                      </div>

                      {/* Price-less Booking Section and Add buttons */}
                      <div className="mt-4 pt-3 border-t border-brand-100 space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-brand-500 font-extrabold block">
                          Modelo Exclusivo
                        </span>

                        <span className="text-[11px] text-brand-650 leading-tight block">
                          Sob Consulta no Atelier
                        </span>

                        {/* Add to cart trigger */}
                        <div className="mt-3.5 flex gap-1 pt-1">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="flex-1 bg-brand-100 hover:bg-brand-200 text-brand-950 font-sans text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 rounded-none border border-brand-200 shadow-3xs cursor-pointer"
                          >
                            Ver Look Completo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. Instagram Virtual Closet feed section */}
      <InstagramFeed
        onSelectProduct={setSelectedProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 7. Customer Reviews & Ratings feedbacks board (highlight Feedback click target) */}
      <section className="bg-brand-100 py-12 border-t border-b border-brand-200" id="customer-feedback-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-500 font-bold block">
              HIGHLIGHT FEEDBACKS REALES
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black uppercase text-brand-900 tracking-wide mt-1 flex items-center justify-center gap-1">
              <Users size={18} className="text-brand-750" />
              Depoimentos de Nossas Clientes
            </h3>
            <p className="text-xs text-brand-600 max-w-md mx-auto mt-2 font-medium">
              A maior satisfação da equipe Charme Modas é acompanhar o carinho das amigas e clientes com os looks recebidos em todo o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-brand-200 p-5 rounded-sm shadow-3xs space-y-4 flex flex-col justify-between"
              >
                {/* Text feedback review content bubble style */}
                <p className="italic text-xs sm:text-sm text-brand-800 font-medium leading-relaxed">
                  "{review.text}"
                </p>

                {/* Author profile and star indices */}
                <div className="flex items-center gap-3 pt-3 border-t border-brand-100">
                  <img
                    src={review.avatarUrl || "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar"}
                    alt={review.author}
                    className="w-10 h-10 rounded-full border border-brand-250 bg-brand-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-brand-900 leading-none">
                      {review.author}
                    </h5>
                    <span className="text-[10px] text-brand-400 font-mono mt-1 block">
                      Encomendou {review.sizeBought} • Cor {review.colorBought}
                    </span>
                    {/* Star indices */}
                    <div className="flex text-amber-500 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8">
            <a
              href="https://wa.me/5573981952110?text=Olá,%20gostaria%20de%20enviar%20meu%20depoimento%20da%20Charme!"
              target="_blank"
              rel="noreferrer"
              className="bg-white border hover:bg-brand-100 border-brand-350 text-brand-900 font-sans text-[11px] font-black uppercase tracking-[0.12em] px-6 py-3 rounded-none active:scale-95 transition-transform flex items-center gap-2"
            >
              Enviar Meu Depoimento pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 8. Elegant boutique footer containing credit details, payments and policies */}
      <footer className="bg-brand-900 text-white font-sans text-xs">
        {/* Brand values banner footer */}
        <div className="border-b border-brand-800 bg-brand-950/45 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-6 text-center text-xs text-brand-200">
            <div className="flex flex-col items-center max-w-xs space-y-1">
              <span className="bg-brand-800 p-2.5 rounded-none text-brand-300">⚡</span>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wide">Entrega Expressa</h5>
              <p className="text-[11px] text-brand-300/80">Entrega hoje mesmo em Itabuna, BA. Despacho ágil via Sedex para todo o Brasil.</p>
            </div>
            <div className="flex flex-col items-center max-w-xs space-y-1">
              <span className="bg-brand-800 p-2.5 rounded-none text-brand-300">💳</span>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wide">Em até 10x s/ Juros</h5>
              <p className="text-[11px] text-brand-300/80">Parcele as compras em até 10 parcelas fixas ou divida em 2 cartões de crédito.</p>
            </div>
            <div className="flex flex-col items-center max-w-xs space-y-1">
              <span className="bg-brand-800 p-2.5 rounded-none text-brand-300">✨</span>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wide">Troca Facilitada</h5>
              <p className="text-[11px] text-brand-300/80">Até 7 dias corridos de troca gratuita garantida sem burocracias de devolução.</p>
            </div>
          </div>
        </div>

        {/* Links listing grids */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col space-y-3">
            <h4 className="text-lg font-serif uppercase tracking-widest font-black text-white leading-none">
              Charme Modas
            </h4>
            <p className="text-brand-300 leading-relaxed font-sans text-[11px]">
              Especialistas em vestir sua melhor versão with tecidos finos e modelagem perfeita. Nossa loja online e atelier físico levam looks deslumbrantes direto para a sua casa.
            </p>
            <p className="text-xs text-brand-400 font-mono">
              📍 Rua 22, n 56, Parque Boa Vista - Itabuna, BA
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-black text-white uppercase tracking-wider">Atendimento Especial</h5>
            <ul className="space-y-2 text-brand-350">
              <li>
                <a
                  href="https://wa.me/5573981952110"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  💬 WhatsApp: (73) 98195-2110
                </a>
              </li>
              <li className="cursor-pointer hover:text-white transition-colors animate-pulse" onClick={() => setInfoOpen(true)}>
                Prazo de Entrega e Envio
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setInfoOpen(true)}>
                Termos de Troca & Devoluções
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setBrandStoryOpen(true)}>
                Trabalhe Conosco / Parcerias
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-black text-white uppercase tracking-wider">Políticas & Ajuda</h5>
            <ul className="space-y-2 text-brand-300">
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setInfoOpen(true)}>
                Políticas de Troca
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setInfoOpen(true)}>
                Políticas de Privacidade
              </li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setInfoOpen(true)}>
                Como Comprar no WhatsApp
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  📸 Instagram @charmmemoda
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods listing row */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-black text-white uppercase tracking-wider">Bandeiras</h5>
            <div className="flex flex-wrap gap-2 text-white">
              <span className="bg-brand-850 px-2.5 py-1 rounded-none font-mono font-bold text-[10px] shadow-xs hover:bg-brand-800 cursor-default">
                PIX
              </span>
              <span className="bg-brand-850 px-2.5 py-1 rounded-none font-mono font-bold text-[10px] shadow-xs hover:bg-brand-800 cursor-default">
                VISA
              </span>
              <span className="bg-brand-850 px-2.5 py-1 rounded-none font-mono font-bold text-[10px] shadow-xs hover:bg-brand-800 cursor-default">
                MASTERCARD
              </span>
              <span className="bg-brand-850 px-2.5 py-1 rounded-none font-mono font-bold text-[10px] shadow-xs hover:bg-brand-800 cursor-default">
                ELO
              </span>
            </div>
            <p className="text-[10px] text-brand-400 leading-tight pt-1">
              Pagamentos encriptados via gateway 100% testado e seguro.
            </p>
          </div>
        </div>

        {/* Real address copyright bottom line */}
        <div className="border-t border-brand-850 text-center py-6 text-brand-400 font-mono text-[9px] px-4 space-y-1">
          <p>© 2026 CHARME MODA FEMININA. Todos os direitos reservados.</p>
          <p>CNPJ: 09.339.936/0001-16 • Rua 22, n 56, Parque Boa Vista, Itabuna - BA, CEP 45600-002</p>
          <p>Desenvolvido para provadores elegantes. Vestindo a sua melhor versão.</p>
        </div>
      </footer>

      {/* 9. INFORMATION POPUPS MODALS */}
      {/* Brand story */}
      {brandStoryOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="modal-brandstatement">
          <div className="fixed inset-0" onClick={() => setBrandStoryOpen(false)} />
          <div className="relative bg-white text-brand-900 rounded-none overflow-hidden p-6 max-w-lg w-full z-10 border border-brand-300 text-center font-sans">
            <button
              onClick={() => setBrandStoryOpen(false)}
              className="absolute top-4 right-4 text-brand-400 hover:text-brand-900 font-mono font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-600 font-extrabold mb-1 block">
              NOSSO CORAÇÃO
            </span>
            <h4 className="text-xl font-serif font-black uppercase text-brand-900 mb-4 tracking-wide">
              A Essência da Charme
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-brand-700 leading-relaxed text-justify font-medium">
              <p>
                A **Charme Modas** nasceu no coração de Itabuna, Bahia, com um sonho nobre: provar que a sofisticação da alfaiataria e a leveza do linho podem vestir qualquer mulher com elegância no dia a dia.
              </p>
              <p>
                Mais do que simplesmente vender roupas femininas, nós criamos o **Virtual Closet** para ser o seu provador online interativo de looks curados! Cada vestido, conjunto e bolsa é escolhido minuciosamente pela nossa fundadora pensando em toque de tecido superior, costuras invisíveis e acabamentos que valorizam você.
              </p>
              <p className="italic text-center font-serif text-brand-900 font-bold">
                "Vista sua melhor versão e exale seu charme por onde passar!"
              </p>
            </div>
            <button
              onClick={() => setBrandStoryOpen(false)}
              className="mt-6 bg-brand-900 hover:bg-brand-800 text-white font-sans text-xs uppercase tracking-[0.15em] font-black py-2.5 px-6 rounded-none w-full transition-transform active:scale-95 cursor-pointer"
            >
              Voltar às Compras
            </button>
          </div>
        </div>
      )}

      {/* Store Info and Hours policies */}
      {infoOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="modal-store-info">
          <div className="fixed inset-0" onClick={() => setInfoOpen(false)} />
          <div className="relative bg-white text-brand-900 rounded-none overflow-hidden p-6 max-w-lg w-full z-10 border border-brand-300 font-sans">
            <button
              onClick={() => setInfoOpen(false)}
              className="absolute top-4 right-4 text-brand-400 hover:text-brand-900 font-mono font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-600 font-extrabold mb-1 block text-center">
              DÚVIDAS FREQUENTES
            </span>
            <h4 className="text-xl font-serif font-black uppercase text-brand-900 mb-4 tracking-wide text-center">
              Informações Importantes
            </h4>
            <div className="space-y-4 text-xs sm:text-sm text-brand-800 leading-relaxed font-medium overflow-y-auto max-h-[60vh] pr-1.5 scrollbar-thin">
              <div className="space-y-1 pb-3 border-b border-brand-100">
                <h5 className="font-bold text-brand-900">📍 Onde fica a loja física?</h5>
                <p className="text-brand-700 text-xs text-justify">
                  Estamos localizados em Itabuna, BA, na Rua 22, n 56, Parque Boa Vista. Nosso espaço é aconchegante, climatizado e focado em atendimento personalizado de consultoria de imagem.
                </p>
              </div>

              <div className="space-y-1 pb-3 border-b border-brand-100">
                <h5 className="font-bold text-brand-900">🚚 Como funciona a entrega e os envios?</h5>
                <p className="text-brand-700 text-xs text-justify">
                  Como trabalhamos com peças exclusivas confeccionadas no atelier e sob consulta de tamanho, as opções, prazos e taxas de entrega são combinados de maneira fácil diretamente pelo WhatsApp para cada pedido (enviamos pra todo o Brasil!).
                </p>
              </div>

              <div className="space-y-1 pb-3 border-b border-brand-100">
                <h5 className="font-bold text-brand-900">💳 Quais são os métodos de pagamento aceitos?</h5>
                <p className="text-brand-700 text-xs text-justify">
                  Trabalhamos com Pix (com processamento instantâneo de reserva) e cartões de crédito em até 10 parcelas sem juros, permitindo ainda dividir o valor final em 2 cartões de bandeiras diferentes.
                </p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-brand-900">🔄 Como realizo trocas?</h5>
                <p className="text-brand-700 text-xs text-justify">
                  Sua satisfação merece total proteção. Você tem até 7 dias a partir do recebimento dos looks para solicitar a troca das numerações. Fale no nosso WhatsApp que orientamos em poucos passos.
                </p>
              </div>
            </div>
            <button
              onClick={() => setInfoOpen(false)}
              className="mt-6 bg-brand-900 hover:bg-brand-800 text-white font-sans text-xs uppercase tracking-[0.15em] font-black py-2.5 px-6 rounded-none w-full transition-transform active:scale-95 cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 10. PRODUCT DETAIL DIALOG POPUP */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />

      {/* 11. SHOPPING CART SIDEBAR DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 12. FAVORITES MODAL DRAWER OVERLAY */}
      {favoritesOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans text-brand-900" id="favorites-drawer">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-3xs" onClick={() => setFavoritesOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10 animate-slide-left">
            
            {/* Header */}
            <div className="bg-brand-900 text-white p-5 flex items-center justify-between border-b border-brand-800">
              <div className="flex items-center gap-2">
                <Heart size={18} fill="white" className="text-red-400 animate-pulse" />
                <span className="font-serif font-black uppercase tracking-[0.15em] text-xs sm:text-sm">
                  Looks Favoritos
                </span>
              </div>
              <button
                onClick={() => setFavoritesOpen(false)}
                className="p-1 rounded-none text-gray-300 hover:text-white cursor-pointer hover:bg-brand-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* List */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-brand-50/75">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <span className="text-3xl animate-bounce">💅</span>
                  <h5 className="font-serif font-bold text-sm text-brand-950">Nenhum look favoritado</h5>
                  <p className="text-xs text-brand-500 max-w-xs leading-relaxed">
                    Navegue pelos nossos conjuntos e vestidos e monte sua seleção de looks preferidos clicando no ícone de coração!
                  </p>
                </div>
              ) : (
                favorites.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-brand-200 p-3 rounded-none flex items-center gap-3 shadow-3xs"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-12 h-15 object-cover rounded-none" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0 pr-1 text-left">
                      <h6
                        onClick={() => {
                          setFavoritesOpen(false);
                          setSelectedProduct(p);
                        }}
                        className="text-xs font-bold text-brand-900 leading-snug truncate hover:underline cursor-pointer font-display"
                      >
                        {p.name}
                      </h6>
                      <span className="text-[10px] font-mono text-brand-400 block">{p.fabric}</span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-brand-500 font-extrabold mt-0.5 block">
                        Sob Consulta
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setFavoritesOpen(false);
                          setSelectedProduct(p);
                        }}
                        className="bg-brand-900 text-white font-sans text-[9px] font-bold uppercase py-1.5 px-3 rounded-none hover:bg-brand-800 active:scale-95 transition-transform cursor-pointer"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(p)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-none text-center cursor-pointer"
                        title="Remover"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-brand-100 text-center">
              <button
                onClick={() => setFavoritesOpen(false)}
                className="w-full bg-brand-150 hover:bg-brand-200 text-brand-950 font-sans text-xs uppercase tracking-[0.15em] font-black py-2.5 rounded-none border border-brand-300 cursor-pointer"
              >
                Voltar às Compras
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
