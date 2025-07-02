"use client";
import { useState, useEffect } from "react";
import SplitText from "../animationSplitText";
import RotatingText from "../animationRoatingText";
import FadeContent from "../animationFadeIn";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default function Name() {
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const styleLink =
    "text-gray-600 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:rotate-3 hover:text-gray-200 flex itens-center";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);
    const timer2 = setTimeout(() => {
      setShowText2(true);
    }, 6000);

    return () => (clearTimeout(timer), clearTimeout(timer2)); // Limpa o timer se o componente for desmontado antes do tempo
  }, []);

  return (
    <div className="w-[90%]">
      {showText && (
        <div>
          <SplitText
            text="Olá, Meu nome é Douglas Rios"
            className="text-center text-xl font-semibold text-gray-300"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
      )}
      {showText2 && (
        <FadeContent
          blur={true}
          duration={500}
          easing="ease-out"
          initialOpacity={0}
        >
          <div className="flex items-center text-base font-semibold text-gray-300">
            {"Sou Desenvolvedor"}
            <RotatingText
              texts={["Full Stack", "Full Stack"]}
              mainClassName="ml-2 px-1 sm:px-2 md:px-3 bg-gradient-to-b from-[#68376D] to-[#2f1a32] text-gray-300 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </FadeContent>
      )}
      {showText2 && (
        <FadeContent
          blur={true}
          duration={500}
          easing="ease-out"
          initialOpacity={0}
          className="absolute z-10"
        >
          <h2 className="mt-10 text-5xl font-semibold text-gray-300">
            Criando{" "}
            <span className="inline-block bg-gradient-to-b from-[#68376D] to-[#2f1a32] bg-clip-text text-transparent">
              soluções digitais
            </span>{" "}
            que <br /> conectam, inovam e impactam.
          </h2>
          <div>
            <div className="mt-5 flex items-center space-x-8 text-gray-600">
              <Link
                href={"http://wwww.linkedin.com/in/riosblack"}
                className={styleLink}
              >
                LINKEDIN <MoveUpRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href={"http://www.instagram.com/riosblack"}
                className={styleLink}
              >
                INSTAGRAM <MoveUpRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href={
                  "https://wa.me/5575981414537?text=Ol%C3%A1%20Douglas%2C%20Voc%C3%AA%20poderia%20me%20ajudar%3F"
                }
                className={styleLink}
              >
                WHATSAPP <MoveUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 flex space-x-4 border-t-2 border-gray-600 text-gray-600"></div>
          </div>
        </FadeContent>
      )}
    </div>
  );
}
