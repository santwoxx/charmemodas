import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BannerCarouselProps {
  onShopCollection: (category: string) => void;
  onOpenCouponDisclaimer: () => void;
}

export default function BannerCarousel({ onShopCollection, onOpenCouponDisclaimer }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "parties-glam",
      title: "Alta Costura & Glamour",
      subtitle: "COLEÇÃO FESTAS & RECEPÇÕES",
      description: "Sinta o poder de looks exclusivos que esculpem e valorizam o seu charme genuíno. Peças criadas meticulosamente em tecidos nobres para noites e comemorações memoráveis.",
      cta: "Vestidos de Festa",
      theme: "minimalist",
      badge: "Alta Costura",
      image: "https://i.ibb.co/Q7Q7nWCR/img1.jpg",
      position: "center 8%"
    },
    {
      id: "linen-premium",
      title: "Alfaiataria Classique",
      subtitle: "CRAFTSMANSHIP BOUTIQUE",
      description: "Descubra a elegância sutil de peças coordenadas em linho nobre e viscose acetinada. Modelagens de caimento divinamente fluido nas cores bege, areia e marfim.",
      cta: "Explorar Conjuntos",
      theme: "beige",
      badge: "Lançamento Exclusivo",
      image: "https://i.ibb.co/YBg8T5D8/img3.jpg",
      position: "center 20%"
    },
    {
      id: "atelier-signature",
      title: "Conecte-se com sua Essência",
      subtitle: "MODA FEMININA E BOUTIQUE",
      description: "Nossa paixão de atelier é vestir sua melhor versão com tecidos selecionados e caimento divino. Faça uma reserva online e venha experimentar propostas únicas.",
      cta: "Ver Catálogo",
      theme: "minimalist",
      badge: "Atelier Charme",
      image: "https://i.ibb.co/NdqMfrYT/img6.jpg",
      position: "center 30%"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] overflow-hidden bg-brand-100 border-b border-brand-300">
      {/* Background Slides with Framer Motion AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {slides[currentSlide].theme === "romantic" ? (
            /* Romantic background style (red/warm beige gradient with heart shapes visual) */
            <div className="absolute inset-x-0 inset-y-0 bg-linear-to-r from-red-50 via-brand-100 to-red-100 flex items-center z-0">
              {/* Heart floating decorations in background */}
              <div className="absolute top-10 left-10 text-red-200/50 opacity-60 animate-bounce" style={{ animationDuration: '4s' }}>
                <Heart size={64} fill="currentColor" />
              </div>
              <div className="absolute bottom-10 right-20 text-red-200/50 opacity-40 animate-pulse" style={{ animationDuration: '6s' }}>
                <Heart size={120} fill="currentColor" />
              </div>
              <div className="absolute top-1/4 right-1/4 text-red-200/50 opacity-30 animate-bounce" style={{ animationDuration: '8s' }}>
                <Heart size={48} fill="currentColor" />
              </div>
            </div>
          ) : (
            /* Classic beige luxury gradient background */
            <div className="absolute inset-0 bg-linear-to-r from-brand-50 via-brand-100 to-brand-200 z-0" />
          )}

          {/* Core Banner visual grid containing content left and high fashion photography on right */}
          <div className="max-w-7xl mx-auto h-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 items-center">
            {/* Left Content Column */}
            <div className="col-span-1 md:col-span-6 flex flex-col justify-center text-center md:text-left pt-6 md:pt-0">
              <span className="inline-flex self-center md:self-start items-center gap-1 bg-white border border-brand-300 text-brand-800 px-3 py-1 rounded-none text-[10px] uppercase font-mono tracking-widest font-extrabold mb-3 shadow-[2px_2px_0px_rgba(44,44,44,0.1)]">
                <Sparkles size={11} className="text-brand-600 animate-pulse" />
                {slides[currentSlide].subtitle}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-brand-900 font-serif font-black pr-0 md:pr-4">
                {slides[currentSlide].theme === "romantic" ? (
                  <>
                    {slides[currentSlide].title} <span className="text-red-500 text-3xl sm:text-4xl animate-pulse">❤️</span>
                  </>
                ) : (
                  slides[currentSlide].title
                )}
              </h2>

              <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm text-brand-700/95 leading-relaxed font-sans font-medium pr-0 md:pr-8">
                {slides[currentSlide].description}
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button
                  onClick={() => {
                    if (slides[currentSlide].id === "parties-glam") {
                      onShopCollection("Vestidos");
                    } else if (slides[currentSlide].id === "linen-premium") {
                      onShopCollection("Conjuntos");
                    } else {
                      onShopCollection("all");
                    }
                  }}
                  className="bg-brand-900 hover:bg-brand-800 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold px-6 py-3.5 rounded-none shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  {slides[currentSlide].cta}
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("boutique-footer");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white/90 hover:bg-white text-brand-900 border border-brand-300 font-sans text-xs uppercase tracking-[0.2em] font-bold px-5 py-3.5 rounded-none transition-all active:scale-95 cursor-pointer shadow-3xs"
                >
                  Onde Estamos
                </button>
              </div>
            </div>

            {/* Right Product Image Column (Beautiful responsive framing) */}
            <div className="hidden md:block col-span-6 h-[85%] relative overflow-hidden rounded-none border border-brand-300 bg-white shadow-xs">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: slides[currentSlide].position }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-brand-900 text-white text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1.5 rounded-none shadow-xs">
                {slides[currentSlide].badge}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Sliding indicators: Chevron Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-none border border-brand-300 bg-white/80 hover:bg-white hover:shadow-md text-brand-900 transition-all cursor-pointer z-20"
        id="btn-carousel-prev"
        title="Slide Anterior"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-none border border-brand-300 bg-white/80 hover:bg-white hover:shadow-md text-brand-900 transition-all cursor-pointer z-20"
        id="btn-carousel-next"
        title="Próximo Slide"
      >
        <ChevronRight size={16} />
      </button>

      {/* Carousel slide indicators dots - Elegant horizontal progress bars */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-0.5 transition-all cursor-pointer rounded-none ${
              currentSlide === index ? "w-8 bg-brand-900" : "w-4 bg-brand-400"
            }`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
