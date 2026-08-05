import type { ImgHTMLAttributes } from "react";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/helpers/cn";

interface ResponsivePictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  image: ProjectImage;
  eager?: boolean;
}

export function ResponsivePicture({
  image,
  eager = false,
  className,
  ...imageProps
}: ResponsivePictureProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.avifSrcSet ?? image.src} sizes={image.sizes} />
      <source type="image/webp" srcSet={image.webpSrcSet ?? image.webpSrc} sizes={image.sizes} />
      <img
        {...imageProps}
        className={cn("responsive-picture", className)}
        src={image.webpSrc}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={image.sizes}
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}
