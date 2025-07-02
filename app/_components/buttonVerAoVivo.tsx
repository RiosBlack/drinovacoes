"use client";

import { ConfettiButton } from "@/components/magicui/confetti";
import { ShineBorder } from "@/components/magicui/shine-border";
import { MoveUpRight } from "lucide-react";
import { useState } from "react";

interface ProjectLinkButtonProps {
  link: string;
}

export default function ButtonVerAoVivo({ link }: ProjectLinkButtonProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleLinkClick = () => {
    // Não previne o evento para deixar o confetti funcionar
    setIsOpening(true);

    // Aguarda a animação do confetti terminar (aproximadamente 1 segundo)
    setTimeout(() => {
      const newWindow = window.open(link, "_blank");

      // Mantém foco na aba atual
      if (newWindow) {
        newWindow.blur();
        window.focus();
      }

      setIsOpening(false);
    }, 2000);
  };

  return (
    <ConfettiButton
      className="relative mt-12 flex items-center overflow-hidden rounded-lg px-4 py-2 font-bold text-white"
      variant={"outline"}
      disabled={isOpening}
    >
      <span onClick={handleLinkClick} className="flex items-center">
        {isOpening ? (
          "Abrindo..."
        ) : (
          <>
            Ver ao vivo
            <MoveUpRight className="ml-2 h-6 w-6" />
          </>
        )}
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      </span>
    </ConfettiButton>
  );
}
