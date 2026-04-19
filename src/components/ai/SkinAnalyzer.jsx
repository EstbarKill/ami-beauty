"use client";


import { useRef, useEffect } from "react";
import useSkinAnalysis from "@/hooks/useSkinAnalysis";

export default function SkinAnalyzer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { analyze, result, loading } = useSkinAnalysis(videoRef, canvasRef);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  }, []);

  return (
    <div className="text-center">
      <video ref={videoRef} autoPlay className="mx-auto rounded w-[320px]" />
      <canvas ref={canvasRef} className="hidden" />

      <button onClick={analyze} className="btn-primary mt-4">
        {loading ? "Analizando..." : "Analizar piel"}
      </button>

      {result && (
        <div className="mt-4">
          <p>Tono: {result.tone.label}</p>
          <p>ITA: {result.ita}</p>
          <p>RGB: {result.rgb.join(", ")}</p>
        </div>
      )}
    </div>
  );
}