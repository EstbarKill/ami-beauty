import { useState } from "react";
import { analyzeSkinAdvanced } from "@/lib/ita";
import { getRecommendations } from "@/lib/recommendProducts";
import { detectFace } from "@/lib/faceDetector";
import { applyPreprocessing } from "@/lib/preprocess";
import { applyGrayWorld } from "@/lib/colorCorrection";
import { resetCheekHistory } from "@/lib/cheeks";


import { calibrateImageByCard }
from "@/lib/chromaticCalibration";

import { applyChromaticCorrection }
from "@/lib/applyChromaticCorrection";

export default function useSkinAnalysis(videoRef, canvasRef) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const analyze = async (source = null) => {
    setLoading(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const input = source || videoRef.current;

    if (!input) {
      setLoading(false);
      return null;
    }

    function getFaceBoundingBox(landmarks, canvas) {
      const xs = landmarks.map(p => p.x * canvas.width);
      const ys = landmarks.map(p => p.y * canvas.height);

      const minX = Math.max(0, Math.min(...xs));
      const maxX = Math.min(canvas.width, Math.max(...xs));
      const minY = Math.max(0, Math.min(...ys));
      const maxY = Math.min(canvas.height, Math.max(...ys));

      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    }

canvas.width =
  input.videoWidth || input.width;

canvas.height =
  input.videoHeight || input.height;



ctx.drawImage(input, 0, 0);

applyPreprocessing(ctx, canvas);

const face = await detectFace(input);
const bbox = getFaceBoundingBox(
  face,
  canvas
);
if (!face) {
  setLoading(false);
  return null;
}

// corrección secundaria
//applyGrayWorld(ctx, canvas, bbox);

resetCheekHistory();
const data = await analyzeSkinAdvanced(
  ctx,
  canvas,
  input,
  face
);
    if (!data) {
      setLoading(false);
      return null;
    }

    const { matched, interest } = getRecommendations(data);

    const final = {
      data,
      matched,
      interest,
    };
    setResult(final);
    setLoading(false);
    console.log("ANALYSIS RESULT:", final);
    return final; // ✅ FIX REAL
  };

  const reset = () => {
    setResult(null);
    setLoading(false);
  };

  return { analyze, result, loading, reset };
}