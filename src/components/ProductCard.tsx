import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router';
import { useFavorites } from '../store/useFavorites';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(product.id);
  
  const isNew = Date.now() - product.created_at < 48 * 60 * 60 * 1000;
  const isHot = product.clicks > 10;

  const handleOfferClick = async (e: React.MouseEvent) => {
    // Record click without blocking navigation by using target="_blank"
    try {
      const productRef = doc(db, 'products', product.id);
      updateDoc(productRef, {
        clicks: increment(1)
      }).catch(console.error);
    } catch (err) {}
  };

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#EBEBEB] relative flex flex-col group hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="absolute top-2.5 left-2.5 flex gap-2 z-10">
        {isHot && (
          <span className="bg-[#FF4D4D] text-white text-[10px] font-extrabold px-2 py-1 rounded-[6px]">
            🔥 HOT
          </span>
        )}
        {isNew && !isHot && (
          <span className="bg-brand-blue text-white text-[10px] font-extrabold px-2 py-1 rounded-[6px]">
            NOVO
          </span>
        )}
      </div>

      {product.discount_percent > 0 && (
        <span className="absolute top-2.5 right-2.5 bg-brand-blue text-white text-[10px] font-extrabold px-2 py-1 rounded-[6px] z-10">
          -{product.discount_percent}%
        </span>
      )}

      <button 
        onClick={() => toggleFavorite(product.id)}
        className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 opacity-0 group-hover:opacity-100"
      >
        <Heart className={cn("w-4 h-4", isFav ? "fill-red-500 text-red-500" : "text-gray-500")} />
      </button>

      <div className="relative h-[160px] bg-[#f0f0f0] overflow-hidden">
        <Link to={`/produto/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="p-3 flex flex-1 flex-col">
        <div className="text-[10px] text-[#888] uppercase tracking-[0.5px] mb-1 font-bold">
          {product.store_name}
        </div>
        
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-[14px] font-bold leading-[1.2] mb-1 line-clamp-2 h-[34px] text-brand-blue hover:text-brand-green transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Stars fake representation */}
        <div className="text-brand-yellow font-bold text-[10px] my-0.5 tracking-widest">
          ★★★★★ <span className="text-[#888] tracking-normal font-bold">({product.clicks || 5}k)</span>
        </div>

        <div className="mt-auto pt-2">
          {product.discount_percent > 0 ? (
            <div className="text-[12px] text-[#999] line-through mt-1">
              R$ {product.original_price.toFixed(2).replace('.', ',')}
            </div>
          ) : <div className="h-[18px]"></div>}
          <div className="text-[18px] font-extrabold text-brand-green mb-2">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>
          
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOfferClick}
            className="block text-center mt-auto bg-gradient-to-r from-brand-green to-brand-green-dark text-white font-bold py-2 rounded-[10px] text-[13px] hover:opacity-90 transition-opacity"
          >
            Ver oferta →
          </a>
        </div>
      </div>
    </div>
  );
}
