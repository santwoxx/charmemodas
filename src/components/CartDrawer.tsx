import { useState } from "react";
import { X, Trash2, ShoppingBag, Send, CreditCard, Tag, Landmark, Truck } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectSize: string, selectColorHex: string) => void;
  onRemoveItem: (productId: string, selectSize: string, selectColorHex: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Shipping Calculator state variables
  const [cep, setCep] = useState("");
  const [shippingMessage, setShippingMessage] = useState("");

  if (!isOpen) return null;

  const calculateShipping = () => {
    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) {
      setShippingMessage("Por favor, digite um CEP válido com 8 dígitos.");
      return;
    }

    setShippingMessage("CEP Identificado! No WhatsApp vamos combinar a melhor entrega/serviços para o seu endereço. 🚀📦");
  };

  // Generate real WhatsApp order text
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let text = "Olá, Charme Modas! ✨\nGostaria de solicitar um orçamento e reserva para os seguintes looks exclusivos do site:\n\n";

    cart.forEach((item, index) => {
      text += `🛍️ *Peça ${index + 1}:* ${item.product.name}\n`;
      text += `   • *Tamanho:* ${item.selectedSize}\n`;
      text += `   • *Cor:* ${item.selectedColor.name}\n`;
      text += `   • *Quantidade:* ${item.quantity}x\n`;
      text += `   • *Tecido:* ${item.product.fabric}\n\n`;
    });

    text += `-----------------------------------\n`;
    if (cep) {
      text += `📍 *Região de Entrega:* CEP para envio ${cep}\n`;
      text += `   _${shippingMessage}_\n\n`;
    }
    
    text += `💬 *Mensagem da Cliente:* Estou preparando os looks para eventos e gostaria de conferir os valores, disponibilidade no estoque físico e formas de retirada/entrega. Obrigado! ❤️`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5573981952110?text=${encodedText}`;

    // Redirect to whatsapp order path API
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans text-brand-900" id="cart-drawer-container">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-3xs"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10 animate-slide-left">
        {/* Header */}
        <div className="bg-brand-900 text-white p-5 flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-300 animate-bounce" />
            <span className="font-serif font-black uppercase tracking-[0.15em] text-sm sm:text-base">
              Minha Encomenda ({cart.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none hover:bg-brand-800 text-gray-300 hover:text-white cursor-pointer transition-colors"
            id="btn-cart-drawer-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-brand-50/60 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-none bg-brand-100 flex items-center justify-center text-brand-400 mb-4 animate-pulse">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-900">Seu carrinho está vazio</h4>
              <p className="text-xs text-brand-500 max-w-xs mt-1.5 leading-relaxed">
                Explore as novidades em vestidos, conjuntos e calçados para vestir sua melhor versão.
              </p>
              <button
                onClick={onClose}
                className="mt-5 bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-none transition-transform active:scale-95 cursor-pointer"
              >
                Continuar Navegando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                className="bg-white border border-brand-200 p-3.5 rounded-none flex gap-3.5 shadow-3xs"
              >
                {/* Product thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-none bg-brand-100 select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Details list */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-brand-900 leading-snug truncate font-display">
                      {item.product.name}
                    </h5>

                    {/* Size and color chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] font-medium text-brand-600">
                      <span className="bg-brand-100 px-1.5 py-0.5 rounded-none border border-brand-200">
                        Tam: <strong>{item.selectedSize}</strong>
                      </span>
                      <span className="bg-brand-100 px-1.5 py-0.5 rounded-none border border-brand-200 flex items-center gap-1">
                        Cor: <strong>{item.selectedColor.name}</strong>
                        <span
                          className="w-2.5 h-2.5 rounded-none border border-gray-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Quantity selector and price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-brand-100">
                    <div className="flex items-center border border-brand-300 rounded-none overflow-hidden bg-brand-50">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1),
                            item.selectedSize,
                            item.selectedColor.hex
                          )
                        }
                        className="px-2 py-0.5 hover:bg-brand-200 text-brand-900 font-bold transition-colors cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-mono text-xs font-bold text-brand-900 bg-white border-l border-r border-brand-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedSize,
                            item.selectedColor.hex
                          )
                        }
                        className="px-2 py-0.5 hover:bg-brand-200 text-brand-900 font-bold transition-colors cursor-pointer text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-brand-500">
                        Sob Consulta
                      </span>
                      <button
                        onClick={() =>
                          onRemoveItem(item.product.id, item.selectedSize, item.selectedColor.hex)
                        }
                        className="p-1 hover:bg-red-50 text-brand-400 hover:text-red-600 rounded-none cursor-pointer transition-colors"
                        title="Excluir Item"
                      >
                        <Trash2 size={13.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions and price calculations summary */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-brand-200 p-5 space-y-4">
            {/* Custom note / observations block instead of coupon */}
            <div className="space-y-1.5 pb-2 border-b border-brand-100">
              <span className="text-[10px] uppercase font-mono tracking-wider text-brand-500 font-bold block">
                Observações de Ajustes / Detalhes
              </span>
              <textarea
                placeholder="Ex: solicitar tamanho maior, ajuste específico ou embalagem..."
                rows={2}
                className="w-full bg-brand-50 border border-brand-300 text-brand-900 placeholder-brand-400 placeholder:text-[11px] rounded-none px-3 py-2 text-xs font-sans outline-hidden focus:border-brand-500 resize-none"
              />
            </div>

            {/* Simulated CEP calculator */}
            <div className="space-y-1.5 pb-2 border-b border-brand-100">
              <span className="text-[10px] uppercase font-mono tracking-wide text-brand-500 font-bold block">
                Calcular Prazo de Entrega
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP (ex: 45600-002)"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="flex-1 bg-brand-50 border border-brand-300 text-brand-900 placeholder-brand-400 placeholder:text-[11px] rounded-none px-3 py-1.5 text-xs font-mono outline-hidden focus:border-brand-500"
                  maxLength={9}
                />
                <button
                  onClick={calculateShipping}
                  className="bg-brand-200 hover:bg-brand-300 text-brand-900 border border-brand-300 font-sans text-xs uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-none transition-transform active:scale-95 cursor-pointer"
                >
                  Consultar
                </button>
              </div>
              {shippingMessage && (
                <p className="text-[10.5px] font-sans text-brand-700 font-semibold flex items-center gap-1 mt-1 leading-tight">
                  <Truck size={12} className="text-brand-600 min-w-[12px]" />
                  {shippingMessage}
                </p>
              )}
            </div>

            {/* Totals Summary */}
            <div className="space-y-1.5 text-xs font-sans text-brand-700">
              <div className="flex justify-between items-center text-sm font-bold text-brand-950 pt-1 border-b border-brand-100 pb-1.5">
                <span className="font-serif">Resumo da Encomenda</span>
                <span className="font-mono text-xs text-brand-600 font-extrabold">
                  Modo Catálogo
                </span>
              </div>
              <p className="text-[11px] text-brand-650 leading-normal mt-1 flex items-center justify-between">
                <span>Total de Itens à Reservar:</span>
                <strong className="text-brand-900 font-mono">{cart.reduce((ac, it) => ac + it.quantity, 0)} peça(s)</strong>
              </p>
              <p className="text-[10px] text-brand-400 leading-snug">
                *Este site funciona como catálogo digital. Valores de frete e das peças serão formalizados direto pelo WhatsApp com o atendimento exclusivo do atelier.
              </p>
            </div>

            {/* Checkout CTAs exactly aligned to physical WhatsApp orders */}
            <div className="space-y-2 pt-1">
              <button
                onClick={sendWhatsAppOrder}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-sans text-xs uppercase tracking-[0.14em] font-black py-3.5 rounded-none text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={14} fill="white" />
                Reservar Looks via WhatsApp 💬
              </button>

              <div className="flex justify-center items-center gap-4 text-[9px] uppercase tracking-wider text-brand-400 font-mono text-center pt-2">
                <span className="flex items-center gap-1">
                  Atelier Itabuna, BA
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  Atendimento Premium
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
