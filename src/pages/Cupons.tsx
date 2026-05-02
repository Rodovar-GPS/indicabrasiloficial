import { useState } from 'react';
import { Tag, Copy, CheckCircle2 } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const CUPONS_MOCK = [
  { id: 1, store: 'Amazon Brasil', code: 'AMZINDICA15', discount: '15% OFF', desc: 'Em produtos selecionados de casa inteligente', validade: 'Validade: 30 dias' },
  { id: 2, store: 'Mercado Livre', code: 'MELI10', discount: 'R$10 OFF', desc: 'Em compras acima de R$99,00 no app', validade: 'Validade: 7 dias' },
  { id: 3, store: 'Magalu', code: 'MAGALU20', discount: '20% OFF', desc: 'Em eletrodomésticos vendidos e entregues por Magalu', validade: 'Validade: 15 dias' },
  { id: 4, store: 'Shopee', code: 'SHOPEE5', discount: 'R$5 OFF', desc: 'Para novos usuários ou contas inativas', validade: 'Validade: Ilimitado' },
];

export function Cupons() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-brand-yellow text-brand-blue py-12 px-4 relative overflow-hidden">
          <div className="max-w-screen-xl mx-auto text-center relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm rotate-12">
              <Tag className="w-8 h-8 text-brand-blue" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black m-0 tracking-tight drop-shadow-sm">
              Cupons de Desconto
            </h1>
            <p className="mt-4 opacity-80 font-bold max-w-2xl text-lg">
              Copie os códigos abaixo para garantir um desconto extra na finalização da sua compra.
            </p>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CUPONS_MOCK.map((cupom) => (
              <div key={cupom.id} className="bg-white rounded-3xl p-6 border border-gray-200 border-dashed hover:shadow-lg transition-all duration-300 relative flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                    {cupom.store}
                  </span>
                  <div className="text-2xl font-black text-brand-green mb-2">
                    {cupom.discount}
                  </div>
                  <p className="text-gray-600 text-sm font-bold mb-2">
                    {cupom.desc}
                  </p>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {cupom.validade}
                  </span>
                </div>
                
                <div className="w-full sm:w-auto mt-4 sm:mt-0 flex flex-col items-center">
                  <div className="bg-gray-100 px-6 py-4 rounded-2xl font-mono text-xl font-bold tracking-widest text-brand-blue mb-3 border border-gray-200 w-full text-center">
                    {cupom.code}
                  </div>
                  <button 
                    onClick={() => handleCopy(cupom.id, cupom.code)}
                    className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      copiedId === cupom.id 
                      ? 'bg-green-500 text-white' 
                      : 'bg-brand-blue text-white hover:bg-brand-blue/90'
                    }`}
                  >
                    {copiedId === cupom.id ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" /> Copiar Código
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
