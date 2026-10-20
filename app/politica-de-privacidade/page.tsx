import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/portfolio/Navbar";
import Footer from "../_components/portfolio/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — DR Inovações",
  description:
    "Como a DR Inovações trata dados pessoais neste site, em conformidade com a LGPD.",
};

const LAST_UPDATED = "20 de outubro de 2026";

const WHATSAPP_URL = `https://wa.me/5575981414537?text=${encodeURIComponent(
  "Olá! Gostaria de falar sobre a Política de Privacidade.",
)}`;

const sections = [
  { id: "controlador", title: "1. Quem é o controlador" },
  { id: "dados", title: "2. Quais dados tratamos" },
  { id: "finalidades", title: "3. Para que usamos" },
  { id: "bases", title: "4. Bases legais" },
  { id: "compartilhamento", title: "5. Com quem compartilhamos" },
  { id: "cookies", title: "6. Cookies" },
  { id: "retencao", title: "7. Por quanto tempo guardamos" },
  { id: "direitos", title: "8. Seus direitos" },
  { id: "seguranca", title: "9. Segurança" },
  { id: "criancas", title: "10. Crianças e adolescentes" },
  { id: "alteracoes", title: "11. Alterações desta política" },
  { id: "contato", title: "12. Contato" },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar solid />

      <article className="mx-auto max-w-[720px] px-6 pb-24 pt-28">
        <Link
          href="/"
          className="text-sm font-medium text-[#C9A227] transition-opacity hover:opacity-80"
        >
          ← Voltar
        </Link>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-[#C9A227]">
          Legal
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-[#86868b]">
          Última atualização: {LAST_UPDATED}
        </p>

        <p className="mt-8 text-lg leading-relaxed text-[#1d1d1f]">
          Esta política explica como a DR Inovações trata dados pessoais de
          quem visita este site. Ela foi escrita para o que o site realmente
          faz: apresentar o portfólio e abrir uma conversa. Não há cadastro,
          área logada nem venda de dados.
        </p>

        <nav
          aria-label="Sumário"
          className="mt-10 rounded-2xl border border-[#d2d2d7] bg-white p-6"
        >
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#86868b]">
            Sumário
          </p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-[#1d1d1f] transition-colors hover:text-[#C9A227]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 space-y-12 text-[15px] leading-relaxed text-[#1d1d1f]/90">
          <section id="controlador" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              1. Quem é o controlador
            </h2>
            <p className="mt-3">
              O controlador dos dados pessoais tratados por meio deste site é a{" "}
              <strong className="font-semibold text-[#1d1d1f]">
                DR Inovações
              </strong>
              , representada por Douglas Rios.
            </p>
            <p className="mt-3">
              Canal de contato para assuntos de privacidade: WhatsApp{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#C9A227] hover:opacity-80"
              >
                (75) 98141-4537
              </a>
              .
            </p>
          </section>

          <section id="dados" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              2. Quais dados tratamos
            </h2>
            <p className="mt-3">
              O site não pede nome, e-mail, documento ou qualquer cadastro.
              Os dados que podem existir são estes:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Dados técnicos de navegação.
                </strong>{" "}
                Endereço IP, data e hora, páginas acessadas, tipo de navegador
                e sistema operacional. Eles aparecem em registros do provedor
                de hospedagem, usados para entregar o site e proteger a
                infraestrutura.
              </li>
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Dados que você envia no WhatsApp.
                </strong>{" "}
                Se você clicar em “Fale conosco” ou no botão flutuante, a
                conversa acontece no WhatsApp. Número de telefone, nome de
                perfil e o conteúdo das mensagens passam a ser tratados para
                responder ao seu contato.
              </li>
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Conteúdo carregado de terceiros.
                </strong>{" "}
                Imagens do portfólio podem ser servidas pela rede da Sanity. O
                seu navegador, ao baixá-las, envia dados técnicos de conexão a
                esse serviço.
              </li>
            </ul>
          </section>

          <section id="finalidades" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              3. Para que usamos
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Exibir o site, os projetos e os conteúdos do portfólio.</li>
              <li>
                Manter a disponibilidade e a segurança da hospedagem, inclusive
                para identificar abuso ou falhas.
              </li>
              <li>
                Responder mensagens enviadas pelo WhatsApp e conduzir uma
                eventual relação comercial.
              </li>
            </ul>
            <p className="mt-4">
              Não usamos esses dados para publicidade comportamental, não
              montamos perfil de navegação e não vendemos nem alugamos listas
              de contatos.
            </p>
          </section>

          <section id="bases" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              4. Bases legais
            </h2>
            <p className="mt-3">
              O tratamento observa a Lei nº 13.709/2018 (LGPD). As bases
              aplicáveis são:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Legítimo interesse
                </strong>{" "}
                para operar o site, consultar registros técnicos e responder a
                quem nos procura.
              </li>
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Execução de procedimentos preliminares e de contrato
                </strong>{" "}
                quando a conversa evolui para uma proposta ou um projeto.
              </li>
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Cumprimento de obrigação legal
                </strong>{" "}
                quando a lei exigir a guarda de algum registro.
              </li>
            </ul>
          </section>

          <section id="compartilhamento" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              5. Com quem compartilhamos
            </h2>
            <p className="mt-3">
              Não comercializamos dados pessoais. O compartilhamento se limita
              a quem ajuda a operar o site ou a conversa que você inicia:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-[#1d1d1f]">Vercel</strong>
                , provedor de hospedagem do site, que processa registros
                técnicos de acesso.
              </li>
              <li>
                <strong className="font-semibold text-[#1d1d1f]">Sanity</strong>
                , de onde vêm textos e imagens do portfólio.
              </li>
              <li>
                <strong className="font-semibold text-[#1d1d1f]">
                  Meta (WhatsApp e Instagram)
                </strong>
                , quando você abre o WhatsApp ou visita o perfil{" "}
                <a
                  href="https://www.instagram.com/drinovacoes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#C9A227] hover:opacity-80"
                >
                  @drinovacoes
                </a>
                . A partir daí, o tratamento segue as políticas da própria Meta.
              </li>
            </ul>
            <p className="mt-4">
              Parte desses fornecedores pode processar dados fora do Brasil. A
              transferência internacional ocorre apenas na medida necessária
              para hospedar o site, entregar imagens e viabilizar o contato
              pelo WhatsApp, com as salvaguardas previstas na LGPD.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              6. Cookies
            </h2>
            <p className="mt-3">
              Este site não usa cookies de análise, publicidade ou redes
              sociais. Também não há banner de consentimento porque não
              instalamos rastreadores.
            </p>
            <p className="mt-3">
              O provedor de hospedagem pode registrar dados técnicos de
              conexão nos logs do servidor. Isso não é um cookie gravado no
              seu navegador para acompanhar você em outros sites.
            </p>
          </section>

          <section id="retencao" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              7. Por quanto tempo guardamos
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Registros técnicos de acesso ficam pelo tempo em que o provedor
                de hospedagem os mantém para segurança e operação, e são
                descartados depois disso.
              </li>
              <li>
                Mensagens de WhatsApp ficam enquanto forem úteis para responder
                você, elaborar uma proposta ou cumprir o contrato, e pelo prazo
                em que a lei exigir a conservação.
              </li>
            </ul>
          </section>

          <section id="direitos" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              8. Seus direitos
            </h2>
            <p className="mt-3">
              Nos termos do art. 18 da LGPD, você pode pedir:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>confirmação de que tratamos dados seus;</li>
              <li>acesso aos dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>
                anonimização, bloqueio ou eliminação de dados desnecessários ou
                tratados em desconformidade;
              </li>
              <li>
                informação sobre com quem os dados foram compartilhados;
              </li>
              <li>
                revogação do consentimento, quando o tratamento depender dele;
              </li>
              <li>
                oposição a um tratamento feito com base no legítimo interesse,
                quando houver motivo legítimo.
              </li>
            </ul>
            <p className="mt-4">
              Envie o pedido pelo WhatsApp indicado nesta política. Podemos
              pedir uma confirmação simples de identidade antes de atender, para
              não entregar dados à pessoa errada. Você também pode apresentar
              reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </section>

          <section id="seguranca" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              9. Segurança
            </h2>
            <p className="mt-3">
              O site é servido com HTTPS. Não há conta de usuário nem base
              própria de visitantes. As mensagens comerciais ficam no WhatsApp,
              sob as medidas de segurança da Meta e o acesso restrito de quem
              conduz o atendimento na DR Inovações.
            </p>
          </section>

          <section id="criancas" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              10. Crianças e adolescentes
            </h2>
            <p className="mt-3">
              Este site é destinado a empresas e pessoas adultas interessadas
              em desenvolvimento de software. Não coletamos intencionalmente
              dados de crianças ou adolescentes. Se isso ocorrer, o conteúdo
              será apagado assim que soubermos.
            </p>
          </section>

          <section id="alteracoes" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              11. Alterações desta política
            </h2>
            <p className="mt-3">
              Se a forma de tratar dados mudar, esta página será atualizada e a
              data no topo será revisada. O uso continuado do site depois da
              publicação vale como ciência da versão vigente.
            </p>
          </section>

          <section id="contato" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              12. Contato
            </h2>
            <p className="mt-3">
              Dúvidas sobre esta política ou pedidos de titular podem ser
              enviados pelo WhatsApp{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#C9A227] hover:opacity-80"
              >
                (75) 98141-4537
              </a>{" "}
              ou pelo Instagram{" "}
              <a
                href="https://www.instagram.com/drinovacoes/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#C9A227] hover:opacity-80"
              >
                @drinovacoes
              </a>
              .
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
