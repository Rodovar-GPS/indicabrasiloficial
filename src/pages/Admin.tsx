import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, limit } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash, Power, LogOut, Package, MousePointerClick, TrendingUp, Instagram, LayoutDashboard, ShoppingBag, DownloadCloud, AlertCircle } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { Product } from '../types';

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'produtos' | 'instagram'>('dashboard');

  // Form states
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', original_price: '', discount_percent: '',
    image_url: '', affiliate_link: '', store_name: '', category: 'tecnologia', is_featured: false
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== 'indicabrasiloficiall@gmail.com') {
        navigate('/login');
      } else {
        setIsAuthChecking(false);
        fetchProducts();
      }
    });
    return () => unsub();
  }, [navigate]);

  async function fetchProducts() {
    try {
      const q = query(collection(db, 'products'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', id), { is_active: !currentStatus });
      setProducts(products.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Certeza que deseja excluir este produto?")) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedPrice = parseFloat(formData.price.replace(',', '.'));
      const parsedOriginal = parseFloat(formData.original_price.replace(',', '.'));
      const parsedDiscount = parseFloat(formData.discount_percent.replace(',', '.'));
      
      if (isNaN(parsedPrice)) {
        alert("Erro: Preço inválido.");
        return;
      }

      const newProduct = {
        title: formData.title,
        description: formData.description,
        price: parsedPrice,
        original_price: isNaN(parsedOriginal) ? 0 : parsedOriginal,
        discount_percent: isNaN(parsedDiscount) ? 0 : parsedDiscount,
        image_url: formData.image_url,
        affiliate_link: formData.affiliate_link,
        store_name: formData.store_name,
        category: formData.category,
        is_active: true,
        is_featured: formData.is_featured,
        clicks: 0,
        created_at: Date.now()
      };
      
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      setProducts([{ id: docRef.id, ...newProduct } as Product, ...products]);
      setIsAdding(false);
      setFormData({
        title: '', description: '', price: '', original_price: '', discount_percent: '',
        image_url: '', affiliate_link: '', store_name: '', category: 'tecnologia', is_featured: false
      });
      alert("Produto adicionado com sucesso!");
    } catch (err: any) {
      console.error("Error adding product", err);
      alert("Erro ao adicionar produto: " + (err.message || String(err)));
    }
  };

  if (isAuthChecking) return <div className="min-h-screen bg-brand-bg flex items-center justify-center">Carregando...</div>;

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.is_active).length;
  const totalClicks = products.reduce((acc, p) => acc + (p.clicks || 0), 0);
  
  const topProducts = [...products]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)
    .map(p => ({ name: p.title.substring(0, 15) + '...', clicks: p.clicks }));

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Sidebar Admin */}
      <aside className="w-64 bg-brand-blue text-white flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-brand-yellow rotate-45" />
          </div>
          <div>
            <h1 className="heading-font text-xl font-bold uppercase leading-none">Admin</h1>
            <p className="text-[10px] text-white/50">Indica Brasil Workspace</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('produtos')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'produtos' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingBag className="w-5 h-5" /> Catálogo & Produtos
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 text-white/60 hover:text-red-400 font-bold transition-colors w-full px-4 py-2">
            <LogOut className="w-5 h-5" /> Sair do sistema
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black text-brand-blue mb-8">Visão Geral</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-500 font-bold">Total Produtos</p>
                  <h3 className="text-3xl font-black text-brand-blue">{totalProducts}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-brand-green">
                  <MousePointerClick className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-500 font-bold">Total Cliques</p>
                  <h3 className="text-3xl font-black text-brand-blue">{totalClicks}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-brand-yellow">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-gray-500 font-bold">Produtos Ativos</p>
                  <h3 className="text-3xl font-black text-brand-blue">{activeProducts}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8 max-w-3xl">
              <h3 className="text-xl font-black text-brand-blue mb-6">🔥 Produtos mais clicados</h3>
              {topProducts.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 30, bottom: 0, left: 40 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={150} axisLine={false} tickLine={false} className="text-xs font-bold font-sans text-gray-600" />
                      <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="clicks" fill="var(--color-brand-green)" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-gray-400 font-bold">Nenhum dado disponível.</p>
              )}
            </div>
          </div>
        )}

        {/* PRODUTOS TAB */}
        {activeTab === 'produtos' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-brand-blue">Gerenciar Produtos</h2>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-brand-green text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-green-dark transition shadow-md"
              >
                <Plus className="w-5 h-5" /> Adicionar Produto Manual
              </button>
            </div>

            {isAdding && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 mb-8 relative">
                <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">✕</button>
                <h3 className="text-2xl font-black text-brand-blue mb-6">Novo Produto</h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Título do Produto</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-xl px-4 py-3 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Categoria</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-xl px-4 py-3 outline-none font-bold">
                        <option value="tecnologia">Tecnologia</option>
                        <option value="moda">Moda</option>
                        <option value="casa">Casa</option>
                        <option value="beleza">Beleza</option>
                        <option value="esporte">Esporte</option>
                        <option value="cozinha">Cozinha</option>
                        <option value="games">Games</option>
                        <option value="produto-virtual">Produto Virtual</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Preço Atual (R$)</label>
                      <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" placeholder="0,00" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Preço Original (R$)</label>
                      <input type="text" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" placeholder="0,00" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Desconto (%)</label>
                      <input type="text" value={formData.discount_percent} onChange={e => setFormData({...formData, discount_percent: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 bg-gray-100" placeholder="0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Link de Afiliado (URL)</label>
                      <input type="url" required value={formData.affiliate_link} onChange={e => setFormData({...formData, affiliate_link: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1.5 text-gray-700">Nome da Loja (ex: Amazon)</label>
                      <input type="text" required value={formData.store_name} onChange={e => setFormData({...formData, store_name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1.5 text-gray-700">URL da Imagem</label>
                    <input type="url" required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                  </div>

                   <div>
                    <label className="block text-sm font-bold mb-1.5 text-gray-700">Descrição Promocional</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-brand-blue text-white font-black py-4 rounded-xl hover:bg-brand-blue/90 shadow-lg text-lg">
                    Salvar Novo Produto
                  </button>
                </form>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider">
                      <th className="p-5 border-b border-gray-200">Produto</th>
                      <th className="p-5 border-b border-gray-200">Preço</th>
                      <th className="p-5 border-b border-gray-200">Cliques</th>
                      <th className="p-5 border-b border-gray-200">Status</th>
                      <th className="p-5 border-b border-gray-200 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-red-50/10 transition group">
                        <td className="p-5 flex items-center gap-4">
                          <img src={p.image_url} alt={p.title} className="w-14 h-14 rounded-lg object-cover border border-gray-200 bg-white" />
                          <div className="max-w-[300px]">
                            <p className="font-bold truncate text-brand-blue text-sm">{p.title}</p>
                            <p className="text-xs text-brand-green font-bold bg-brand-green/10 w-fit px-2 py-0.5 rounded-md mt-1">{p.category}</p>
                          </div>
                        </td>
                        <td className="p-5 font-black text-gray-800">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                        <td className="p-5">
                          <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-xs">
                            {p.clicks || 0} acessos
                          </span>
                        </td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="p-5 text-right opacity-50 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleToggleActive(p.id, p.is_active)} className="p-2 text-gray-400 hover:text-brand-blue transition" title="Ativar/Desativar">
                            <Power className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Excluir">
                            <Trash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400 font-bold">Nenhum produto cadastrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
