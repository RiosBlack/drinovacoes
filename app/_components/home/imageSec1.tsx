"use client";

import Image from "next/image";
import foto from "../../public/foto.png";
import { useEffect, useState } from "react";

export default function ImageSec1() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 6000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado antes do tempo
  }, []);

  return (
    <>
      {show && (
        <Image
          fill
          quality={100}
          style={{ objectFit: "cover", objectPosition: "top" }}
          alt="logo"
          src={foto}
        />
      )}
    </>
  );
}
