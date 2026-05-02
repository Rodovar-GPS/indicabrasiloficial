import { Link, useLocation } from 'react-router';

export function Header() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-brand-green"
      : "text-brand-blue hover:text-brand-green transition-colors";
  };

  return (
    <>
      <div className="h-1 bg-gradient-to-r from-brand-green from-50% via-brand-yellow via-50% to-brand-yellow" />
      <header className="bg-white h-[70px] flex flex-col md:flex-row items-center justify-between px-10 border-b border-gray-200 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group border-none">
          <div className="w-11 h-11 bg-brand-green rounded-full relative flex items-center justify-center">
            <div className="w-6 h-6 bg-brand-yellow rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <div className="w-3 h-3 bg-brand-blue rounded-full -rotate-45 relative"></div>
            </div>
          </div>
          <span className="heading-font text-2xl font-black uppercase">
            <span className="text-brand-green">Indica</span>
            <span className="text-brand-yellow ml-1">Brasil</span>
          </span>
        </Link>
        <div className="flex gap-5 font-bold text-sm items-center mt-2 md:mt-0">
          <Link to="/" className={getLinkClass('/')}>Início</Link>
          <Link to="/promocoes" className={getLinkClass('/promocoes')}>Promoções</Link>
          <Link to="/cupons" className={getLinkClass('/cupons')}>Cupons</Link>
          <Link to="/admin" className="text-brand-blue/50 hover:text-brand-blue transition-colors">Admin</Link>
        </div>
      </header>
    </>
  );
}
