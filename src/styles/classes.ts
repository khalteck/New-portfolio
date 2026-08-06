export const sectionShell =
  "relative z-10 mx-auto w-[calc(100%-3rem)] max-w-[90rem] scroll-mt-16 py-[clamp(7rem,13vw,13rem)] md:pl-20 max-md:w-[calc(100%-2rem)]";

export const eyebrowClass =
  "text-[0.7rem] leading-[1.3] font-extrabold tracking-[0.16em] text-accent uppercase";

export const textLink =
  "inline-flex min-h-11 items-center gap-2.5 text-[0.84rem] font-bold tracking-[0.08em] text-copy uppercase no-underline [&_svg]:w-4 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-editorial-out hover:[&_svg]:translate-x-[0.2rem] hover:[&_svg]:translate-y-[0.2rem] focus-visible:[&_svg]:translate-x-[0.2rem] focus-visible:[&_svg]:translate-y-[0.2rem]";

export const actionLinkBase =
  "inline-flex min-h-[3.2rem] items-center justify-center rounded-full border text-[0.72rem] font-extrabold tracking-[0.08em] uppercase no-underline transition-colors duration-200 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-2.5 [&>span]:px-5 [&>span]:py-3.5 [&_svg]:w-4 hover:border-accent-soft hover:bg-accent-soft hover:text-on-accent focus-visible:border-accent-soft focus-visible:bg-accent-soft focus-visible:text-on-accent";

export const actionLinkVariants = {
  primary: "border-accent bg-accent text-on-accent",
  secondary: "border-line-bright bg-transparent text-copy",
  text: "border-transparent bg-transparent text-copy"
} as const;

export const notFoundLayout =
  "relative z-10 mx-auto flex min-h-svh w-[calc(100%-3rem)] max-w-[75rem] flex-col items-start justify-center py-32 max-md:w-[calc(100%-2rem)]";

export const notFoundHeading =
  "my-4 mb-8 max-w-[65rem] font-display text-[clamp(4.5rem,10vw,10rem)] leading-[0.82] tracking-[-0.04em] uppercase";
