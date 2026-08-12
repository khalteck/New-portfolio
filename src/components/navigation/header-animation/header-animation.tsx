import { useCallback, useEffect, useRef, type RefCallback, type RefObject } from "react";
import { Link } from "react-router-dom";
import { DogCharacter } from "./dog-character";
import {
  getClimbDistance,
  getHeaderAnimationFrame,
  markNames,
  MARK_ILLUSTRATION_DISTANCE,
  MARK_INTRO_END,
  MARK_INTRO_START,
  type ActorPose,
  type HeaderAnimationGeometry
} from "./header-animation-model";
import { ManCharacter } from "./man-character";
import { ScrollMorphMark, type MarkElement } from "./scroll-morph-mark";
import "./header-animation.css";

interface HeaderAnimationProps {
  active: boolean;
  headerRef: RefObject<HTMLElement | null>;
  resumeTargetRef: RefObject<HTMLSpanElement | null>;
}

const setNumberProperty = (element: HTMLElement | SVGElement, name: string, value: number) => {
  element.style.setProperty(name, value.toFixed(4));
};

const setPoseProperties = (element: HTMLElement, prefix: string, pose: object) => {
  Object.entries(pose).forEach(([name, value]) => {
    if (typeof value !== "number") return;
    const propertyName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    setNumberProperty(element, `--${prefix}-${propertyName}`, value);
  });
};

const applyActorPose = (
  element: SVGSVGElement,
  pose: ActorPose,
  width: number,
  height: number,
  facing: 1 | -1
) => {
  element.style.width = `${width.toFixed(2)}px`;
  element.style.height = `${height.toFixed(2)}px`;
  element.style.opacity = pose.opacity.toFixed(3);
  element.style.transform = `translate3d(${pose.x.toFixed(2)}px, ${pose.y.toFixed(2)}px, 0) rotate(${pose.rotation.toFixed(2)}deg) scale(${(pose.scale * facing).toFixed(3)}, ${pose.scale.toFixed(3)})`;
  element.dataset.x = pose.x.toFixed(2);
  element.dataset.y = pose.y.toFixed(2);
};

export function HeaderAnimation({ active, headerRef, resumeTargetRef }: HeaderAnimationProps) {
  const stage = useRef<HTMLDivElement>(null);
  const markRoot = useRef<HTMLSpanElement>(null);
  const marks = useRef<Array<MarkElement | null>>([]);
  const man = useRef<SVGSVGElement>(null);
  const dog = useRef<SVGSVGElement>(null);

  const setMarkRef = useCallback(
    (index: number): RefCallback<MarkElement> =>
      (element) => {
        marks.current[index] = element;
      },
    []
  );

  useEffect(() => {
    const stageElement = stage.current;
    const headerElement = headerRef.current;
    const resumeElement = resumeTargetRef.current;
    const markElement = markRoot.current;
    const manElement = man.current;
    const dogElement = dog.current;

    if (
      !stageElement ||
      !headerElement ||
      !resumeElement ||
      !markElement ||
      !manElement ||
      !dogElement
    ) {
      return;
    }

    let frameId = 0;
    let idleTimer = 0;
    let disposed = false;
    let geometry: HeaderAnimationGeometry | null = null;
    let lastScrollY = Math.max(0, window.scrollY);
    let direction: 1 | -1 = 1;
    let moving = false;

    const renderMark = (scrollPosition: number) => {
      let current = 0;
      let next = 0;
      let blend = 0;

      if (scrollPosition > MARK_INTRO_START) {
        if (scrollPosition < MARK_INTRO_END) {
          next = 1;
          blend = (scrollPosition - MARK_INTRO_START) / (MARK_INTRO_END - MARK_INTRO_START);
        } else {
          const sequence = (scrollPosition - MARK_INTRO_END) / MARK_ILLUSTRATION_DISTANCE;
          const sequenceIndex = Math.floor(sequence);
          const illustrationCount = markNames.length - 1;
          current = 1 + (sequenceIndex % illustrationCount);
          next = 1 + ((sequenceIndex + 1) % illustrationCount);
          blend = sequence - sequenceIndex;
        }
      }

      marks.current.forEach((mark, index) => {
        if (!mark) return;
        const opacity = index === current ? 1 - blend : index === next ? blend : 0;
        const scale = 0.82 + opacity * 0.18;
        const rotation = index === current ? -blend * 5 : index === next ? (1 - blend) * 5 : 0;
        mark.style.opacity = opacity.toFixed(3);
        mark.style.transform = `scale(${scale.toFixed(3)}) rotate(${rotation.toFixed(2)}deg)`;
      });

      const dominantIndex = blend >= 0.5 ? next : current;
      markElement.dataset.mark = markNames[dominantIndex];
      markElement.dataset.progress = scrollPosition.toFixed(0);
    };

    const measure = () => {
      const workElement = document.getElementById("work");
      if (!workElement) return;

      const headerBounds = headerElement.getBoundingClientRect();
      const markBounds = markElement.getBoundingClientRect();
      const resumeBounds = resumeElement.getBoundingClientRect();
      const workBounds = workElement.getBoundingClientRect();
      const groundY = Math.max(1, headerBounds.height - 1);
      const markTop = markBounds.top - headerBounds.top;

      geometry = {
        characterHeight: Math.max(28, groundY - markTop),
        groundY,
        markCenterX: markBounds.left - headerBounds.left + markBounds.width / 2,
        markCenterY: markBounds.top - headerBounds.top + markBounds.height / 2,
        resumeLeft: resumeBounds.left - headerBounds.left,
        resumeTop: resumeBounds.top - headerBounds.top,
        workStartY: Math.max(181, window.scrollY + workBounds.top - window.innerHeight * 0.3),
        climbDistance: getClimbDistance(window.innerHeight)
      };
    };

    const render = () => {
      frameId = 0;
      const scrollY = active ? Math.max(0, window.scrollY) : 0;
      const delta = scrollY - lastScrollY;
      if (Math.abs(delta) > 0.1) direction = delta > 0 ? 1 : -1;
      lastScrollY = scrollY;
      renderMark(scrollY);

      if (!active || !geometry) {
        stageElement.dataset.state = "merged";
        stageElement.dataset.direction = "forward";
        manElement.style.opacity = "0";
        dogElement.style.opacity = "0";
        return;
      }

      const animationFrame = getHeaderAnimationFrame(scrollY, direction, delta, geometry, moving);
      const characterHeight = geometry.characterHeight;
      const dogHeight = characterHeight * 0.46;
      const manFacing = animationFrame.phase === "seated" ? -1 : animationFrame.direction;

      stageElement.dataset.state = animationFrame.phase;
      stageElement.dataset.direction = animationFrame.direction === 1 ? "forward" : "reverse";
      stageElement.dataset.facing = manFacing === 1 ? "right" : "left";
      stageElement.dataset.moving = moving ? "true" : "false";
      stageElement.dataset.scroll = scrollY.toFixed(0);
      setNumberProperty(stageElement, "--stride", animationFrame.stride);
      setNumberProperty(stageElement, "--dog-stride", animationFrame.dogStride);
      setNumberProperty(stageElement, "--lift", animationFrame.lift);
      setNumberProperty(stageElement, "--lean", animationFrame.lean);
      setNumberProperty(stageElement, "--climb", animationFrame.climbProgress);
      setNumberProperty(stageElement, "--sit", animationFrame.sitProgress);
      setPoseProperties(stageElement, "man", animationFrame.manJoints);
      setPoseProperties(stageElement, "dog", animationFrame.dogJoints);
      applyActorPose(
        manElement,
        animationFrame.man,
        characterHeight * (15 / 42),
        characterHeight,
        manFacing
      );
      applyActorPose(
        dogElement,
        animationFrame.dog,
        dogHeight * (30 / 19),
        dogHeight,
        animationFrame.direction
      );
    };

    const scheduleRender = () => {
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };

    const scheduleMeasure = () => {
      measure();
      scheduleRender();
    };

    const handleScroll = () => {
      if (!active) return;
      moving = true;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        moving = false;
        stageElement.dataset.moving = "false";
        scheduleRender();
      }, 110);
      scheduleRender();
    };

    const handleVisibility = () => {
      stageElement.dataset.paused = document.hidden ? "true" : "false";
    };

    measure();
    render();
    handleVisibility();
    if (!active) return;

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(headerElement);
    resizeObserver.observe(resumeElement);
    const workElement = document.getElementById("work");
    if (workElement) resizeObserver.observe(workElement);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    document.addEventListener("visibilitychange", handleVisibility);

    void document.fonts?.ready.then(() => {
      if (!disposed) scheduleMeasure();
    });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleMeasure);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearTimeout(idleTimer);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [active, headerRef, resumeTargetRef]);

  return (
    <>
      <Link
        className="relative z-30 inline-flex min-h-11 min-w-11 items-center justify-center no-underline"
        to="/"
        aria-label="Khalid Oyeneye, home"
      >
        <ScrollMorphMark rootRef={markRoot} setMarkRef={setMarkRef} />
      </Link>
      <div
        ref={stage}
        className="header-animation-stage pointer-events-none absolute inset-0 z-20 overflow-hidden"
        aria-hidden="true"
        data-ui="header-animation"
        data-state="merged"
        data-direction="forward"
        data-moving="false"
        data-paused="false"
      >
        <ManCharacter ref={man} />
        <DogCharacter ref={dog} />
      </div>
    </>
  );
}
