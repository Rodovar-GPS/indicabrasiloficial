import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { doc, getDoc, collection, query, where, getDocs, limit, updateDoc, increment } from 'firebase/firestore';
import { ChevronLeft, ExternalLink, MousePointerClick } from 'lucide-react';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductData() {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const prodData = { id: docSnap.id, ...docSnap.data() } as Product;
          setProduct(prodData);
          
          // Fetch related
          const q = query(
            collection(db, 'products'),
            where('category', '==', prodData.category),
            where('is_active', '==', true),
            limit(4)
          );
          const relatedSnap = await getDocs(q);
          const relatedData = relatedSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as Product))
            .filter(p => p.id !== id);
          setRelatedProducts(relatedData);
        }
      } catch (err) {
        console.error("Error fetching doc:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductData();
  }, [id]);

  const handleBuyClick = () => {
    if (!product) return;
    try {
      const productRef = doc(db, 'products', product.id);
      updateDoc(productRef, {
        clicks: increment(1)
      }).catch(console.error);
    } catch (err) {}
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Link to="/" className="text-brand-green hover:underline">Voltar para o início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-green font-bold mb-6 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Voltar para o catálogo
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row gap-8 p-6 md:p-10 mb-12">
          {/* Image */}
          <div className="md:w-1/2 aspect-square bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
            <img 
              src={product.image_url} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Info */}
          <div className="md:w-1/2 flex flex-col">
            <div className="inline-block bg-brand-green/10 text-brand-green font-bold px-3 py-1 rounded-full text-sm mb-4 self-start">
              Vendido por: {product.store_name}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-6 bg-blue-50/50 p-3 rounded-xl border border-blue-100 w-fit">
              <MousePointerClick className="w-5 h-5 text-brand-blue" />
              <span className="text-brand-blue font-bold">
                {product.clicks} pessoas clicaram nessa oferta
              </span>
            </div>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              {product.discount_percent > 0 && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl text-gray-400 line-through font-bold">
                    R$ {product.original_price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-lg text-sm">
                    -{product.discount_percent}% OFF
                  </span>
                </div>
              )}
              <div className="text-5xl font-black text-brand-blue mb-2">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </div>
              <p className="text-gray-500 text-sm font-semibold">Preço sujeito a alteração sem aviso prévio.</p>
            </div>
            
            <a
              href={product.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBuyClick}
              className="mt-auto w-full bg-gradient-to-r from-brand-green to-brand-green-dark text-white font-black text-xl py-5 px-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              Comprar agora — Ver oferta completa <ExternalLink className="w-6 h-6" />
            </a>
            
            <div className="mt-8">
              <h3 className="font-bold text-gray-900 mb-2 tet-xl">Descrição do Produto</h3>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                {product.description || "Nenhuma descrição fornecida para este item."}
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="heading-font text-3xl text-brand-blue mb-6 border-b border-gray-200 pb-2">
              Mais ofertas em {product.category}
            </h2>
            <div className="grid grid-cols-2 bg-gray-50 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
