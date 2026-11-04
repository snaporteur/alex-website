"use client";

import { useRef } from "react";
import { useStage } from "../lib/useStage";
import HomePanel from "./home/HomePanel";
import AboutPanel from "./about/AboutPanel";

/** Scène 3D plein écran : le plan Home devant, le plan About au fond. */
export default function Site() {
  const stageRef = useRef<HTMLDivElement>(null);
  useStage(stageRef);

  return (
    <div className="stage" ref={stageRef}>
      <div className="world" id="world">
        <HomePanel />
        <AboutPanel />
      </div>
    </div>
  );
}
