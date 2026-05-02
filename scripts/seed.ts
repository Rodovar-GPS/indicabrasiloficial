import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import fs from 'fs';

// Read config
const configRaw = fs.readFileSync('./firebase-applet-config.json', 'utf8');
const config = JSON.parse(configRaw);

const app = initializeApp(config);
const db = getFirestore(app);

const sampleProducts = [
  {
    title: "Smartphone Samsung Galaxy S24 Ultra 256GB Titanium",
    description: "O smartphone definitivo com IA. O Galaxy S24 Ultra apresenta uma nova forma de criar, conectar e se expressar. Com incrível câmera de 200MP e zoom poderoso.",
    price: 5499.00,
    original_price: 6999.00,
    discount_percent: 21,
    image_url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800",
    affiliate_link: "https://amazon.com.br",
    store_name: "Amazon",
    category: "tecnologia",
    is_active: true,
    is_featured: true,
    clicks: 120,
    created_at: Date.now() - 10000000
  },
  {
    title: "Tênis Nike Air Max SC Masculino",
    description: "Tênis casual com visual inspirado nos anos 90, perfeito para o dia a dia. Com amortecimento Air Max para conforto superior.",
    price: 349.90,
    original_price: 499.90,
    discount_percent: 30,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    affiliate_link: "https://nike.com.br",
    store_name: "Nike",
    category: "moda",
    is_active: true,
    is_featured: false,
    clicks: 85,
    created_at: Date.now() - 20000000
  },
  {
    title: "Sofá Retrátil e Reclinável 3 Lugares Suede Cinza",
    description: "Conforto e elegância para sua sala. Sofá com encosto reclinável em várias posições e assento retrátil espaçoso.",
    price: 1290.00,
    original_price: 1890.00,
    discount_percent: 31,
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    affiliate_link: "https://magazineluiza.com.br",
    store_name: "Magalu",
    category: "casa",
    is_active: true,
    is_featured: true,
    clicks: 43,
    created_at: Date.now() - 300000
  },
  {
    title: "Air Fryer Fritadeira Elétrica Mondial 4L",
    description: "Comida saudável e crocante sem óleo. A Air Fryer Mondial tem alta potência e espaço de sobra para toda a família.",
    price: 289.90,
    original_price: 459.90,
    discount_percent: 36,
    image_url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800",
    affiliate_link: "https://mercadolivre.com.br",
    store_name: "Mercado Livre",
    category: "cozinha",
    is_active: true,
    is_featured: false,
    clicks: 156,
    created_at: Date.now() - 86400000
  },
  {
    title: "Perfume Carolina Herrera 212 VIP Rosé 80ml",
    description: "Fragrância floral frutada ideal para mulheres que querem ser o centro das atenções. Elegante e marcante.",
    price: 499.00,
    original_price: 649.00,
    discount_percent: 23,
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    affiliate_link: "https://epocacosmeticos.com.br",
    store_name: "Época Cosméticos",
    category: "beleza",
    is_active: true,
    is_featured: false,
    clicks: 22,
    created_at: Date.now() - 40000000
  },
  {
    title: "Console PlayStation 5 + EA SPORTS FC 24",
    description: "O videogame da nova geração da Sony com gráficos ultrarrealistas, carregamento ultrarrápido e controle DualSense. Acompanha o jogo EA SPORTS FC 24.",
    price: 3899.00,
    original_price: 4599.00,
    discount_percent: 15,
    image_url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800",
    affiliate_link: "https://amazon.com.br",
    store_name: "Amazon",
    category: "games",
    is_active: true,
    is_featured: true,
    clicks: 310,
    created_at: Date.now() - 1000
  }
];

async function seed() {
  const productsRef = collection(db, 'products');
  const existing = await getDocs(productsRef);
  if (existing.empty) {
    console.log("Seeding products...");
    for (const prod of sampleProducts) {
      await addDoc(productsRef, prod);
    }
    console.log("Done seeding.");
  } else {
    console.log("Database already has products.");
  }
  process.exit(0);
}

seed();
