import { getPortifolioById } from "@/app/services/notion"; // ajuste o caminho conforme necessário
import Image from "next/image";
import { notFound } from "next/navigation";
import HeaderMenu from "../_components/home/headerMenu";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const data = await getPortifolioById(id);

  if (!data || data.length === 0) {
    return notFound();
  }

  const projeto = data[0];

  return (
    <div className="relative flex flex-col items-center">
      <HeaderMenu />
      <div className="relative h-64 w-full opacity-40">
        <Image fill src={projeto.Capa || ""} alt={projeto.Projeto || ""} />
      </div>
      <div className="absolute top-60 h-8 w-full bg-black opacity-45 blur-sm"></div>
      <h1 className="absolute top-60 rounded-lg bg-[#68376D] px-2 py-1 text-4xl font-bold">
        {projeto.Projeto}
      </h1>
      <div className="mt-16 w-[80%]">
        <h2>História do projeto</h2>
        <p className="mt-4 text-justify">{projeto.Descricoes}</p>
      </div>

      <div className="mt-6 grid w-[80%] content-center justify-items-center">
        <div className="relative mt-5 h-[500px] w-96">
          <Image src={projeto.Foto1 || ""} alt="Foto 1" fill />
        </div>
        <div className="relative mt-20 h-96 w-[520px]">
          <Image src={projeto.Foto2 || ""} alt="Foto 2" fill />
        </div>
        <div className="relative mt-20 h-[450px] w-[450px]">
          <Image src={projeto.Foto3 || ""} alt="Foto 3" fill />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Tecnologias:</h2>
        <ul className="mt-2 list-disc pl-6">
          {[
            projeto.Tech1,
            projeto.Tech2,
            projeto.Tech3,
            projeto.Tech4,
            projeto.Tech5,
            projeto.Tech6,
          ]
            .filter(Boolean)
            .map((tech, i) => (
              <li key={i}>{tech}</li>
            ))}
        </ul>
      </div>

      <a
        href={projeto.Link}
        target="_blank"
        className="mt-6 inline-block rounded bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-800"
      >
        Ver Projeto
      </a>
    </div>
  );
}
