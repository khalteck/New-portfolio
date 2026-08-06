import { useEffect, useRef, type ComponentPropsWithoutRef, type PointerEvent } from "react";
import gsap from "gsap";
import { cn } from "@/helpers/cn";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { actionLinkBase, actionLinkVariants } from "@/styles/classes";

type MagneticLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "text";
};

export function MagneticLink({
  children,
  className,
  variant = "primary",
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticLinkProps) {
  const link = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const magneticEnabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!magneticEnabled && link.current) gsap.set(link.current, { x: 0, y: 0 });
  }, [magneticEnabled]);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(event);
    if (!magneticEnabled || !link.current) return;
    const bounds = link.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
    gsap.to(link.current, { x, y, duration: 0.25, ease: "power2.out", overwrite: true });
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event);
    if (!link.current) return;
    if (!magneticEnabled) {
      gsap.set(link.current, { x: 0, y: 0 });
      return;
    }
    gsap.to(link.current, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
  };

  return (
    <a
      {...props}
      ref={link}
      className={cn(actionLinkBase, actionLinkVariants[variant], className)}
      data-cursor="action"
      data-variant={variant}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span>{children}</span>
    </a>
  );
}
