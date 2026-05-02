import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

export function Promocoes() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPromocoes() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'products'),
          where('is_active', '==', true),
          where('discount_percent', '>=', 25),
          orderBy('discount_percent', 'desc'),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(data);
      } catch (err) {
        console.error('Error fetching promocoes:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPromocoes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
          <div className="absolute opacity-10 bg-white w-[300px] h-[300px] rounded-full -right-[100px] -top-[100px] pointer-events-none" />
          
          <div className="max-w-screen-xl mx-auto text-center relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#FF4D4D] rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black m-0 uppercase tracking-tight text-white drop-shadow-md">
              Queimas de Estoque
            </h1>
            <p className="mt-4 text-white/80 font-bold max-w-2xl text-lg">
              As maiores quedas de preço rastreadas pelo nosso sistema. Ofertas com no mínimo 25% de desconto real.
            </p>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-12 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading ? (
              [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
            ) : products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                <p className="text-xl font-bold mb-2">Nenhuma super promoção encontrada 😢</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
