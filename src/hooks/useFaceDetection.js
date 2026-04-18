"use client";

import { useEffect, useRef, useState } from "react";
import { getFaceDetector } from "@/lib/faceDetector.js";

export default function useFaceDetection(videoRef) {
  const [face, setFace] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const detector = await getFaceDetector();

      const detect = async () => {
        if (!active) return;

        const video = videoRef.current;

        if (video && video.readyState >= 2) {
          try {
            const faces = await detector.estimateFaces(video);

            if (faces.length > 0) {
              setFace(faces[0]);
            } else {
              setFace(null);
            }
          } catch (err) {
            console.error("Detection error:", err);
          }
        }

        rafRef.current = requestAnimationFrame(detect);
      };

      detect();
    };

    run();

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  return face;
}