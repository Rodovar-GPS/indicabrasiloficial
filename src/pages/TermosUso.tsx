import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function TermosUso() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-brand-blue mb-6">Termos de Uso</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-gray-700 leading-relaxed">
          <p>
            Bem-vindo ao <strong>Indica Brasil Oficial</strong>. Ao acessar e utilizar este site, você concorda em cumprir e ficar vinculado aos seguintes termos e condições de uso, que em conjunto com nossa Política de Privacidade governam o relacionamento do Indica Brasil Oficial com você em relação a este site.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar o site Indica Brasil Oficial, você concorda em cumprir estes Termos de Uso, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">2. Uso de Licença</h2>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Indica Brasil Oficial, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Modificar ou copiar os materiais;</li>
            <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
            <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Indica Brasil Oficial;</li>
            <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
            <li>Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-blue mt-8">3. Isenção de Responsabilidade e Afiliados</h2>
          <p>
            Os materiais no site da Indica Brasil Oficial são fornecidos 'como estão'. O Indica Brasil Oficial não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
          </p>
          <p>
            O Indica Brasil Oficial atua na indicação de produtos por meio de links de afiliados. Não nos responsabilizamos pela entrega, qualidade ou devolução dos produtos adquiridos em sites parceiros de terceiros (como Amazon, entre outros). Toda e qualquer transação de e-commerce é realizada nos sites dos próprios marketplaces recomendados.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">4. Limitações</h2>
          <p>
            Em nenhum caso o Indica Brasil Oficial ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Indica Brasil Oficial, mesmo que o Indica Brasil Oficial ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">5. Precisão dos Materiais</h2>
          <p>
            Os materiais exibidos no site do Indica Brasil Oficial podem incluir erros técnicos, tipográficos ou fotográficos. O Indica Brasil Oficial não garante que qualquer material em seu site seja preciso, completo ou atual. Podemos fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. Da mesma forma, não assumimos o compromisso de atualizar os materiais.
          </p>

          <h2 className="text-xl font-bold text-brand-blue mt-8">6. Modificações dos Termos de Uso</h2>
          <p>
            O Indica Brasil Oficial pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
          </p>

          <p className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
            Última atualização: Maio de 2026. Recomendamos que você os revise periodicamente para se familiarizar com quaisquer modificações.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
