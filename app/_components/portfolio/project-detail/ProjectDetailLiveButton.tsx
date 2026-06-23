import { ExternalLink } from "lucide-react";

type Props = {
  url: string;
};

export default function ProjectDetailLiveButton({ url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--project-cta)] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#B8922A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--project-cta)]"
    >
      Link do projeto
      <ExternalLink className="h-4 w-4" aria-hidden />
    </a>
  );
}
