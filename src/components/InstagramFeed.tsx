import { useState } from "react";
import { MessageCircle, Heart, Instagram, ShoppingBag, Eye, ExternalLink, Sparkles } from "lucide-react";
import { InstagramPost, Product } from "../types";
import { INSTAGRAM_POSTS, PRODUCTS } from "../data";

interface InstagramFeedProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function InstagramFeed({ onSelectProduct, onAddToCart }: InstagramFeedProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  // Retrieve products shown on the selected looking post
  const getLinkedProducts = (post: InstagramPost): Product[] => {
    return PRODUCTS.filter((p) => post.linkedProductIds.includes(p.id));
  };

  return (
    <div className="w-full bg-linear-to-b from-white to-brand-100 py-12 border-b border-brand-200" id="virtual-closet">
      <div className="max-w-7xl mx-auto px-4">
        {/* Instagram Header Section - Mimicking Print 3 exactly */}
        <div className="bg-white border border-brand-200 rounded-none p-6 sm:p-8 max-w-3xl mx-auto mb-10 shadow-xs">
          {/* Top Info section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-brand-150">
            {/* Round Avatar with beige background */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#cfae90] flex flex-col items-center justify-center border-2 border-white shadow-md text-white text-center p-2">
                <span className="font-serif font-extrabold text-[13px] tracking-widest leading-none uppercase">Charme</span>
                <span className="text-[5.5px] uppercase font-mono tracking-widest leading-none font-bold mt-1">Moda Feminina</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-full p-1 border-2 border-white">
                <Instagram size={14} />
              </div>
            </div>

            {/* Profile Metrics and Names */}
            <div className="flex-1 font-sans text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h4 className="text-lg sm:text-xl font-bold text-brand-900 tracking-tight flex items-center gap-1">
                  charmmemoda
                  {/* Verified blue badge exactly shown in print 2/3 */}
                  <span className="inline-flex items-center justify-center bg-sky-500 text-white rounded-full w-4.5 h-4.5 text-[8px] font-bold" title="Perfil Verificado">
                    ✓
                  </span>
                </h4>
                <div className="flex gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-brand-900 text-white text-xs font-bold px-4 py-1.5 rounded-none hover:bg-brand-850 transition-colors shadow-xs"
                  >
                    Seguir
                  </a>
                  <a
                    href="https://wa.me/5573981952110"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-brand-200 text-brand-900 border border-brand-300 text-xs font-bold px-4 py-1.5 rounded-none hover:bg-brand-300 transition-colors"
                  >
                    Mensagem
                  </a>
                </div>
              </div>

              {/* Instagram metrics row */}
              <div className="flex items-center justify-center sm:justify-start gap-6 mt-4 text-xs sm:text-sm text-brand-800/90 font-medium">
                <div>
                  <strong className="text-brand-950 font-bold">168</strong> posts
                </div>
                <div>
                  <strong className="text-brand-950 font-bold">11,8 mil</strong> seguidores
                </div>
                <div>
                  <strong className="text-brand-950 font-bold">1.345</strong> seguindo
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Bio text exactly formatted from image 3 */}
          <div className="pt-5 font-sans text-xs sm:text-sm text-brand-800/95 leading-relaxed">
            <h5 className="font-bold text-brand-900 text-sm">CHARME MODA FEMININA</h5>
            <p className="mt-1 font-medium italic">Vista sua melhor versão ✨</p>
            <p className="mt-1 flex items-center gap-1.5">
              <span>📍</span> Itabuna-Ba | Rua 22, n 56 , Parque Boa Vista
            </p>
            <p className="leading-tight mt-1 flex items-center gap-1.5">
              <span>📦🌍</span> Loja Online e Física | Envio para todo o Brasil
            </p>
            <p className="font-bold text-brand-900 mt-2.5 uppercase tracking-wide flex items-center gap-1">
              <span>⬇️</span> CLIQUE PARA COMPRAR NO LOOKBOOK INTERATIVO ABAIXO:
            </p>
            <a
              href="https://wa.me/5573981952110?text=Olá,%20gostaria%20de%20ver%20looks%20disponíveis%20da%20Charme!"
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 hover:underline font-mono text-xs sm:text-sm inline-block mt-1 bg-brand-100/70 border border-brand-200 px-3 py-1 rounded-none font-bold"
            >
              wa.me/5573981952110
            </a>
          </div>
        </div>

        {/* Lookbook Title */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-600 font-extrabold flex items-center justify-center gap-1">
            <Sparkles size={11} className="text-brand-600 animate-pulse" />
            VIRTUAL CLOSET INTERATIVO
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-brand-900 tracking-wide mt-1">
            Compre o Look do Instagram
          </h3>
          <p className="text-xs sm:text-sm text-brand-700 max-w-lg mx-auto mt-2 font-medium">
            Clique em qualquer imagem do nosso feed para ver as peças de alta costura que montam o visual e compre de forma direta!
          </p>
        </div>

        {/* Instagram Post Feed Grid - Mimicking Print 2 feed exactly */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square bg-brand-100 overflow-hidden cursor-pointer group shadow-sm hover:shadow-md border border-brand-200 rounded-none"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none will-change-transform"
                referrerPolicy="no-referrer"
              />

              {/* Instagram grid options overlay (Likes and comments shown as seen on IG) */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <div className="flex items-center gap-4 text-sm font-sans font-bold mb-3">
                  <span className="flex items-center gap-1">
                    <Heart size={16} fill="white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} fill="white" /> {post.comments}
                  </span>
                </div>
                <button className="bg-white text-brand-900 px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-brand-100 shadow-lg active:scale-95 transition-all cursor-pointer">
                  <ShoppingBag size={12} />
                  Ver Marcar Looks
                </button>
              </div>

              {/* Pin banner in the feed */}
              {post.isPinned && (
                <div className="absolute top-2 left-2 bg-brand-900/90 text-white rounded-none px-2 py-0.5 text-[8.5px] uppercase font-mono tracking-widest font-extrabold shadow-sm flex items-center gap-1">
                  <span>📌 Pin</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lookbook Interactive Modal PopUp */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in" id="modal-lookbook-container">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedPost(null)}
          />

          <div className="relative bg-white text-brand-900 rounded-none overflow-hidden shadow-2xl w-full max-w-4xl h-full max-h-[90vh] sm:max-h-[85vh] flex flex-col md:flex-row z-10 border border-brand-300">
            {/* Left Image View */}
            <div className="w-full md:w-1/2 bg-brand-900 flex items-center justify-center h-[280px] sm:h-[350px] md:h-full relative border-r border-brand-200">
              <img
                src={selectedPost.imageUrl}
                alt="Instagram look"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-brand-900/90 backdrop-blur-xs text-white rounded-none px-2.5 py-1.5 text-xs font-mono">
                📸 @charmmemoda
              </div>
            </div>

            {/* Right Interactive Sidebar list of products making this look */}
            <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-brand-50 h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-brand-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-none bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-brand-600">
                      Peças do Look Disponíveis
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-xs uppercase tracking-widest text-brand-600 hover:text-brand-950 font-bold transition-colors cursor-pointer"
                    id="btn-close-lookbook-modal"
                  >
                    Fechar ✕
                  </button>
                </div>

                {/* IG Caption */}
                <div className="pt-4 pb-5 border-b border-brand-200">
                  <p className="text-xs sm:text-sm text-brand-800 leading-relaxed font-sans font-medium">
                    {selectedPost.caption}
                  </p>
                  <div className="flex gap-4 mt-2.5 text-[11px] font-mono text-brand-500">
                    <span>❤️ {selectedPost.likes} curtidas</span>
                    <span>💬 {selectedPost.comments} comentários</span>
                  </div>
                </div>

                {/* Products Grid list inside */}
                <div className="mt-5 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-brand-500 font-extrabold mb-3">
                    Looks Presentes na Foto:
                  </h4>
                  {getLinkedProducts(selectedPost).map((product) => {
                    const defaultSize = product.sizes[0];
                    const defaultColor = product.colors[0];

                    return (
                      <div
                        key={product.id}
                        className="bg-white border border-brand-200 hover:border-brand-300 p-3 rounded-none flex items-center justify-between gap-3 shadow-3xs transition-shadow"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-18 object-cover rounded-none bg-brand-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 pr-2">
                          <h5
                            onClick={() => {
                              setSelectedPost(null);
                              onSelectProduct(product);
                            }}
                            className="text-xs sm:text-sm font-extrabold text-brand-900 truncate hover:underline hover:text-brand-700 cursor-pointer font-display"
                          >
                            {product.name}
                          </h5>
                          <span className="text-[10px] font-mono text-brand-500 block">
                            {product.fabric} • {product.category}
                          </span>
                          <span className="text-[10px] font-mono text-brand-500 font-extrabold uppercase tracking-wider mt-0.5 block">
                            Sob Consulta
                          </span>
                        </div>

                        {/* Fast add button */}
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedPost(null);
                              onSelectProduct(product);
                            }}
                            className="bg-brand-900 text-white font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-none hover:bg-brand-850 cursor-pointer"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Full Outfit action checkout */}
              <div className="mt-6 pt-4 border-t border-brand-200">
                <button
                  onClick={() => {
                    // Add all items in the look to the cart
                    getLinkedProducts(selectedPost).forEach((p) => {
                      onAddToCart(p, p.sizes[0], p.colors[0]);
                    });
                    setSelectedPost(null);
                  }}
                  className="w-full bg-brand-900 hover:bg-brand-850 text-white font-sans text-xs uppercase tracking-[0.2em] font-black py-3.5 rounded-none text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  Adicionar Outfit Completo ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
