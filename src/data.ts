import { Product, InstagramPost, Review, StoreHighlight } from "./types";

export const STORE_HIGHLIGHTS: StoreHighlight[] = [
  {
    id: "h-charme",
    title: "Charme",
    iconName: "Heart",
    description: "Nossa essência e propósito de vestir sua melhor versão com tecidos nobres e acabamento impecável.",
  },
  {
    id: "h-feedback",
    title: "Feedback",
    iconName: "MessageCircle",
    description: "O que dizem nossas clientes queridas sobre os looks perfeitos e atendimento de excelência.",
  },
  {
    id: "h-looks",
    title: "Looks",
    iconName: "Shirt",
    description: "Inspirações diárias, combinações versáteis e looks prontos para as mais diversas ocasiões.",
  },
  {
    id: "h-info",
    title: "Informações",
    iconName: "Info",
    description: "Frete para todo o Brasil, políticas de reserva facilitadas, endereço e canais de atendimento.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Vestido Curto com Pregas Charme",
    description: "Toda a leveza e frescor em uma modelagem clássica com decote drapeado e caimento escultural. Ideal para celebrar momentos especiais com estilo fluido e sofisticado.",
    price: 0, // Priceless mode
    category: "Vestidos",
    images: [
      "https://i.ibb.co/Q7Q7nWCR/img1.jpg"
    ],
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Prata Glow", hex: "#d8dadc" },
      { name: "Bege Areia", hex: "#e5ddcf" },
      { name: "Preto Absoluto", hex: "#1c1c1c" }
    ],
    fabric: "Sedinha Acetinada",
    rating: 5.0,
    reviewsCount: 18,
    isDailyDeal: true,
    stockCount: 4,
    details: [
      "Composição: 100% Visco-cetim de altíssima maciez",
      "Decote drapeado com amarrações personalizadas",
      "Modelagem ajustável ao corpo que alonga a silhueta",
      "Toque acetinado premium com brilho sutil sofisticado"
    ]
  },
  {
    id: "p2",
    name: "Vestido Midi Plissado Doce Encanto",
    description: "Delicadeza traduzida em caimento fluido. Apresenta cintura marcada, saia plissada que flui com os movimentos e mangas bufantes delicadas para as comemorações mais especiais.",
    price: 0, // Priceless mode
    category: "Vestidos",
    images: [
      "https://i.ibb.co/S4g9Q4BB/img2.jpg"
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Rosê Sutil", hex: "#f3e1dc" },
      { name: "Pó de Arroz", hex: "#efe6dd" },
      { name: "Verde Menta", hex: "#e2ecdf" }
    ],
    fabric: "Crepe Georgette",
    rating: 4.9,
    reviewsCount: 22,
    isDailyDeal: false,
    stockCount: 6,
    details: [
      "Forro de viscose embutido extremamente macio",
      "Cós acinturado estruturado em lastex de alta qualidade",
      "Mangas com leve volume romântico de princesa",
      "Fechamento discreto traseiro por botões forrados"
    ]
  },
  {
    id: "p3",
    name: "Conjunto Alfaiataria Colete & Pantalona Areia",
    description: "A alfaiataria clássica repaginada com maestria. Colete acinturado estruturado em botões discretos harmonizado perfeitamente com calça pantalona de pregas profundas.",
    price: 0, // Priceless mode
    category: "Conjuntos",
    images: [
      "https://i.ibb.co/YBg8T5D8/img3.jpg",
      "https://i.ibb.co/FLkfpDdF/img3-continua-o.jpg"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Bege Areia", hex: "#e6d7c3" },
      { name: "Marfim Premium", hex: "#faf8f5" },
      { name: "Cacau", hex: "#7a5c43" }
    ],
    fabric: "Linho Misto Nobre",
    rating: 5.0,
    reviewsCount: 45,
    isDailyDeal: true,
    stockCount: 8,
    details: [
      "Colete totalmente forrado com toque leve de alfaiataria",
      "Calça pantalona corte amplo com bolsos funcionais faca",
      "Prega frontal profunda que proporciona elegância e alongamento",
      "Cós alto estruturado regulável com passantes para cinto"
    ]
  },
  {
    id: "p4",
    name: "Macacão Utilitário Sophistiqué",
    description: "Fusão elegante entre silhueta despojada e sofisticação urbana. Possui mangas dobradas, bolsos utilitários frontais com lapela e cinto coordenado para acentuar a cintura.",
    price: 0, // Priceless mode
    category: "Conjuntos",
    images: [
      "https://i.ibb.co/jkrP9h48/img4.jpg"
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Verde Oliva", hex: "#8d8f7c" },
      { name: "Caqui", hex: "#ded4c7" },
      { name: "Preto", hex: "#1f1f1f" }
    ],
    fabric: "Sarja Acetinada Leve",
    rating: 4.8,
    reviewsCount: 15,
    isDailyDeal: false,
    stockCount: 3,
    details: [
      "Lapelas frontais e traseiras perfeitamente estruturadas",
      "Acompanha cinto regulável forrado no mesmo tecido",
      "Abotoamento frontal oculto para um acabamento minimalista",
      "Bolsos cargo discretos nas laterais"
    ]
  },
  {
    id: "p5",
    name: "Looks Confiantes & Sofisticados",
    description: "Looks pensados para mulheres que amam se sentir confiantes e sofisticadas todos os dias. Modelagem autoral confeccionada sob medida com caimento impecável.",
    price: 0, // Priceless mode
    category: "Conjuntos",
    images: [
      "https://i.ibb.co/q3YtfmS7/img5.jpg"
    ],
    sizes: ["PP", "P", "M"],
    colors: [
      { name: "Marfim Atemporal", hex: "#fcfaf7" },
      { name: "Bege Areia", hex: "#e5ddcf" },
      { name: "Verde Oliva", hex: "#8d8f7c" }
    ],
    fabric: "Linhos & Crepes Premium",
    rating: 5.0,
    reviewsCount: 31,
    isDailyDeal: true,
    stockCount: 5,
    details: [
      "Looks pensados para mulheres que amam se sentir confiantes e sofisticadas todos os dias",
      "Modelagem autoral confeccionada sob encomenda no atelier",
      "Acabamento refinado de alta-costura feito de forma artesanal",
      "Toque extremamente macio e confortável de linho com viscose"
    ]
  },
  {
    id: "p6",
    name: "Conjunto Casual Elegance Tricot",
    description: "União ímpar entre conforto absoluto e sofisticação de boutique. Regata gola alta canelada combinada e casaco coordenado de toque macio e super aconchegante.",
    price: 0, // Priceless mode
    category: "Conjuntos",
    images: [
      "https://i.ibb.co/NdqMfrYT/img6.jpg"
    ],
    sizes: ["Único"],
    colors: [
      { name: "Trigo Premium", hex: "#eadbc7" },
      { name: "Marfim", hex: "#f9f6f0" },
      { name: "Preto", hex: "#111111" }
    ],
    fabric: "Fio nobre Modal",
    rating: 4.9,
    reviewsCount: 14,
    isDailyDeal: false,
    stockCount: 7,
    details: [
      "Suéter com padronagem contemporânea canelada",
      "Fio modal de altíssima densidade que se ajusta de forma macia",
      "Respirável e antialérgico sob a pele",
      "Acabamento de atelier feito com maquinário de alta costura"
    ]
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig1",
    imageUrl: "https://i.ibb.co/Q7Q7nWCR/img1.jpg",
    caption: "A leveza estonteante de um caimento desenhado à mão. Peça perfeita em Sedinha Acetinada para brilhar intensamente em qualquer evento. Reserve seu tamanho em nosso site e prove no atelier! ✨",
    likes: 382,
    comments: 19,
    isPinned: true,
    linkedProductIds: ["p1"]
  },
  {
    id: "ig2",
    imageUrl: "https://i.ibb.co/S4g9Q4BB/img2.jpg",
    caption: "A harmonia perfeita de babados delicados e um balanço fluido apaixonante. Vista-se de puro charme e sinta a doçura do Crepe Georgette Premium. Disponível para prova física! 🌸",
    likes: 492,
    comments: 31,
    isPinned: true,
    linkedProductIds: ["p2"]
  },
  {
    id: "ig3",
    imageUrl: "https://i.ibb.co/YBg8T5D8/img3.jpg",
    caption: "A nossa alfaiataria em Linho Misto é um clássico que exala auto-estima. Combine o colete acinturado com nossa pantalona fluida para o visual chic definitivo! 🥖",
    likes: 580,
    comments: 48,
    isPinned: true,
    linkedProductIds: ["p3"]
  },
  {
    id: "ig4",
    imageUrl: "https://i.ibb.co/jkrP9h48/img4.jpg",
    caption: "Estilo sofisticado e conforto andam de mãos dadas em nossa curadoria. O macacão utilitário em Sarja Acetinada Leve é a peça ideal para marcar presença com autoridade e elegância. 🕊️",
    likes: 290,
    comments: 12,
    linkedProductIds: ["p4"]
  },
  {
    id: "ig5",
    imageUrl: "https://i.ibb.co/q3YtfmS7/img5.jpg",
    caption: "Looks pensados para mulheres que amam se sentir confiantes e sofisticadas todos os dias. Propostas exclusivas de caimento moderno. Venha conhecer no atelier! ✨💍",
    likes: 720,
    comments: 54,
    linkedProductIds: ["p5"]
  },
  {
    id: "ig6",
    imageUrl: "https://i.ibb.co/NdqMfrYT/img6.jpg",
    caption: "Toque incrivelmente aconchegante e elegância effortless de boutique. Nosso duo em fio de modal é ultra flexível e se desenha suavemente sob a pele. Conheça as cores lindas da nossa marca! 🤎",
    likes: 618,
    comments: 29,
    linkedProductIds: ["p6"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Amanda S. Ramos",
    rating: 5,
    date: "14/05/2026",
    text: "Meninas, estou maravilhada com a costura desse vestido curto! O caimento fluido ajusta de um jeito absurdo ao corpo e tem forro bem encorpado. Atendimento super amoroso do atelier de Itabuna!",
    sizeBought: "P",
    colorBought: "Prata Glow",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amanda"
  },
  {
    id: "r2",
    author: "Patricia Cavalcanti",
    rating: 5,
    date: "28/05/2026",
    text: "Pedi o conjunto de colete e pantalona de linho e provei na loja física. Fiquei chocada com o acabamento primoroso. Elas ajustam a barra sob medida pro meu salto! Uma boutique nota dez.",
    sizeBought: "M",
    colorBought: "Marfim Premium",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Patricia"
  },
  {
    id: "r3",
    author: "Leticia G. de Sousa",
    rating: 5,
    date: "18/05/2026",
    text: "Usei o vestido de chiffon com babados para o meu ensaio pré-wedding e parecia um sonho. O tecido flutua de um jeito belíssimo no vento! Minha seleção favorita sem dúvidas.",
    sizeBought: "P",
    colorBought: "Luz do Sol",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Leticia"
  }
];
