import { useEffect, useState } from "react";

export const useActiveSection = (sectionIds: readonly string[], activationKey = ""): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    let frameId = 0;
    const updateActiveSection = () => {
      frameId = 0;
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      if (sections.length === 0) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      let nextSection = sections[0]!.id;
      if (scrollTop + viewportHeight >= documentHeight - 2) {
        nextSection = sections.at(-1)?.id ?? nextSection;
      } else if (scrollTop > 2) {
        const activationLine = viewportHeight * 0.3;
        for (const section of sections) {
          if (section.getBoundingClientRect().top > activationLine) break;
          nextSection = section.id;
        }
      }

      setActiveSection((current) => (current === nextSection ? current : nextSection));
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frameId);
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [activationKey, sectionIds]);

  return activeSection;
};
