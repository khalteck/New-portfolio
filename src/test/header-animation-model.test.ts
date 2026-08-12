import { describe, expect, it } from "vitest";
import {
  getClimbDistance,
  getHeaderAnimationFrame,
  type HeaderAnimationGeometry
} from "@/components/navigation/header-animation/header-animation-model";

const geometry: HeaderAnimationGeometry = {
  characterHeight: 42,
  groundY: 59,
  markCenterX: 40,
  markCenterY: 30,
  resumeLeft: 1360,
  resumeTop: 24,
  workStartY: 3200,
  climbDistance: 120
};

describe("header animation model", () => {
  it("moves through the complete forward journey", () => {
    const merged = getHeaderAnimationFrame(0, 1, 0, geometry);
    const launch = getHeaderAnimationFrame(90, 1, 18, geometry);
    const run = getHeaderAnimationFrame(1500, 1, 20, geometry);
    const waiting = getHeaderAnimationFrame(3200, 1, 8, geometry);
    const climb = getHeaderAnimationFrame(3260, 1, 8, geometry);
    const seated = getHeaderAnimationFrame(3320, 1, 8, geometry);

    expect(merged.phase).toBe("merged");
    expect(merged.man.opacity).toBe(0);
    expect(launch.phase).toBe("launching");
    expect(launch.man.y).toBeLessThan(geometry.groundY - geometry.characterHeight);
    expect(run.phase).toBe("running");
    expect(run.man.x).toBeGreaterThan(launch.man.x);
    expect(run.man.x - run.dog.x).toBeGreaterThan(32);
    expect(waiting.phase).toBe("waiting");
    expect(climb.phase).toBe("climbing");
    expect(climb.man.y).toBeLessThan(waiting.man.y);
    expect(seated.phase).toBe("seated");
    expect(seated.man.x).toBeLessThan(geometry.resumeLeft);
    expect(seated.dog.x).toBeLessThan(seated.man.x);
  });

  it("uses the same positions in reverse while changing facing and gait", () => {
    const forward = getHeaderAnimationFrame(1400, 1, 16, geometry);
    const reverse = getHeaderAnimationFrame(1400, -1, -16, geometry);

    expect(reverse.phase).toBe("running");
    expect(reverse.man.x).toBeCloseTo(forward.man.x);
    expect(reverse.dog.x).toBeLessThan(reverse.man.x);
    expect(reverse.direction).toBe(-1);
    expect(reverse.stride).toBeCloseTo(-forward.stride);
    expect(reverse.lean).toBeLessThan(0);
  });

  it("uses articulated elbows, knees, hocks, and a planted braking pose", () => {
    const runningFrames = [720, 1040, 1380, 1760].map((scrollPosition) =>
      getHeaderAnimationFrame(scrollPosition, 1, 18, geometry, true)
    );
    const braking = getHeaderAnimationFrame(1380, 1, 0, geometry, false);

    expect(
      Math.max(
        ...runningFrames.flatMap((frame) => [frame.manJoints.nearKnee, frame.manJoints.farKnee])
      )
    ).toBeGreaterThan(50);
    for (const frame of runningFrames) {
      expect(frame.manJoints.nearElbow).toBeLessThanOrEqual(-56);
      expect(frame.manJoints.farElbow).toBeLessThanOrEqual(-58);
      expect(frame.dogJoints.nearFrontShoulder).not.toBeCloseTo(frame.dogJoints.nearHindHip);
      expect(frame.dogJoints.nearFrontKnee).not.toBeCloseTo(frame.dogJoints.nearHindHock);
    }
    expect(
      Math.max(
        ...runningFrames.flatMap((frame) => [-frame.manJoints.nearHip, -frame.manJoints.farHip])
      )
    ).toBeGreaterThan(58);

    expect(braking.manJoints.nearHip).toBe(-7);
    expect(braking.manJoints.nearKnee).toBe(14);
    expect(braking.dogJoints.spineScale).toBe(1);
    expect(braking.dogJoints.hindY).toBe(0);
    expect(braking.dogJoints.tail).toBe(58);
    expect(braking.dogJoints.tailY).toBe(0);
    for (const frame of runningFrames)
      expect(Math.abs(frame.dogJoints.tail)).toBeLessThanOrEqual(7);
  });

  it("locks the seated thighs while bending the knees and folding the dog into a sit", () => {
    const seated = getHeaderAnimationFrame(3400, 1, 0, geometry, false);

    expect(seated.phase).toBe("seated");
    expect(seated.manJoints.nearHip).toBeCloseTo(-88);
    expect(seated.manJoints.nearKnee).toBeCloseTo(88);
    expect(seated.manJoints.farHip).toBeCloseTo(-82);
    expect(seated.manJoints.farKnee).toBeCloseTo(84);
    expect(seated.dogJoints.bodyRotation).toBeLessThan(-10);
    expect(seated.dogJoints.nearHindHip).toBeGreaterThan(45);
    expect(seated.dogJoints.nearHindHock).toBeLessThan(-80);
    expect(seated.dogJoints.nearFrontKnee).toBeLessThan(10);
    expect(seated.dogJoints.tail).toBe(0);
    expect(seated.dogJoints.tailY).toBeGreaterThan(9);
  });

  it("clamps responsive timing and tolerates an early work landmark", () => {
    expect(getClimbDistance(400)).toBe(96);
    expect(getClimbDistance(800)).toBeCloseTo(112);
    expect(getClimbDistance(2000)).toBe(144);

    const earlyGeometry = { ...geometry, workStartY: 80 };
    expect(getHeaderAnimationFrame(180, 1, 10, earlyGeometry).phase).toBe("running");
    expect(getHeaderAnimationFrame(182, 1, 10, earlyGeometry).phase).toBe("waiting");
  });
});
