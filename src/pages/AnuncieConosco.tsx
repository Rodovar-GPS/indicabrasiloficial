import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Megaphone, Users, Target } from 'lucide-react';

export function AnuncieConosco() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-brand-blue mb-4">Anuncie no Indica Brasil</h1>
          <p className="text-gray-600 text-lg">Traga sua marca para o público que mais busca por inovação e ofertas exclusivas no Brasil.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">Público Engajado</h3>
            <p className="text-gray-600 text-sm">Milhares de acessos diários de pessoas prontas para comprar.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-brand-green mx-auto mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">Conversão Alta</h3>
            <p className="text-gray-600 text-sm">Estratégias de marketing focadas em clique e conversão direta.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-brand-yellow mx-auto mb-4">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-2">Visibilidade</h3>
            <p className="text-gray-600 text-sm">Sua marca em destaque com campanhas e banners premium.</p>
          </div>
        </div>

        <div className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Pronto para aumentar suas vendas?</h2>
          <p className="mb-6">Fale com nossa equipe comercial e descubra as melhores opções de mídia.</p>
          <a href="mailto:indicabrasiloficiall@gmail.com" className="inline-block bg-brand-yellow text-brand-blue font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform">
            Entrar em contato via E-mail
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
