import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Search } from 'lucide-react';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

const CATEGORIES = [
  { id: 'all', name: 'Todos', emoji: '✨' },
  { id: 'tecnologia', name: 'Tecnologia', emoji: '📱' },
  { id: 'moda', name: 'Moda', emoji: '👗' },
  { id: 'casa', name: 'Casa', emoji: '🏠' },
  { id: 'beleza', name: 'Beleza', emoji: '💄' },
  { id: 'esporte', name: 'Esporte', emoji: '🏃' },
  { id: 'cozinha', name: 'Cozinha', emoji: '🍳' },
  { id: 'games', name: 'Games', emoji: '🎮' },
  { id: 'produto-virtual', name: 'Produto Virtual', emoji: '💻' },
];

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'products'),
          where('is_active', '==', true),
          orderBy('created_at', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.store_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="h-[160px] bg-gradient-to-br from-[#0a3d22] to-brand-green text-white flex flex-col justify-center items-center relative overflow-hidden px-4">
          {/* Decorative shape */}
          <div className="absolute opacity-10 bg-brand-yellow w-[200px] h-[200px] rotate-45 -right-[50px] -top-[50px] pointer-events-none" />
          
          <h1 className="text-2xl md:text-[32px] font-black m-0 uppercase tracking-normal z-10 text-center">
            As melhores ofertas do Brasil 🇧🇷
          </h1>
          
          <div className="w-[500px] max-w-full bg-white rounded-[30px] py-3 px-6 flex items-center mt-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-10">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input 
              type="text" 
              placeholder="Busque por produtos, lojas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none outline-none text-sm text-[#666] bg-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="h-[60px] flex items-center gap-[10px] px-10 overflow-x-auto no-scrollbar max-w-screen-xl mx-auto w-full">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-1.5 rounded-[20px] border text-[13px] font-bold whitespace-nowrap transition-colors
                  ${activeCategory === cat.id 
                    ? 'bg-brand-blue text-white border-brand-blue' 
                    : 'bg-white text-[#333333] border-[#ddd] hover:bg-gray-50'}
                `}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
        </div>

        {/* Product Grid */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-10 pb-16 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading ? (
              [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                <p className="text-xl font-bold mb-2">Nenhum produto encontrado 😢</p>
                <p>Tente ajustar a sua busca ou categoria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
