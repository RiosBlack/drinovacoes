import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

export default function ProjectDetailGallery({ images, title }: Props) {
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));

  if (uniqueImages.length === 0) return null;

  const [heroImage, ...galleryImages] = uniqueImages;

  return (
    <section className="project-detail-reveal mt-12 md:mt-16">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8e8ed] shadow-sm">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 980px) 100vw, 980px"
        />
      </div>

      {galleryImages.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {galleryImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8e8ed] shadow-sm"
            >
              <Image
                src={image}
                alt={`${title} — imagem ${index + 2}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 480px"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
