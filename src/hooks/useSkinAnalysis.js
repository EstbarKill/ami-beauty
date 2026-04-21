import { useState } from "react";
import { analyzeSkinAdvanced } from "@/lib/ita";
import { getRecommendations } from "@/lib/recommendProducts";
import { detectFace } from "@/lib/faceDetector";

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

  const face = await detectFace(input);

  if (!face) {
    setResult({ error: "no-face" });
    setLoading(false);
    return null;
  }

  canvas.width = input.videoWidth || input.width;
  canvas.height = input.videoHeight || input.height;

  ctx.drawImage(input, 0, 0);

  const data = await analyzeSkinAdvanced(ctx, canvas, input, face);

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

  return final; // ✅ FIX REAL
};

  const reset = () => {
    setResult(null);
    setLoading(false);
  };

  return { analyze, result, loading, reset };
}