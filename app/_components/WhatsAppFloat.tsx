import Image from "next/image";

const WHATSAPP_NUMBER = "5575981414537";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, I'm interested in your services.",
);

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp — (75) 98141-4537"
      className="fixed bottom-6 left-6 z-40 cursor-pointer transition-transform hover:scale-105 active:scale-95"
    >
      <span className="wa-float relative inline-flex">
        <span className="wa-float-pulse" aria-hidden="true" />
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={46}
          height={46}
          className="relative z-10 drop-shadow-lg"
        />
      </span>
    </a>
  );
}
