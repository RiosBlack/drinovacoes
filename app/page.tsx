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
        <div className="absolute z-20 flex h-full w-[90%] items-center justify-center sm:w-[85%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[80%]">
          <div className="fade-section-foto relative flex h-full w-full flex-1 flex-col items-center justify-center opacity-0">
            <div className="fade-section-image1 absolute z-20 h-[40%] w-[40%] rounded-full border-2 border-white bg-white sm:h-[45%] sm:w-[45%] md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[50%] xl:h-[50%] xl:w-[50%] 2xl:h-[50%] 2xl:w-[50%]"></div>
            <div className="fade-section-image2 absolute z-30 h-[40%] w-[40%] rounded-full border-2 border-purple-800 bg-purple-800 sm:h-[45%] sm:w-[45%] md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[50%] xl:h-[50%] xl:w-[50%] 2xl:h-[50%] 2xl:w-[50%]"></div>
            <div className="absolute z-40 h-[40%] w-[40%] overflow-hidden rounded-full border-2 border-purple-800 bg-black sm:h-[45%] sm:w-[45%] md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[50%] xl:h-[50%] xl:w-[50%] 2xl:h-[50%] 2xl:w-[50%]">
              <Image alt="logo" src={foto} fill objectFit="cover" />
            </div>
            <h2 className="absolute bottom-20 bg-gradient-to-r from-gray-300 to-purple-800 bg-clip-text text-base font-extrabold text-transparent sm:bottom-24 sm:text-lg md:bottom-32 md:text-xl lg:bottom-32 lg:text-xl xl:bottom-32 xl:text-xl 2xl:bottom-32 2xl:text-xl">
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
          <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-5 xl:space-y-5 2xl:space-y-5">
            <SplitText
              text="O futuro começa com uma boa ideia! E a nossa missão é realizá-la com você."
              className="px-4 text-center text-lg font-semibold text-gray-300 sm:px-2 sm:text-xl md:px-0 md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl"
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
                className="px-4 text-center text-2xl sm:px-2 sm:text-3xl md:px-0 md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl"
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
                <div className="fade-section-button fade-section-button2 mt-6 flex items-center justify-center space-x-2 rounded-3xl bg-purple-800 px-4 py-4 text-sm font-bold hover:bg-zinc-400 hover:text-purple-800 sm:mt-7 sm:px-5 sm:py-5 sm:text-base md:mt-8 md:px-6 md:py-7 md:text-base lg:mt-8 lg:px-6 lg:py-7 lg:text-base xl:mt-8 xl:px-6 xl:py-7 xl:text-base 2xl:mt-8 2xl:px-6 2xl:py-7 2xl:text-base">
                  <p>Conheça meu trabalho</p>
                  <div>
                    <GoArrowUpRight className="fade-section-seta fade-section-seta2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8" />
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>

      <div className="fade-section z-40 bg-gradient-to-r from-slate-50 via-slate-300 to-slate-50 py-6 sm:py-8 md:py-10 lg:py-10 xl:py-10 2xl:py-10">
        <Marquee gradient={true} speed={50} gradientColor="#F8F8F8">
          <span className="mx-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
            <span className="text-purple-800">Vários</span> clientes satisfeitos
          </span>
          <span>
            <BsOpencollective className="h-5 w-5 animate-spin text-purple-800 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8" />
          </span>
          <span className="mx-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
            <span className="text-purple-800">Muitos</span> projetos
            consolidados
          </span>
          <span>
            <BsOpencollective className="h-5 w-5 animate-spin text-purple-800 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8" />
          </span>
          <span className="mx-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
            <span className="text-purple-800">4+</span> anos de experiência
          </span>
          <span>
            <BsOpencollective className="h-5 w-5 animate-spin text-purple-800 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8" />
          </span>
        </Marquee>
      </div>

      <div className="fade-section relative z-40 flex min-h-screen w-full flex-col items-center bg-gradient-to-t from-slate-50 via-slate-300 to-slate-50 py-10 sm:py-16 md:py-20 lg:py-20 xl:py-20 2xl:py-20">
        <div className="sm:mt-15 mt-10 w-[90%] sm:w-[85%] md:mt-20 md:w-[80%] lg:mt-20 lg:w-[80%] xl:mt-20 xl:w-[80%] 2xl:mt-20 2xl:w-[80%]">
          <BiSolidPlaneAlt className="mb-3 h-8 w-8 animate-pulse text-purple-800 sm:mb-4 sm:h-9 sm:w-9 md:mb-4 md:h-10 md:w-10 lg:mb-4 lg:h-10 lg:w-10 xl:mb-4 xl:h-10 xl:w-10 2xl:mb-4 2xl:h-10 2xl:w-10" />
          <h2 className="ml-3 text-lg text-zinc-500 sm:ml-4 sm:text-xl md:ml-5 md:text-xl lg:ml-5 lg:text-xl xl:ml-5 xl:text-xl 2xl:ml-5 2xl:text-xl">
            Eleve o nível do seu négocio.
          </h2>
          <h1 className="mt-4 text-4xl font-bold text-black sm:mt-5 sm:text-5xl md:mt-6 md:text-6xl lg:mt-6 lg:text-7xl xl:mt-6 xl:text-7xl 2xl:mt-6 2xl:text-7xl">
            Serviços:
          </h1>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-7 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-14 lg:flex lg:space-x-9 xl:mt-14 xl:flex xl:space-x-9 2xl:mt-14 2xl:flex 2xl:space-x-9">
            <div className="fade-section-bloco1 flex-1">
              <div className="sm:h-18 sm:w-18 flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-20 xl:w-20 2xl:h-20 2xl:w-20">
                <GoGear className="fade-section-gear h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 xl:h-16 xl:w-16 2xl:h-16 2xl:w-16" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-black sm:mt-5 sm:text-2xl md:mt-6 md:text-2xl lg:mt-6 lg:text-2xl xl:mt-6 xl:text-2xl 2xl:mt-6 2xl:text-2xl">
                Sistemas
              </h3>
              <p className="mt-3 text-sm font-semibold text-zinc-500 sm:mt-4 sm:text-base md:mt-4 md:text-base lg:mt-4 lg:text-base xl:mt-4 xl:text-base 2xl:mt-4 2xl:text-base">
                Transformamos problemas complexos em soluções simples e
                eficientes. Desenvolvemos sistemas personalizados para resolver
                os desafios reais do seu negócio.
              </p>
            </div>
            <div className="fade-section-bloco2 flex-1">
              <div className="sm:h-18 sm:w-18 flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-20 xl:w-20 2xl:h-20 2xl:w-20">
                <PiShoppingCartThin className="fade-section-cart h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 xl:h-16 xl:w-16 2xl:h-16 2xl:w-16" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-black sm:mt-5 sm:text-2xl md:mt-6 md:text-2xl lg:mt-6 lg:text-2xl xl:mt-6 xl:text-2xl 2xl:mt-6 2xl:text-2xl">
                Lojas Virtuais
              </h3>
              <p className="mt-3 text-sm font-semibold text-zinc-500 sm:mt-4 sm:text-base md:mt-4 md:text-base lg:mt-4 lg:text-base xl:mt-4 xl:text-base 2xl:mt-4 2xl:text-base">
                Criamos e-commerce modernos, rápidos e pensados para vender.
                Layouts responsivos, integração com meios de pagamento e suporte
                completo para você focar no que importa: vender.
              </p>
            </div>
            <div className="fade-section-bloco3 flex-1">
              <div className="sm:h-18 sm:w-18 flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-20 xl:w-20 2xl:h-20 2xl:w-20">
                <IoIosLaptop className="fade-section-notebook h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 xl:h-16 xl:w-16 2xl:h-16 2xl:w-16" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-black sm:mt-5 sm:text-2xl md:mt-6 md:text-2xl lg:mt-6 lg:text-2xl xl:mt-6 xl:text-2xl 2xl:mt-6 2xl:text-2xl">
                Sites
              </h3>
              <p className="mt-3 text-sm font-semibold text-zinc-500 sm:mt-4 sm:text-base md:mt-4 md:text-base lg:mt-4 lg:text-base xl:mt-4 xl:text-base 2xl:mt-4 2xl:text-base">
                Sites institucionais com design estratégico, performance
                impecável e foco em conversão. Do conceito à publicação,
                entregamos presença digital com impacto.
              </p>
            </div>
            <div className="fade-section-bloco4 flex-1">
              <div className="sm:h-18 sm:w-18 flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-b from-purple-800 to-purple-400 shadow-2xl md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-20 xl:w-20 2xl:h-20 2xl:w-20">
                <FaRobot className="fade-section-robot h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 xl:h-16 xl:w-16 2xl:h-16 2xl:w-16" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-black sm:mt-5 sm:text-2xl md:mt-6 md:text-2xl lg:mt-6 lg:text-2xl xl:mt-6 xl:text-2xl 2xl:mt-6 2xl:text-2xl">
                Automações com IA
              </h3>
              <p className="mt-3 text-sm font-semibold text-zinc-500 sm:mt-4 sm:text-base md:mt-4 md:text-base lg:mt-4 lg:text-base xl:mt-4 xl:text-base 2xl:mt-4 2xl:text-base">
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
        className="fade-section relative flex w-full flex-col items-center bg-black py-8 sm:py-10 md:py-12 lg:py-16 xl:py-16 2xl:py-16"
        id="Projetos"
      >
        <div className="mb-4 w-full pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-20 2xl:pl-20">
          <h1 className="mt-4 bg-gradient-to-b from-purple-800 to-purple-400 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:mt-5 sm:text-4xl md:mt-6 md:text-5xl lg:mt-6 lg:text-6xl xl:mt-6 xl:text-6xl 2xl:mt-6 2xl:text-6xl">
            Projetos:
          </h1>
        </div>
        <div className="w-full">
          <div className="flex-1">
            <div className="flex h-[50vh] w-full items-center justify-center border border-zinc-800 sm:h-[60vh] md:h-[70vh] lg:h-[85vh] xl:h-[85vh] 2xl:h-[85vh]">
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
          <div className="flex h-auto flex-col gap-0 sm:h-auto sm:flex-col sm:gap-0 md:h-[50vh] md:flex-row md:gap-0 lg:h-[50vh] lg:flex-row lg:gap-0 xl:h-[50vh] xl:flex-row xl:gap-0 2xl:h-[50vh] 2xl:flex-row 2xl:gap-0">
            <div className="h-[40vh] flex-1 border border-zinc-800 sm:h-[45vh] md:h-full lg:h-full xl:h-full 2xl:h-full">
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
            <div className="h-[40vh] flex-1 border border-zinc-800 sm:h-[45vh] md:h-full lg:h-full xl:h-full 2xl:h-full">
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
              className="h-[40vh] flex-1 cursor-pointer border border-zinc-800 sm:h-[45vh] md:h-full lg:h-full xl:h-full 2xl:h-full"
            >
              <div
                className="fade-section-button fade-section-button2 flex h-full w-full flex-col items-center justify-center space-y-2 rounded-lg bg-purple-800 sm:flex-col sm:space-y-2 md:flex-row md:space-x-2 md:space-y-0 lg:flex-row lg:space-x-2 lg:space-y-0 xl:flex-row xl:space-x-2 xl:space-y-0 2xl:flex-row 2xl:space-x-2 2xl:space-y-0"
                onMouseEnter={() => {
                  initButtonProjetos();
                }}
                onMouseLeave={() => {
                  exitButtonProjetos();
                }}
              >
                <h2 className="text-center text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
                  Ver mais Projetos
                </h2>
                <div>
                  <GoArrowUpRight className="fade-section-seta3 fade-section-seta4 h-6 w-6 text-zinc-400 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8" />
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
        className="relative z-40 flex w-full justify-center bg-gradient-to-t from-slate-50 via-slate-300 to-slate-50 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20 2xl:py-20"
        id="Contato"
      >
        <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[80%]">
          <div className="mt-12 flex items-end text-3xl font-bold text-black sm:mt-16 sm:text-4xl md:mt-20 md:text-5xl lg:mt-24 lg:text-5xl xl:mt-24 xl:text-5xl 2xl:mt-24 2xl:text-5xl">
            <div className="mr-2 h-4 w-4 rounded-full bg-purple-800 sm:mr-3 sm:h-5 sm:w-5 md:mr-3 md:h-5 md:w-5 lg:mr-3 lg:h-5 lg:w-5 xl:mr-3 xl:h-5 xl:w-5 2xl:mr-3 2xl:h-5 2xl:w-5"></div>
            Como funciona:
          </div>
          <p className="mb-12 mt-4 w-full text-base font-semibold text-zinc-500 sm:mb-16 sm:mt-5 sm:w-[80%] sm:text-lg md:mb-20 md:mt-5 md:w-[70%] md:text-lg lg:mb-20 lg:mt-5 lg:w-[50%] lg:text-lg xl:mb-20 xl:mt-5 xl:w-[50%] xl:text-lg 2xl:mb-20 2xl:mt-5 2xl:w-[50%] 2xl:text-lg">
            Por trás de toda solução de impacto, existe um processo inteligente.
            Estruturado o suficiente para garantir resultado, flexível o
            bastante para evoluir com você.
          </p>
          {dataComoFunciona.map((item, index) => (
            <div
              key={index}
              className="fade-section flex w-full flex-col items-start space-y-6 border-y-2 border-purple-200 py-10 sm:flex-col sm:items-start sm:space-y-6 sm:py-12 md:flex-row md:items-center md:space-x-6 md:space-y-0 md:py-16 lg:flex-row lg:items-center lg:space-x-10 lg:space-y-0 lg:py-20 xl:flex-row xl:items-center xl:space-x-10 xl:space-y-0 xl:py-20 2xl:flex-row 2xl:items-center 2xl:space-x-10 2xl:space-y-0 2xl:py-20"
            >
              <div className="flex-2 flex w-full flex-col space-y-3 sm:w-full sm:flex-col sm:space-y-3 md:w-auto md:flex-row md:space-x-4 md:space-y-0 lg:w-auto lg:flex-row lg:space-x-4 lg:space-y-0 xl:w-auto xl:flex-row xl:space-x-4 xl:space-y-0 2xl:w-auto 2xl:flex-row 2xl:space-x-4 2xl:space-y-0">
                <div className="ml-0 flex w-full flex-1 items-center justify-center rounded-xl border border-purple-800 px-3 py-1 text-sm text-zinc-500 shadow-md shadow-purple-800 sm:ml-0 sm:w-full sm:text-base md:ml-6 md:w-48 md:text-base lg:ml-10 lg:w-48 lg:text-base xl:ml-10 xl:w-48 xl:text-base 2xl:ml-10 2xl:w-48 2xl:text-base">
                  {item.titleButon}
                </div>
                <div className="flex flex-1 items-center justify-center text-xl text-zinc-400 sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
                  {item.number}
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start justify-center">
                <h3 className="mflex items-end text-lg font-semibold text-purple-800 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
                  {item.title}
                </h3>
                <ul className="mt-3 flex flex-col space-y-1 text-sm text-zinc-500 sm:mt-4 sm:text-base md:mt-4 md:text-base lg:mt-4 lg:text-base xl:mt-4 xl:text-base 2xl:mt-4 2xl:text-base">
                  <li className="flex items-start space-x-2">
                    <AiOutlineCheck className="mr-1 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-transparent text-purple-800 shadow-lg shadow-purple-800 sm:mr-2 sm:h-5 sm:w-5 md:mr-2 md:h-5 md:w-5 lg:mr-2 lg:h-5 lg:w-5 xl:mr-2 xl:h-5 xl:w-5 2xl:mr-2 2xl:h-5 2xl:w-5" />
                    <div>
                      <span className="pr-2 font-semibold text-black sm:pr-3 md:pr-4 lg:pr-4 xl:pr-4 2xl:pr-4">
                        {item.tagUl1}
                      </span>
                      {item.ul1}
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AiOutlineCheck className="mr-1 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-transparent text-purple-800 shadow-lg shadow-purple-800 sm:mr-2 sm:h-5 sm:w-5 md:mr-2 md:h-5 md:w-5 lg:mr-2 lg:h-5 lg:w-5 xl:mr-2 xl:h-5 xl:w-5 2xl:mr-2 2xl:h-5 2xl:w-5" />
                    <div>
                      <span className="pr-2 font-semibold text-black sm:pr-3 md:pr-4 lg:pr-4 xl:pr-4 2xl:pr-4">
                        {item.tagUl2}
                      </span>{" "}
                      {item.ul2}
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AiOutlineCheck className="mr-1 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-transparent text-purple-800 shadow-lg shadow-purple-800 sm:mr-2 sm:h-5 sm:w-5 md:mr-2 md:h-5 md:w-5 lg:mr-2 lg:h-5 lg:w-5 xl:mr-2 xl:h-5 xl:w-5 2xl:mr-2 2xl:h-5 2xl:w-5" />
                    <div>
                      <span className="pr-2 font-semibold text-black sm:pr-3 md:pr-4 lg:pr-4 xl:pr-4 2xl:pr-4">
                        {item.tagUl3}
                      </span>{" "}
                      {item.ul3}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-40 flex h-auto w-full justify-center py-8 sm:h-[60vh] sm:py-0 md:h-[70vh] lg:h-[80vh] xl:h-[80vh] 2xl:h-[80vh]">
        <div className="flex w-[90%] flex-col space-y-8 sm:w-[85%] sm:flex-col sm:space-y-8 md:w-[80%] md:flex-row md:space-x-6 md:space-y-0 lg:w-[80%] lg:flex-row lg:space-x-8 lg:space-y-0 xl:w-[80%] xl:flex-row xl:space-x-8 xl:space-y-0 2xl:w-[80%] 2xl:flex-row 2xl:space-x-8 2xl:space-y-0">
          <div className="relative flex h-auto w-full flex-1 items-center justify-center p-3 sm:h-auto sm:p-4 md:h-full md:p-5 lg:h-full lg:p-5 xl:h-full xl:p-5 2xl:h-full 2xl:p-5">
            <div className="absolute flex space-x-4 lg:flex xl:flex 2xl:flex">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-bl-[50%] rounded-tr-[50%] border-2 border-purple-800 opacity-20 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-52 xl:w-52 2xl:h-52 2xl:w-52"></div>
                <div className="h-12 w-12 rounded-br-[50%] rounded-tl-[50%] border-2 border-purple-800 opacity-20 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-52 xl:w-52 2xl:h-52 2xl:w-52"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-br-[50%] rounded-tl-[50%] border-2 border-purple-800 opacity-20 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-52 xl:w-52 2xl:h-52 2xl:w-52"></div>
                <div className="h-12 w-12 rounded-bl-[50%] rounded-tr-[50%] border-2 border-purple-800 opacity-20 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-52 xl:w-52 2xl:h-52 2xl:w-52"></div>
              </div>
            </div>
            <h1 className="z-40 px-2 text-center text-2xl sm:px-4 sm:text-3xl md:px-6 md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-7xl">
              Chegou a hora de{" "}
              <span className="text-purple-800">construir</span> o
              extraordinário. <span className="text-purple-800">Juntos</span>,
              fazemos acontecer.
            </h1>
          </div>
          <div className="relative flex h-auto flex-1 items-center justify-center sm:h-auto md:h-full lg:h-full xl:h-full 2xl:h-full">
            <div className="absolute -top-5 z-40 h-32 w-32 overflow-hidden rounded-full border-2 border-purple-800 bg-black sm:top-[5%] sm:h-36 sm:w-36 md:top-[15%] md:h-40 md:w-40 lg:top-[15%] lg:h-44 lg:w-44 xl:top-[15%] xl:h-44 xl:w-44 2xl:top-[15%] 2xl:h-44 2xl:w-44">
              <Image alt="logo" src={foto} fill objectFit="cover" />
            </div>
            <div
              className="absolute top-[140px] rounded-2xl bg-zinc-900 px-3 py-2 shadow-lg shadow-transparent hover:shadow-[#ED4895] sm:top-[160px] sm:px-4 sm:py-2 md:top-[50%] md:px-4 md:py-2 lg:top-[50%] lg:px-4 lg:py-2 xl:top-[50%] xl:px-4 xl:py-2 2xl:top-[50%] 2xl:px-4 2xl:py-2"
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
                  width={60}
                  height={60}
                  className="instagram-background absolute -left-3 sm:h-[70px] sm:w-[70px] md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px] xl:h-[90px] xl:w-[90px] 2xl:h-[90px] 2xl:w-[90px]"
                />
                <FiInstagram className="instagram-icon z-40 h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-12 2xl:w-12" />
                <h2 className="pl-3 text-base sm:pl-4 sm:text-lg md:pl-5 md:text-xl lg:pl-5 lg:text-2xl xl:pl-5 xl:text-2xl 2xl:pl-5 2xl:text-2xl">
                  Me chama no <span className="text-[#ED4895]">instagram</span>
                </h2>
              </div>
            </div>
            <div className="absolute top-[120px] flex items-center justify-center space-x-1 sm:top-[140px] sm:space-x-2 md:top-[45%] lg:top-[45%] xl:top-[45%] 2xl:top-[45%]">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <h2 className="text-sm text-purple-800 sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                Disponível para projetos
              </h2>
            </div>
            <div
              className="absolute top-[200px] rounded-2xl bg-zinc-900 px-3 py-2 shadow-lg shadow-transparent hover:shadow-green-400 sm:top-[220px] sm:px-4 sm:py-2 md:top-[65%] md:px-4 md:py-2 lg:top-[65%] lg:px-4 lg:py-2 xl:top-[65%] xl:px-4 xl:py-2 2xl:top-[65%] 2xl:px-4 2xl:py-2"
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
                  width={60}
                  height={60}
                  className="whatsapp-background absolute -left-3 sm:h-[70px] sm:w-[70px] md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px] xl:h-[90px] xl:w-[90px] 2xl:h-[90px] 2xl:w-[90px]"
                />
                <FaWhatsapp className="whatsapp-icon z-40 h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-12 2xl:w-12" />
                <h2 className="pl-3 text-base sm:pl-4 sm:text-lg md:pl-5 md:text-xl lg:pl-5 lg:text-2xl xl:pl-5 xl:text-2xl 2xl:pl-5 2xl:text-2xl">
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
