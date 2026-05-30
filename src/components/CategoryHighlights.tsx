import { Heart, MessageCircle, Shirt, Info, Sparkles } from "lucide-react";
import { STORE_HIGHLIGHTS } from "../data";

interface CategoryHighlightsProps {
  onOpenBrandStory: () => void;
  onOpenInfo: () => void;
  onScrollToFeedback: () => void;
  onScrollToInstagram: () => void;
}

export default function CategoryHighlights({
  onOpenBrandStory,
  onOpenInfo,
  onScrollToFeedback,
  onScrollToInstagram,
}: CategoryHighlightsProps) {
  // Map our icon names to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="w-6 h-6 text-brand-800" strokeWidth={1.5} />;
      case "MessageCircle":
        return <MessageCircle className="w-6 h-6 text-brand-800" strokeWidth={1.5} />;
      case "Shirt":
        return <Shirt className="w-6 h-6 text-brand-800" strokeWidth={1.5} />;
      case "Info":
        return <Info className="w-6 h-6 text-brand-800" strokeWidth={1.5} />;
      default:
        return <Heart className="w-6 h-6 text-brand-800" />;
    }
  };

  const handleHighlightClick = (title: string) => {
    switch (title.toLowerCase()) {
      case "charme":
        onOpenBrandStory();
        break;
      case "feedback":
        onScrollToFeedback();
        break;
      case "looks":
        onScrollToInstagram();
        break;
      case "informações":
        onOpenInfo();
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-linear-to-b from-brand-100 to-white py-8 border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title corresponding to Zattini's "CONFIRA TAMBÉM" style, integrated with Charme Modas concept */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-600 font-extrabold flex items-center gap-1">
            <Sparkles size={11} className="text-brand-500 animate-spin" />
            CONECTE-SE COM A GENTE
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-black uppercase text-brand-900 tracking-wide mt-1">
            Destaques da Loja
          </h3>
          <p className="text-xs text-brand-600 max-w-md mt-1.5 leading-relaxed font-sans font-medium">
            Explore as novidades, depoimentos de clientes reais e informações importantes sobre a nossa marca em Itabuna, BA.
          </p>
        </div>

        {/* Highlight Circles Frame */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 pt-2">
          {STORE_HIGHLIGHTS.map((hl) => (
            <button
              key={hl.id}
              onClick={() => handleHighlightClick(hl.title)}
              className="flex flex-col items-center justify-center group focus:outline-hidden cursor-pointer"
              title={`Clique para ver ${hl.title}`}
            >
              <div className="relative">
                {/* Gold Highlight Ring - Mimicking Instagram's circle style with a chic beige/gold luxury border */}
                <span className="absolute -inset-1.5 rounded-full border-2 border-brand-400 group-hover:border-brand-600 transition-all duration-300 scale-100 group-hover:scale-105" />
                <span className="absolute -inset-2.5 rounded-full border border-dashed border-brand-300 opacity-60 animate-reverse-spin" style={{ animationDuration: '24s' }} />

                {/* Main Circle Button */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-200 group-hover:bg-brand-300 flex items-center justify-center transition-all shadow-sm">
                  {getIcon(hl.iconName)}
                </div>
              </div>

              {/* Highlight Label */}
              <span className="mt-3.5 text-xs sm:text-sm font-semibold text-brand-900 font-sans tracking-[0.15em] uppercase group-hover:text-brand-700 transition-colors">
                {hl.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
