import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  servicoDescricao: string;
  data: string;
  titleCard: string;
  tagServico: string;
  tagTecnologia: string;
  image: string | StaticImageData;
  onClick?: () => void;
};

export default function CardProject({
  servicoDescricao,
  data,
  tagServico,
  tagTecnologia,
  titleCard,
  image,
  onClick,
}: Props) {
  useEffect(() => {
    const imageScale = gsap.utils.toArray(".image-Scale");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageScale.forEach((el: any) => {
      gsap.fromTo(
        el,
        { scale: 0.5 },
        {
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          ease: "bounce",
        },
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      className="flex h-full w-full cursor-pointer flex-col p-2 hover:bg-zinc-900 sm:p-3 md:p-4 lg:p-4 xl:p-4 2xl:p-4"
      onClick={onClick}
    >
      <div className="space-y-2 p-3 sm:space-y-3 sm:p-6 md:space-y-3 md:p-9 lg:space-y-3 lg:p-9 xl:space-y-3 xl:p-9 2xl:space-y-3 2xl:p-9">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 md:space-x-5 lg:space-x-5 xl:space-x-5 2xl:space-x-5">
          <p className="flex items-center text-sm font-semibold sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
            <MdOutlineArrowRight className="h-5 w-5 text-purple-800 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-7 xl:w-7 2xl:h-7 2xl:w-7" />{" "}
            {tagServico}
            <MdOutlineArrowLeft className="h-5 w-5 text-purple-800 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-7 xl:w-7 2xl:h-7 2xl:w-7" />
          </p>
          <p className="text-sm font-semibold text-zinc-400 sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
            {data}
          </p>
        </div>
        <h1 className="text-lg font-bold text-white sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
          {titleCard}
        </h1>
        <p className="line-clamp-2 text-xs text-zinc-400 sm:line-clamp-3 sm:text-sm md:line-clamp-3 md:text-sm lg:line-clamp-3 lg:text-sm xl:line-clamp-3 xl:text-sm 2xl:line-clamp-3 2xl:text-sm">
          {servicoDescricao}
        </p>
        <p className="text-xs text-zinc-400 sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
          <span className="font-bold text-purple-800">Tec: </span>
          {tagTecnologia}
        </p>
      </div>
      <div className="image-Scale group relative h-full w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={titleCard}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
