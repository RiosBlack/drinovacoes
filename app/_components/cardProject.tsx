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
};

export default function CardProject({
  servicoDescricao,
  data,
  tagServico,
  tagTecnologia,
  titleCard,
  image,
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
    <div className="flex h-full w-full cursor-pointer flex-col p-4 hover:bg-zinc-900">
      <div className="space-y-3 p-9">
        <div className="flex items-center space-x-5">
          <p className="flex items-center font-semibold">
            <MdOutlineArrowRight className="h-7 w-7 text-purple-800" />{" "}
            {tagServico}
            <MdOutlineArrowLeft className="h-7 w-7 text-purple-800" />
          </p>
          <p className="font-semibold text-zinc-400">{data}</p>
        </div>
        <h1 className="text-xl font-bold text-white">{titleCard}</h1>
        <p className="text-sm text-zinc-400">{servicoDescricao}</p>
        <p className="text-sm text-zinc-400">
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
