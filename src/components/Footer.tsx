import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="mt-8 flex flex-col bg-white border-t border-[#EEE] items-center justify-center">
      <div className="w-full h-[34px] bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white text-[12px] font-bold flex items-center justify-center gap-2">
        📸 Siga no Instagram @indicabrasil.oficial para ofertas exclusivas em tempo real!
      </div>
      
      <div className="h-[98px] flex flex-col items-center justify-center w-full px-5 text-center">
        <div className="flex gap-5 text-[11px] opacity-70 mb-2 font-bold select-none">
          <Link to="/privacidade" className="hover:text-brand-blue hover:opacity-100 transition-colors">Privacidade</Link>
          <Link to="/termos-de-uso" className="hover:text-brand-blue hover:opacity-100 transition-colors">Termos de Uso</Link>
          <Link to="/anuncie-conosco" className="hover:text-brand-blue hover:opacity-100 transition-colors">Anuncie Conosco</Link>
          <Link to="/contato" className="hover:text-brand-blue hover:opacity-100 transition-colors">Contato</Link>
        </div>
        
        <div className="text-[12px] font-bold text-brand-blue">
          Indica Brasil © 2026 — O seu guia de compras inteligente
        </div>
        
        <div className="w-full flex h-1 mt-2.5 max-w-[200px]">
          <div className="flex-1 bg-brand-green" />
          <div className="flex-1 bg-brand-yellow" />
          <div className="flex-1 bg-brand-blue" />
        </div>
      </div>
    </footer>
  );
}
