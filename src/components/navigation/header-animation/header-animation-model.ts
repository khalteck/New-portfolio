export const HEADER_LAUNCH_DISTANCE = 180;
export const MARK_INTRO_START = 120;
export const MARK_INTRO_END = 300;
export const MARK_ILLUSTRATION_DISTANCE = 360;
export const markNames = ["ko", "orbit", "spark", "constellation", "circuit", "frame"] as const;

export type HeaderAnimationPhase =
  "merged" | "launching" | "running" | "waiting" | "climbing" | "seated";

export interface HeaderAnimationGeometry {
  characterHeight: number;
  groundY: number;
  markCenterX: number;
  markCenterY: number;
  resumeLeft: number;
  resumeTop: number;
  workStartY: number;
  climbDistance: number;
}

export interface ActorPose {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  scale: number;
}

export interface HeaderAnimationFrame {
  phase: HeaderAnimationPhase;
  direction: 1 | -1;
  man: ActorPose;
  dog: ActorPose;
  manJoints: ManJointPose;
  dogJoints: DogJointPose;
  stride: number;
  dogStride: number;
  lift: number;
  lean: number;
  climbProgress: number;
  sitProgress: number;
}

export interface ManJointPose {
  torso: number;
  pelvisY: number;
  nearShoulder: number;
  nearElbow: number;
  farShoulder: number;
  farElbow: number;
  nearHip: number;
  nearKnee: number;
  nearAnkle: number;
  farHip: number;
  farKnee: number;
  farAnkle: number;
}

export interface DogJointPose {
  bodyY: number;
  bodyRotation: number;
  hindY: number;
  spineScale: number;
  head: number;
  tail: number;
  tailY: number;
  nearFrontShoulder: number;
  nearFrontKnee: number;
  farFrontShoulder: number;
  farFrontKnee: number;
  nearHindHip: number;
  nearHindHock: number;
  farHindHip: number;
  farHindHock: number;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
const smoothstep = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

const getManJointPose = (
  phase: HeaderAnimationPhase,
  cycle: number,
  lean: number,
  climbProgress: number,
  moving: boolean
): ManJointPose => {
  if (phase === "seated") {
    return {
      torso: -3,
      pelvisY: 0,
      nearShoulder: 12,
      nearElbow: -62,
      farShoulder: -5,
      farElbow: -58,
      nearHip: -88,
      nearKnee: 88,
      nearAnkle: 2,
      farHip: -82,
      farKnee: 84,
      farAnkle: -2
    };
  }

  if (phase === "climbing") {
    const reach = smoothstep(climbProgress);
    return {
      torso: mix(5, -8, reach),
      pelvisY: Math.sin(Math.PI * reach) * 1.2,
      nearShoulder: mix(-24, -86, reach),
      nearElbow: mix(-52, -28, reach),
      farShoulder: mix(18, -70, reach),
      farElbow: mix(-62, -38, reach),
      nearHip: mix(-18, -72, reach),
      nearKnee: mix(42, 92, reach),
      nearAnkle: mix(-8, 4, reach),
      farHip: mix(24, -48, reach),
      farKnee: mix(30, 78, reach),
      farAnkle: mix(4, -4, reach)
    };
  }

  if (phase !== "running" || !moving) {
    const crouch = phase === "launching" ? Math.sin(Math.PI * clamp(cycle / (Math.PI * 2))) : 0;
    return {
      torso: lean * 0.45,
      pelvisY: crouch * 0.8,
      nearShoulder: -10,
      nearElbow: -58,
      farShoulder: 12,
      farElbow: -62,
      nearHip: -7 - crouch * 12,
      nearKnee: 14 + crouch * 35,
      nearAnkle: -4,
      farHip: 9 + crouch * 8,
      farKnee: 20 + crouch * 24,
      farAnkle: 3
    };
  }

  const nearSwing = Math.sin(cycle);
  const farSwing = -nearSwing;
  const nearRecovery = Math.max(0, nearSwing);
  const farRecovery = Math.max(0, farSwing);
  return {
    torso: lean * 0.7,
    pelvisY: Math.max(0, Math.cos(cycle * 2)) * 0.9,
    nearShoulder: nearSwing * 27,
    nearElbow: -56 - Math.max(0, -nearSwing) * 24,
    farShoulder: farSwing * 25,
    farElbow: -58 - Math.max(0, -farSwing) * 21,
    nearHip: nearSwing >= 0 ? -nearSwing * 62 : -nearSwing * 48,
    nearKnee: 12 + nearRecovery * 70,
    nearAnkle: -nearSwing * 10 - nearRecovery * 10,
    farHip: farSwing >= 0 ? -farSwing * 59 : -farSwing * 45,
    farKnee: 14 + farRecovery * 64,
    farAnkle: -farSwing * 9 - farRecovery * 9
  };
};

const getDogJointPose = (
  phase: HeaderAnimationPhase,
  cycle: number,
  moving: boolean
): DogJointPose => {
  if (phase === "seated" || phase === "waiting" || phase === "climbing") {
    return {
      bodyY: 0.9,
      bodyRotation: -17,
      hindY: 2.1,
      spineScale: 0.97,
      head: -7,
      tail: 0,
      tailY: 9.4,
      nearFrontShoulder: -3,
      nearFrontKnee: 7,
      farFrontShoulder: 4,
      farFrontKnee: 4,
      nearHindHip: 56,
      nearHindHock: -92,
      farHindHip: 45,
      farHindHock: -82
    };
  }

  if (phase !== "running" || !moving) {
    return {
      bodyY: 0.4,
      bodyRotation: 0,
      hindY: 0,
      spineScale: 1,
      head: -2,
      tail: 58,
      tailY: 0,
      nearFrontShoulder: -8,
      nearFrontKnee: 18,
      farFrontShoulder: 10,
      farFrontKnee: 24,
      nearHindHip: 10,
      nearHindHock: -22,
      farHindHip: -8,
      farHindHock: -16
    };
  }

  const reach = Math.sin(cycle);
  const opposite = -reach;
  const compression = Math.abs(Math.cos(cycle));
  return {
    bodyY: compression * 0.55,
    bodyRotation: -compression * 1.5,
    hindY: 0,
    spineScale: 1 + compression * 0.035,
    head: -compression * 3,
    tail: reach * 7,
    tailY: 0,
    nearFrontShoulder: -reach * 38,
    nearFrontKnee: 14 + Math.max(0, -reach) * 48,
    farFrontShoulder: -opposite * 34,
    farFrontKnee: 18 + Math.max(0, -opposite) * 42,
    nearHindHip: opposite * 34,
    nearHindHock: -18 - Math.max(0, reach) * 48,
    farHindHip: reach * 31,
    farHindHock: -20 - Math.max(0, opposite) * 42
  };
};

const launchPose = (
  progress: number,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  height: number,
  arcScale: number,
  rotation: number
): ActorPose => {
  const eased = smoothstep(progress);
  return {
    x: mix(startX, endX, eased),
    y: mix(startY, endY, eased) - Math.sin(Math.PI * progress) * height * arcScale,
    rotation: mix(rotation, 0, eased) + Math.sin(Math.PI * progress) * 5,
    opacity: clamp(progress * 5),
    scale: mix(0.24, 1, smoothstep(clamp(progress * 1.4)))
  };
};

export function getHeaderAnimationFrame(
  scrollPosition: number,
  direction: 1 | -1,
  scrollDelta: number,
  geometry: HeaderAnimationGeometry,
  moving = true
): HeaderAnimationFrame {
  const scrollY = Math.max(0, scrollPosition);
  const characterHeight = Math.max(28, geometry.characterHeight);
  const manWidth = characterHeight * (15 / 42);
  const dogHeight = characterHeight * 0.46;
  const dogWidth = dogHeight * (30 / 19);
  const manGroundY = geometry.groundY - characterHeight;
  const dogGroundY = geometry.groundY - dogHeight;
  const launchStartX = geometry.markCenterX - manWidth * 0.35;
  const launchStartY = geometry.markCenterY - characterHeight * 0.42;
  const dogLaunchStartX = geometry.markCenterX - dogWidth * 0.2;
  const dogLaunchStartY = geometry.markCenterY - dogHeight * 0.5;
  const runStartX = geometry.markCenterX + characterHeight * 0.68;
  const dogRunStartX = geometry.markCenterX - characterHeight * 0.28;
  const dogReverseRunStartX = runStartX - dogWidth - characterHeight * 0.3;
  const manTargetX = geometry.resumeLeft - manWidth * 0.82;
  const dogTargetX = geometry.resumeLeft - dogWidth - characterHeight * 0.4;
  const seatedX = geometry.resumeLeft - manWidth * 0.25;
  const seatedY = geometry.resumeTop - characterHeight * 0.5;
  const launchProgress = clamp(scrollY / HEADER_LAUNCH_DISTANCE);
  const dogLaunchProgress = clamp((scrollY - 22) / (HEADER_LAUNCH_DISTANCE - 22));
  const safeWorkStart = Math.max(HEADER_LAUNCH_DISTANCE + 1, geometry.workStartY);
  const runProgress = smoothstep(
    clamp((scrollY - HEADER_LAUNCH_DISTANCE) / (safeWorkStart - HEADER_LAUNCH_DISTANCE))
  );
  const climbProgress = smoothstep(
    clamp((scrollY - safeWorkStart) / Math.max(1, geometry.climbDistance))
  );
  const speed = clamp(Math.abs(scrollDelta) / 24);
  const lean = direction * speed * 6;

  let phase: HeaderAnimationPhase;
  let man: ActorPose;
  let dog: ActorPose;

  if (scrollY <= 0) {
    phase = "merged";
    man = {
      x: launchStartX,
      y: launchStartY,
      rotation: -18,
      opacity: 0,
      scale: 0.2
    };
    dog = {
      x: dogLaunchStartX,
      y: dogLaunchStartY,
      rotation: -14,
      opacity: 0,
      scale: 0.2
    };
  } else if (scrollY < HEADER_LAUNCH_DISTANCE) {
    phase = "launching";
    man = launchPose(
      launchProgress,
      launchStartX,
      launchStartY,
      runStartX,
      manGroundY,
      characterHeight,
      0.26,
      -18
    );
    dog = launchPose(
      dogLaunchProgress,
      dogLaunchStartX,
      dogLaunchStartY,
      direction === 1 ? dogRunStartX : dogReverseRunStartX,
      dogGroundY,
      dogHeight,
      0.4,
      -14
    );
  } else if (scrollY < safeWorkStart) {
    phase = "running";
    man = {
      x: mix(runStartX, manTargetX, runProgress),
      y: manGroundY,
      rotation: lean,
      opacity: 1,
      scale: 1
    };
    const forwardDogX = mix(dogRunStartX, dogTargetX, runProgress);
    const reverseFormation = smoothstep(clamp((1 - runProgress) / 0.025));
    const reverseDogX = mix(dogTargetX, man.x - dogWidth - characterHeight * 0.3, reverseFormation);
    dog = {
      x: direction === 1 ? forwardDogX : reverseDogX,
      y: dogGroundY,
      rotation: lean * 0.55,
      opacity: 1,
      scale: 1
    };
  } else if (scrollY < safeWorkStart + geometry.climbDistance) {
    phase = climbProgress < 0.035 ? "waiting" : "climbing";
    man = {
      x: mix(manTargetX, seatedX, climbProgress),
      y:
        mix(manGroundY, seatedY, climbProgress) -
        Math.sin(Math.PI * climbProgress) * characterHeight * 0.36,
      rotation: Math.sin(Math.PI * climbProgress) * -8,
      opacity: 1,
      scale: 1
    };
    dog = {
      x: dogTargetX,
      y: dogGroundY,
      rotation: 0,
      opacity: 1,
      scale: 1
    };
  } else {
    phase = "seated";
    man = {
      x: seatedX,
      y: seatedY,
      rotation: 0,
      opacity: 1,
      scale: 1
    };
    dog = {
      x: dogTargetX,
      y: dogGroundY,
      rotation: 0,
      opacity: 1,
      scale: 1
    };
  }

  const strideDistance = Math.max(8, characterHeight * 0.32);
  const strideAngle = (man.x / strideDistance) * Math.PI * 2;
  const dogStrideAngle = (dog.x / Math.max(6, dogHeight * 0.42)) * Math.PI * 2 + Math.PI * 0.35;
  const manJoints = getManJointPose(phase, strideAngle, lean, climbProgress, moving);
  const dogJoints = getDogJointPose(phase, dogStrideAngle, moving);

  return {
    phase,
    direction,
    man,
    dog,
    manJoints,
    dogJoints,
    stride: Math.sin(strideAngle) * direction,
    dogStride: Math.sin(dogStrideAngle) * direction,
    lift: Math.max(0, Math.cos(strideAngle)),
    lean,
    climbProgress,
    sitProgress: phase === "seated" ? 1 : climbProgress
  };
}

export const getClimbDistance = (viewportHeight: number) =>
  Math.min(144, Math.max(96, viewportHeight * 0.14));
