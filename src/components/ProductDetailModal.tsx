import { useState } from "react";
import { X, Star, Heart, ShoppingBag, Eye, ShieldCheck, Scale, RefreshCw } from "lucide-react";
import { Product } from "../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size: string, color: { name: string; hex: string }) => void;
  onToggleFavorite: (p: Product) => void;
  favorites: Product[];
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleFavorite,
  favorites,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "washing" | "delivery">("details");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) return null;

  // Set default states if not clicked yet
  const colors = product.colors;
  const sizes = product.sizes;
  const activeColor = selectedColor || colors[0];
  const activeSize = selectedSize || sizes[0];

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleAddToCartSubmit = () => {
    onAddToCart(product, activeSize, activeColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-fade-in" id="product-detail-modal">
      {/* Backdrop */}
      <div className="fixed inset-0 cursor-default" onClick={onClose} />

      {/* Main product dialog card */}
      <div className="relative bg-white rounded-none overflow-y-auto md:overflow-hidden shadow-2xl max-w-4xl w-full h-full max-h-[94vh] sm:max-h-[85vh] flex flex-col md:flex-row z-10 border border-brand-300">
        
        {/* Close Button top corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-brand-50 hover:bg-brand-200 text-brand-900 border border-brand-200 px-3 py-1.5 rounded-none z-20 cursor-pointer shadow-sm transition-colors text-xs font-bold font-mono"
          id="btn-product-modal-close"
          title="Fechar"
        >
          ✕
        </button>

        {/* Left Side: Images galleries container */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-between p-4 border-b md:border-b-0 md:border-r border-brand-200">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-none bg-brand-100 border border-brand-200">
            <span className="absolute top-2.5 left-2.5 bg-brand-900 text-white text-[9px] font-mono font-bold px-3 py-0.5 rounded-none shadow-xs z-10 uppercase tracking-[0.15em]">
              Exclusividade Charme
            </span>

            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Galleries thumbnail selector loops */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-3 justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-14 h-18 rounded border overflow-hidden transition-all bg-brand-100 cursor-pointer ${
                    currentImageIndex === index
                      ? "border-brand-800 ring-2 ring-brand-500/20 shadow-sm"
                      : "border-brand-200 hover:border-brand-400"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Options product config */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 overflow-y-visible md:overflow-y-auto flex flex-col justify-between bg-brand-50/70 h-auto md:h-full font-sans text-brand-900 scrollbar-thin">
          <div>
            {/* Category and ratings */}
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-500 font-extrabold">
                {product.category} • {product.fabric}
              </span>

              {/* Star reviews counter */}
              <div className="flex items-center gap-1">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-brand-500 font-semibold font-sans">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Core titles and brief */}
            <h3 className="text-lg sm:text-xl font-serif font-black uppercase text-brand-900 tracking-wide mt-2.5 pr-8 leading-snug">
              {product.name}
            </h3>

            {/* Price-less Showcase Notice */}
            <div className="mt-4 p-4 bg-white border border-brand-200 rounded-none">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-500 font-extrabold block mb-1">
                Disponibilidade
              </span>
              <div className="text-sm font-bold text-brand-900 font-sans">
                Reserva sob Consulta de Tamanho & Cores
              </div>
              <span className="text-xs text-brand-650 font-medium mt-1.5 block leading-relaxed">
                Adicione a peça ao seu carrinho de reservas para consultar a disponibilidade do look no atelier e receber atendimento exclusivo.
              </span>
            </div>

            {/* Description brief */}
            <p className="mt-4.5 text-xs sm:text-sm text-brand-700 leading-relaxed font-sans font-medium">
              {product.description}
            </p>

            {/* COLOR CHIP SELECTOR */}
            <div className="mt-6">
              <span className="text-[10.5px] uppercase font-mono tracking-wider text-brand-500 font-bold block mb-2.5">
                Opções de Cores: <strong className="text-brand-900">{activeColor.name}</strong>
              </span>
              <div className="flex items-center gap-2.5">
                {colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative flex items-center justify-center p-1 border bg-white cursor-pointer transition-all ${
                      activeColor.hex === color.hex
                        ? "border-brand-900 scale-105"
                        : "border-brand-200 hover:border-brand-400"
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-5 h-5 shadow-inner block border border-black/10 rounded-none"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SHAPE SELECTOR */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10.5px] uppercase font-mono tracking-wider text-brand-500 font-bold">
                  Escolha o Tamanho: <strong className="text-brand-900">{activeSize}</strong>
                </span>
                {/* Size guide link */}
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[10px] uppercase font-mono text-brand-600 hover:text-brand-800 underline font-bold cursor-pointer"
                >
                  {showSizeGuide ? "Fechar Medidas ▲" : "Tabela de Medidas ▼"}
                </button>
              </div>

              {showSizeGuide && (
                <div className="bg-white border border-brand-300 p-3.5 mb-4 text-[11px] text-brand-850 leading-relaxed font-sans space-y-1 z-15 shadow-2xs relative animate-fade-in">
                  <h5 className="font-bold text-center border-b border-brand-200 pb-1 mb-2 uppercase text-[10px] tracking-wider text-brand-900">
                    📏 Guia de Medidas Charme
                  </h5>
                  <p>• <strong>PP:</strong> Busto 82-86cm | Cintura 62-66cm | Quadril 90-94cm</p>
                  <p>• <strong>P:</strong> Busto 86-90cm | Cintura 66-70cm | Quadril 94-98cm</p>
                  <p>• <strong>M:</strong> Busto 90-95cm | Cintura 70-75cm | Quadril 98-103cm</p>
                  <p>• <strong>G:</strong> Busto 95-101cm | Cintura 75-81cm | Quadril 103-109cm</p>
                  <p>• <strong>GG:</strong> Busto 101-107cm | Cintura 81-87cm | Quadril 109-115cm</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 rounded-none border font-mono font-bold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                      activeSize === sz
                        ? "bg-brand-900 text-white border-brand-900 shadow-sm"
                        : "bg-white hover:bg-brand-200 text-brand-850 border-brand-200"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive info Tabs to list garment details */}
            <div className="mt-8 border-t border-brand-250 pt-4">
              <div className="flex border-b border-brand-200 text-[10px] sm:text-xs">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-1.5 px-3 uppercase tracking-wider font-extrabold focus:outline-hidden ${
                    activeTab === "details" ? "border-b-2 border-brand-900 text-brand-950" : "text-brand-500 hover:text-brand-700"
                  }`}
                >
                  Ficha do Produto
                </button>
                <button
                  onClick={() => setActiveTab("washing")}
                  className={`pb-1.5 px-3 uppercase tracking-wider font-extrabold focus:outline-hidden ${
                    activeTab === "washing" ? "border-b-2 border-brand-900 text-brand-950" : "text-brand-500 hover:text-brand-700"
                  }`}
                >
                  Cuidados / Lavagem
                </button>
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`pb-1.5 px-3 uppercase tracking-wider font-extrabold focus:outline-hidden ${
                    activeTab === "delivery" ? "border-b-2 border-brand-900 text-brand-950" : "text-brand-500 hover:text-brand-700"
                  }`}
                >
                  Entrega / Troca
                </button>
              </div>

              {/* Tab Display Cases */}
              <div className="pt-3 font-sans text-xs text-brand-700 leading-relaxed font-medium">
                {activeTab === "details" && (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.map((dt, idx) => (
                      <li key={idx}>{dt}</li>
                    ))}
                    <li>Origem: Fabricado de forma consciente no Brasil</li>
                  </ul>
                )}
                {activeTab === "washing" && (
                  <div className="space-y-1">
                    <p>✨ Por ser um tecido fino de excelente qualidade, recomendamos:</p>
                    <p>• Lavar somente à mão com sabão neutro líquido.</p>
                    <p>• Não centrifugar e secar preferencialmente na sombra no cabide.</p>
                    <p>• Passar ferro em temperatura suave pelo avesso para proteger fibras de linho/cetim.</p>
                  </div>
                )}
                {activeTab === "delivery" && (
                  <div className="space-y-1">
                    <p>🚀 <strong>Serviços & Entregas pelo WhatsApp:</strong></p>
                    <p>• <strong>Como funciona?</strong> A combinar serviços de envio e entregas pelo WhatsApp junto com as especificações do tamanho da peça.</p>
                    <p>• <strong>Prazo das reservas:</strong> Você faz a reserva do look no site e finalizamos o envio, retirada no atelier e frete no atendimento do WhatsApp.</p>
                    <p>• <strong>Troca Descomplicada:</strong> Você possui total suporte no atendimento digital para tirar medidas detalhadas do seu busto/cintura antes do envio.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal bottom section checkout items */}
          <div className="mt-8 pt-4 border-t border-brand-200 flex flex-wrap sm:flex-nowrap gap-3 items-center">
            {/* Toggle Favorite trigger */}
            <button
              onClick={() => onToggleFavorite(product)}
              className={`p-3 rounded-none border transition-all cursor-pointer ${
                isFavorite
                  ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                  : "bg-white border-brand-300 hover:bg-brand-100 hover:text-brand-950 text-brand-600"
              }`}
              title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            {/* Direct insert to card button */}
            <button
              onClick={handleAddToCartSubmit}
              className="flex-1 bg-brand-900 hover:bg-brand-800 text-white font-sans text-xs sm:text-sm uppercase tracking-[0.15em] font-black py-4 rounded-none text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={15} />
              Reservar e Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
