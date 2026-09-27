"use client";

import { useEffect, useState } from "react";

type Scene = "paper" | "theatre";

export function SceneToggle() {
  const [scene, setScene] = useState<Scene>("paper");

  useEffect(() => {
    document.documentElement.dataset.scene = scene;
  }, [scene]);

  return (
    <button
      type="button"
      className="toggle meta"
      onClick={() => setScene(scene === "paper" ? "theatre" : "paper")}
    >
      Scene: {scene}
    </button>
  );
}
