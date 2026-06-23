import Image from "next/image";

const WHATSAPP_NUMBER = "5575981414537";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de conversar sobre um projeto de software.",
);

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp — (75) 98141-4537"
      className="fixed bottom-6 right-6 z-40 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
    >
      <Image
        src="/whatsapp.png"
        alt="WhatsApp"
        width={56}
        height={56}
        className="drop-shadow-lg"
      />
    </a>
  );
}
