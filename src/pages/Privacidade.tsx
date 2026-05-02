import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Privacidade() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-brand-blue mb-6">Política de Privacidade</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-gray-700 leading-relaxed">
          <p>
            A sua privacidade é importante para nós. É política do <strong>Indica Brasil Oficial</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Indica Brasil Oficial, e outros sites que possuímos e operamos.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">1. Coleta de Dados</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">2. Retenção de Dados</h2>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">3. Compartilhamento de Informações</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">4. Links Externos e Parceiros</h2>
          <p>
            O nosso site pode ter links para sites externos, incluindo nossos parceiros de afiliados e marketplaces vinculados (como Amazon, Shopee, entre outros), que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">5. Cookies</h2>
          <p>
            Utilizamos cookies para armazenar informação, como as suas preferências pessoais quando visita o nosso site. Isto poderá incluir um simples alerta pop-up, ou uma ligação a vários serviços que providenciamos. O Google, como fornecedor de terceiros, também utiliza cookies para exibir anúncios em nosso site.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">6. Aceitação da Política</h2>
          <p>
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
          </p>

          <p className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
            Esta política é efetiva a partir de Maio de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
