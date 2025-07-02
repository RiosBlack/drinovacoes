"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Aurora from "./_components/backgroundAurora";
import HeaderMenu from "./_components/home/headerMenu";
import GradientText from "./_components/textGradient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lenis from "lenis";
import SplitText from "./_components/animationSplitText";
import AnimatedContent from "./_components/animationContent";
import Image, { StaticImageData } from "next/image";
import foto from "../app/public/foto2.2.png";
import { FiInstagram } from "react-icons/fi";
import Link from "next/link";
import { FaRobot, FaWhatsapp } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GoArrowUpRight, GoGear } from "react-icons/go";
import Marquee from "react-fast-marquee";
import { BsOpencollective } from "react-icons/bs";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { PiShoppingCartThin } from "react-icons/pi";
import { IoIosLaptop } from "react-icons/io";
import CardProject from "./_components/cardProject";
import fotoTeste from "../app/public/teste.jpg";
import { AiOutlineCheck } from "react-icons/ai";
import insta from "../app/public/instagam.png";
import whats from "../app/public/whatsapp.png";
import { getPortifolio } from "./services/notion";
import { PortfolioItem } from "./types/notion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [projectsMenu1, setProjectsMenu1] = useState<
    {
      servicoDescricao: string;
      data: string;
      titleCard: string;
      tagServico: string;
      tagTecnologia: string;
      image: string | StaticImageData;
      id: string;
    }[]
  >([]);

  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/${projectId}`);
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const portfolioData = await getPortifolio();

        const mappedProjects = portfolioData.map((item: PortfolioItem) => ({
          servicoDescricao: item.DescricaoBreve || "Projeto personalizado",
          data: item.data,
          titleCard: item.Projeto || "Projeto sem título",
          tagServico: "Projeto",
          tagTecnologia:
            [
              item.Tech1,
              item.Tech2,
              item.Tech3,
              item.Tech4,
              item.Tech5,
              item.Tech6,
            ]
              .filter(Boolean)
              .join(", ") || "Tecnologias diversas",
          image: item.Miniatura || fotoTeste, // Usar a miniatura do Notion ou imagem padrão
          id: item.Index || "", // Usar o Index como ID para navegação
        }));

        setProjectsMenu1(mappedProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        // Em caso de erro, manter dados padrão
        setProjectsMenu1([
          {
            servicoDescricao: "......",
            data: ".....",
            titleCard: "....",
            tagServico: "....",
            tagTecnologia: "......",
            image: ".....",
            id: "",
          },
        ]);
      }
    }

    fetchProjects();
  }, []);

  function setaInit() {
    const seta = gsap.utils.toArray(".fade-section-seta");
    const contentButton = gsap.utils.toArray(".fade-section-button");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seta.forEach((el: any) => {
      gsap.fromTo(el, { rotate: 0 }, { rotate: 45, duration: 1 });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentButton.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 1,
          ease: "power2.out",
        },
      );
    });
  }

  function setaExit() {
    const seta = gsap.utils.toArray(".fade-section-seta2");
    const contentButton = gsap.utils.toArray(".fade-section-button2");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seta.forEach((el: any) => {
      gsap.fromTo(el, { rotate: 45 }, { rotate: 0, duration: 1 });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentButton.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
      );
    });
  }

  function initButtonProjetos() {
    const seta3 = gsap.utils.toArray(".fade-section-seta3");
    const contentButton = gsap.utils.toArray(".fade-section-button");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seta3.forEach((el: any) => {
      gsap.fromTo(el, { rotate: 0 }, { rotate: 45, duration: 1 });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentButton.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 0.92,
          duration: 1,
          ease: "power2.out",
        },
      );
    });
  }

  function exitButtonProjetos() {
    const contentButton2 = gsap.utils.toArray(".fade-section-button2");
    const seta4 = gsap.utils.toArray(".fade-section-seta4");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seta4.forEach((el: any) => {
      gsap.fromTo(el, { rotate: 45 }, { rotate: 0, duration: 1 });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentButton2.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 0.92 },
        {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
      );
    });
  }

  useEffect(() => {
    const elements = gsap.utils.toArray(".fade-section");
    const elementsImage1 = gsap.utils.toArray(".fade-section-image1");
    const elementsImage2 = gsap.utils.toArray(".fade-section-image2");
    const elementsFoto = gsap.utils.toArray(".fade-section-foto");
    const engrenagem = gsap.utils.toArray(".fade-section-gear");
    const carrinho = gsap.utils.toArray(".fade-section-cart");
    const notebook = gsap.utils.toArray(".fade-section-notebook");
    const robot = gsap.utils.toArray(".fade-section-robot");
    const bloco1servicos = gsap.utils.toArray(".fade-section-bloco1");
    const bloco2servicos = gsap.utils.toArray(".fade-section-bloco2");
    const bloco3servicos = gsap.utils.toArray(".fade-section-bloco3");
    const bloco4servicos = gsap.utils.toArray(".fade-section-bloco4");

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engrenagem.forEach((el: any) => {
      gsap.fromTo(
        el,
        { rotate: 0 },
        {
          rotate: 360,
          duration: 1,
          repeat: -1,
          ease: "power4.inOut",
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bloco1servicos.forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bloco2servicos.forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bloco3servicos.forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bloco4servicos.forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 50%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    carrinho.forEach((el: any) => {
      gsap.fromTo(
        el,
        { rotate: 0 },
        {
          rotate: 12,
          duration: 1,
          repeat: -1,
          ease: "bounce",
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notebook.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 1.2,
          duration: 1,
          repeat: -1,
          ease: "bounce",
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    robot.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 0.5,
          duration: 1,
          repeat: -1,
          ease: "bounce",
        },
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((el: any) => {
      gsap.fromTo(
        el,
        { y: 20 },
        {
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      elementsImage1.forEach((el: any) => {
        gsap.fromTo(
          el,
          { x: 0, opacity: 0 },
          {
            x: -80,
            opacity: 1,
            duration: 2,
          },
        );
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      elementsImage2.forEach((el: any) => {
        gsap.fromTo(
          el,
          { x: 0, opacity: 0 },
          {
            x: -40,
            opacity: 1,
            duration: 2,
          },
        );
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      elementsFoto.forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
          },
        );
      });
    }, 3600);

    ScrollTrigger.refresh();
  }, []);

  function whatsApp() {
    const mensagem = `Olá Douglas, estou pronto para fazer o extraordinário acontecer!`;
    const url = `https://wa.me/5575981414537?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  function instagram() {
    window.open("https://www.instagram.com/drinovacoes/", "_blank");
  }

  function handleMouseEnterInstagram() {
    gsap.to(".instagram-icon", {
      rotate: 360,
      scale: 1.2,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".instagram-background", {
      scale: 1.1,
      duration: 1,
      ease: "power2.out",
    });
  }

  function handleMouseSairInstagram() {
    gsap.to(".instagram-icon", {
      rotate: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".instagram-background", {
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });
  }

  function handleMouseEnterWhatsapp() {
    gsap.to(".whatsapp-icon", {
      rotate: 360,
      scale: 1.2,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".whatsapp-background", {
      scale: 1.1,
      duration: 1,
      ease: "power2.out",
    });
  }

  function handleMouseSairWhatsapp() {
    gsap.to(".whatsapp-icon", {
      rotate: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".whatsapp-background", {
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });
  }

  const dataComoFunciona = [
    {
      titleButon: "Descoberta",
      number: "01",
      title: "Primeiro Contato",
      tagUl1: "Inicial:",
      ul1: "Conversa para entender a necessidade do cliente.",
      tagUl2: "Entendimento:",
      ul2: "Alinhamos expectativas e objetivos do projeto.",
      tagUl3: "Definição estratégica:",
      ul3: "Planejamento inicial e visão geral do projeto.",
    },
    {
      titleButon: "Planejamento",
      number: "02",
      title: "Briefing e estruturação",
      tagUl1: "Assinatura do contrato:",
      ul1: "Formalizamos tudo para segurança e transparência.",
      tagUl2: "Envio do Briefing:",
      ul2: "Coletamos todas as informações essenciais para o projeto.",
      tagUl3: "Direcionamento visual:",
      ul3: "Definição de referências e identidade do projeto.",
    },
    {
      titleButon: "Desenvolvimento",
      number: "03",
      title: "Criação e ajustes",
      tagUl1: "Inicio do projeto:",
      ul1: "Desenvolvimento do projeto com base no briefing aprovado.",
      tagUl2: "Apresentação e revisões:",
      ul2: "Feedback para aprovação ou ajustes e refinamentos.",
      tagUl3: "Testes e validações:",
      ul3: "Testando o projeto e colocando em produção.",
    },
    {
      titleButon: "Entrega",
      number: "04",
      title: "Projeto finalizado e entregue",
      tagUl1: "Entrega do projeto:",
      ul1: "Projeto no ar e rodando.",
      tagUl2: "Entrega da identidade visual:",
      ul2: "Paleta de cores e elementos visuais organizados.",
      tagUl3: "Entrega de material produzido:",
      ul3: "Entrega de todo material.",
    },
  ];

  return (
    <div>
      <div className="flex w-full items-center justify-center">
        <HeaderMenu />
      </div>
      <div
        id="section1"
        className="sticky top-0 z-0 flex h-screen w-full flex-col items-center overflow-hidden"
      >
        <Aurora
          colorStops={["#310137", "#000000", "#310137"]}
          blend={0.5}
          speed={1}
        />
        <div className="absolute z-20 flex h-full w-[80%] items-center justify-center">
          <div className="fade-section-foto relative flex h-full w-full flex-1 flex-col items-center justify-center opacity-0">
            <div className="fade-section-image1 absolute z-20 h-[50%] w-[50%] rounded-full border-2 border-white bg-white"></div>
            <div className="fade-section-image2 absolute z-30 h-[50%] w-[50%] rounded-full border-2 border-purple-800 bg-purple-800"></div>
            <div className="absolute z-40 h-[50%] w-[50%] overflow-hidden rounded-full border-2 border-purple-800 bg-black">
              <Image alt="logo" src={foto} fill objectFit="cover" />
            </div>
            <h2 className="absolute bottom-32 bg-gradient-to-r from-gray-300 to-purple-800 bg-clip-text text-xl font-extrabold text-transparent">
              Douglas Rios
            </h2>
            <div className="absolute bottom-20 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      about="Instagram"
                      href={"https://www.instagram.com/drinovacoes/"}
                      onMouseEnter={() => {
                        gsap.to(".instagram", {
                          rotate: 360,
                          scale: 1.2,
                          duration: 1,
                          ease: "power2.out",
                        });
                      }}
                      onMouseLeave={() => {
                        gsap.to(".instagram", {
                          rotate: 0,
                          scale: 1,
                          duration: 1,
                          ease: "power2.out",
                        });
                      }}
                    >
                      <FiInstagram className="instagram h-10 w-10 text-zinc-400" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <SplitText
              text="O futuro começa com uma boa ideia! E a nossa missão é realizá-la com você."
              className="text-center text-3xl font-semibold text-gray-300"
              delay={50}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
            <AnimatedContent delay={3500}>
              <GradientText
                colors={["#310137", "#fff", "#310137", "#fff", "#310137"]}
                animationSpeed={10}
                showBorder={false}
                className="text-center text-4xl"
              >
                Transformamos ideias em tecnologia.
              </GradientText>
              <div
                className="flex w-full cursor-pointer items-center justify-center"
                onMouseEnter={() => {
                  setaInit();
                }}
                onMouseLeave={() => {
                  setaExit();
                }}
              >
                <div className="fade-section-button fade-section-button2 mt-8 flex items-center justify-center space-x-2 rounded-3xl bg-purple-800 px-6 py-7 font-bold hover:bg-zinc-400 hover:text-purple-800">
                  <p>Conheça meu trabalho</p>
                  <div>
                    <GoArrowUpRight className="fade-section-seta fade-section-seta2 h-8 w-8" />
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>

      <div className="fade-section z-40 bg-gradient-to-r from-slate-50 via-slate-300 to-slate-50 py-10">
        <Marquee gradient={true} speed={50} gradientColor="#F8F8F8">
          <span className="mx-8 text-5xl font-bold text-black">
            <span className="text-purple-800">Vários</span> clientes satisfeitos
          </span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
          <span className="mx-8 text-5xl font-bold text-black">
            <span className="text-purple-800">Muitos</span> projetos
            consolidados
          </span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
          <span className="mx-8 text-5xl font-bold text-black">
            <span className="text-purple-800">4+</span> anos de experiência
          </span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
        </Marquee>
      </div>

      <div className="fade-section relative z-40 flex h-screen w-full flex-col items-center bg-gradient-to-t from-slate-50 via-slate-300 to-slate-50">
        <div className="mt-20 w-[80%]">
          <BiSolidPlaneAlt className="mb-4 h-10 w-10 animate-pulse text-purple-800" />
          <h2 className="ml-5 text-xl text-zinc-500">
            Eleve o nível do seu négocio.
          </h2>
          <h1 className="mt-6 text-7xl font-bold text-black">Serviços:</h1>
          <div className="mt-14 flex space-x-9">
            <div className="fade-section-bloco1 flex-1">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl">
                <GoGear className="fade-section-gear h-16 w-16" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-black">Sistemas</h3>
              <p className="mt-4 font-semibold text-zinc-500">
                Transformamos problemas complexos em soluções simples e
                eficientes. Desenvolvemos sistemas personalizados para resolver
                os desafios reais do seu negócio.
              </p>
            </div>
            <div className="fade-section-bloco2 flex-1">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl">
                <PiShoppingCartThin className="fade-section-cart h-16 w-16" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-black">
                Lojas Virtuais
              </h3>
              <p className="mt-4 font-semibold text-zinc-500">
                Criamos e-commerce modernos, rápidos e pensados para vender.
                Layouts responsivos, integração com meios de pagamento e suporte
                completo para você focar no que importa: vender.
              </p>
            </div>
            <div className="fade-section-bloco3 flex-1">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl">
                <IoIosLaptop className="fade-section-notebook h-16 w-16" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-black">Sites</h3>
              <p className="mt-4 font-semibold text-zinc-500">
                Sites institucionais com design estratégico, performance
                impecável e foco em conversão. Do conceito à publicação,
                entregamos presença digital com impacto.
              </p>
            </div>
            <div className="fade-section-bloco4 flex-1">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl">
                <FaRobot className="fade-section-robot h-16 w-16" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-black">
                Automações com IA
              </h3>
              <p className="mt-4 font-semibold text-zinc-500">
                Automatize tarefas e aumente sua produtividade com inteligência
                artificial. Criamos fluxos inteligentes que economizam tempo e
                otimizam decisões no seu negócio.
              </p>
            </div>
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center"
            onMouseEnter={() => {
              setaInit();
            }}
            onMouseLeave={() => {
              setaExit();
            }}
          >
            <div className="fade-section-button fade-section-button2 mt-8 flex items-center justify-center space-x-2 rounded-3xl bg-purple-800 px-6 py-4 font-bold hover:bg-zinc-400 hover:text-purple-800">
              <p>Vamos trabalhar juntos?</p>
              <div>
                <GoArrowUpRight className="fade-section-seta fade-section-seta2 h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fade-section relative flex w-full flex-col items-center bg-black"
        id="Projetos"
      >
        <div className="mb-4 w-full pl-20">
          <h1 className="mt-6 bg-gradient-to-b from-purple-800 to-purple-400 bg-clip-text pb-2 text-6xl font-bold text-transparent">
            Projetos:
          </h1>
        </div>
        <div className="w-full">
          <div className="flex-1">
            <div className="flex h-[85vh] w-full items-center justify-center border border-zinc-800">
              {projectsMenu1.map((project, index) => (
                <CardProject
                  key={index}
                  servicoDescricao={project.servicoDescricao}
                  data={project.data}
                  titleCard={project.titleCard}
                  tagServico={project.tagServico}
                  tagTecnologia={project.tagTecnologia}
                  image={project.image}
                  onClick={() => handleProjectClick(project.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex h-[50vh] flex-1">
            <div className="flex-1 border border-zinc-800">
              {projectsMenu1.length > 0 && (
                <CardProject
                  servicoDescricao={projectsMenu1[0].servicoDescricao}
                  data={projectsMenu1[0].data}
                  titleCard={projectsMenu1[0].titleCard}
                  tagServico={projectsMenu1[0].tagServico}
                  tagTecnologia={projectsMenu1[0].tagTecnologia}
                  image={projectsMenu1[0].image}
                  onClick={() => handleProjectClick(projectsMenu1[0].id)}
                />
              )}
            </div>
            <div className="flex-1 border border-zinc-800">
              {projectsMenu1.length > 1 && (
                <CardProject
                  servicoDescricao={projectsMenu1[1].servicoDescricao}
                  data={projectsMenu1[1].data}
                  titleCard={projectsMenu1[1].titleCard}
                  tagServico={projectsMenu1[1].tagServico}
                  tagTecnologia={projectsMenu1[1].tagTecnologia}
                  image={projectsMenu1[1].image}
                  onClick={() => handleProjectClick(projectsMenu1[1].id)}
                />
              )}
            </div>
            <Link
              href="/projetos"
              className="flex-1 cursor-pointer border border-zinc-800"
            >
              <div
                className="fade-section-button fade-section-button2 flex h-full w-full items-center justify-center rounded-lg bg-purple-800"
                onMouseEnter={() => {
                  initButtonProjetos();
                }}
                onMouseLeave={() => {
                  exitButtonProjetos();
                }}
              >
                <h2 className="text-xl">Ver mais Projetos</h2>
                <div>
                  <GoArrowUpRight className="fade-section-seta3 fade-section-seta4 h-8 w-8 text-zinc-400" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="fade-section z-40 bg-gradient-to-r from-slate-50 via-slate-300 to-slate-50 py-10">
        <Marquee gradient={true} speed={50} gradientColor="#F8F8F8">
          <span className="mx-8 text-5xl font-bold text-black">
            Lojas virtuais
          </span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
          <span className="mx-8 text-5xl font-bold text-black">Sites</span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
          <span className="mx-8 text-5xl font-bold text-black">
            Sistemas personalizados
          </span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
          <span className="mx-8 text-5xl font-bold text-black">
            Automações com IA
          </span>
          <span>
            <BsOpencollective className="h-8 w-8 animate-spin text-purple-800" />
          </span>
        </Marquee>
      </div>
      <div
        className="relative z-40 flex w-full justify-center bg-gradient-to-t from-slate-50 via-slate-300 to-slate-50"
        id="Contato"
      >
        <div className="w-[80%]">
          <div className="mt-24 flex items-end text-5xl font-bold text-black">
            <div className="mr-3 h-5 w-5 rounded-full bg-purple-800"></div>
            Como funciona:
          </div>
          <p className="mb-20 mt-5 w-[50%] text-lg font-semibold text-zinc-500">
            Por trás de toda solução de impacto, existe um processo inteligente.
            Estruturado o suficiente para garantir resultado, flexível o
            bastante para evoluir com você.
          </p>
          {dataComoFunciona.map((item, index) => (
            <div
              key={index}
              className="fade-section flex w-full items-center space-x-10 border-y-2 border-purple-200 py-20"
            >
              <div className="flex-2 flex space-x-4">
                <div className="ml-10 flex w-48 flex-1 items-center justify-center rounded-xl border border-purple-800 px-3 py-1 text-zinc-500 shadow-md shadow-purple-800">
                  {item.titleButon}
                </div>
                <div className="flex flex-1 items-center justify-center text-2xl text-zinc-400">
                  {item.number}
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start justify-center">
                <h3 className="mflex items-end text-xl font-semibold text-purple-800">
                  {item.title}
                </h3>
                <ul className="mt-4 flex flex-col space-y-1 text-zinc-500">
                  <li className="flex items-center space-x-2">
                    <AiOutlineCheck className="mr-2 h-5 w-5 rounded-full bg-transparent text-purple-800 shadow-lg shadow-purple-800" />
                    <span className="pr-4 font-semibold text-black">
                      {item.tagUl1}
                    </span>
                    {item.ul1}
                  </li>
                  <li className="flex items-center space-x-2">
                    <AiOutlineCheck className="mr-2 h-5 w-5 rounded-full bg-transparent text-purple-800 shadow-lg shadow-purple-800" />
                    <span className="pr-4 font-semibold text-black">
                      {item.tagUl2}
                    </span>{" "}
                    {item.ul2}
                  </li>
                  <li className="flex items-center space-x-2">
                    <AiOutlineCheck className="mr-2 h-5 w-5 rounded-full bg-transparent text-purple-800 shadow-lg shadow-purple-800" />
                    <span className="pr-4 font-semibold text-black">
                      {item.tagUl3}
                    </span>{" "}
                    {item.ul3}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-40 flex h-[80vh] w-full justify-center">
        <div className="flex w-[80%]">
          <div className="relative flex h-full w-full flex-1 items-center justify-center p-5">
            <div className="absolute flex space-x-4">
              <div className="space-y-4">
                <div className="h-52 w-52 rounded-bl-[50%] rounded-tr-[50%] border-2 border-purple-800 opacity-20"></div>
                <div className="h-52 w-52 rounded-br-[50%] rounded-tl-[50%] border-2 border-purple-800 opacity-20"></div>
              </div>
              <div className="space-y-4">
                <div className="h-52 w-52 rounded-br-[50%] rounded-tl-[50%] border-2 border-purple-800 opacity-20"></div>
                <div className="h-52 w-52 rounded-bl-[50%] rounded-tr-[50%] border-2 border-purple-800 opacity-20"></div>
              </div>
            </div>
            <h1 className="z-40 text-center text-7xl">
              Chegou a hora de{" "}
              <span className="text-purple-800">construir</span> o
              extraordinário. <span className="text-purple-800">Juntos</span>,
              fazemos acontecer.
            </h1>
          </div>
          <div className="relative flex flex-1 justify-center">
            <div className="absolute top-[15%] z-40 h-44 w-44 overflow-hidden rounded-full border-2 border-purple-800 bg-black">
              <Image alt="logo" src={foto} fill objectFit="cover" />
            </div>
            <div
              className="absolute top-[50%] rounded-2xl bg-zinc-900 px-4 py-2 shadow-lg shadow-transparent hover:shadow-[#ED4895]"
              onMouseEnter={() => {
                handleMouseEnterInstagram();
              }}
              onMouseLeave={() => {
                handleMouseSairInstagram();
              }}
            >
              <div
                onClick={() => {
                  instagram();
                }}
                className="relative flex cursor-pointer items-center justify-center space-x-2"
              >
                <Image
                  alt="instagram"
                  src={insta}
                  width={90}
                  height={90}
                  className="instagram-background absolute -left-4"
                />
                <FiInstagram className="instagram-icon z-40 h-12 w-12 text-white" />
                <h2 className="pl-5 text-2xl">
                  Me chama no <span className="text-[#ED4895]">instagram</span>
                </h2>
              </div>
            </div>
            <div className="absolute top-[45%] flex items-center justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <h2 className="text-purple-800">Disponível para projetos</h2>
            </div>
            <div
              className="absolute top-[65%] rounded-2xl bg-zinc-900 px-4 py-2 shadow-lg shadow-transparent hover:shadow-green-400"
              onMouseEnter={() => {
                handleMouseEnterWhatsapp();
              }}
              onMouseLeave={() => {
                handleMouseSairWhatsapp();
              }}
            >
              <div
                onClick={() => {
                  whatsApp();
                }}
                className="relative flex cursor-pointer items-center justify-center space-x-2"
              >
                <Image
                  alt="whatsapp"
                  src={whats}
                  width={90}
                  height={90}
                  className="whatsapp-background absolute -left-4"
                />
                <FaWhatsapp className="whatsapp-icon z-40 h-12 w-12 text-white" />
                <h2 className="pl-5 text-2xl">
                  Me chama no <span className="text-green-400">whatsapp</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
