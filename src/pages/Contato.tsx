import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Mail, MessageSquare } from 'lucide-react';

export function Contato() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-black text-brand-blue mb-6">Contato</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Fale Conosco</h2>
            <p className="mb-6">Tem dúvidas, sugestões ou encontrou algum problema? Entre em contato conosco através dos nossos canais de atendimento exclusivos.</p>
            
            <div className="flex flex-col gap-4">
              <a href="mailto:indicabrasiloficiall@gmail.com" className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-green hover:bg-green-50 transition-colors">
                <Mail className="text-brand-green" />
                <span className="font-bold">indicabrasiloficiall@gmail.com</span>
              </a>
              <a href="https://wa.me/5571982319773?text=Ol%C3%A1%20tudo%20bem%3F%20estou%20com%20duvida%2C%20pode%20me%20ajudar%3F" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors">
                <MessageSquare className="text-[#25D366]" />
                <span className="font-bold">WhatsApp: (71) 98231-9773</span>
              </a>
            </div>
          </div>
          <div>
             <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada com sucesso!"); }}>
                <div>
                  <label className="block text-sm font-bold mb-1">Nome</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">E-mail</label>
                  <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Mensagem</label>
                  <textarea rows={4} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue"></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-brand-blue/90">
                  Enviar Mensagem
                </button>
             </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
