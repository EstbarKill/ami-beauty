"use client";

import { useState } from "react";
import { detectFace } from "@/lib/faceDetector";
import { rgbToXyz, xyzToLab } from "@/lib/colorUtils";
import { calculateITA, classifyITA } from "@/lib/ita";

export default function useSkinAnalysis(videoRef, canvasRef) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!videoRef.current) return;

    setLoading(true);

    const face = await detectFace(videoRef.current);

    if (!face) {
      alert("No se detectó rostro");
      setLoading(false);
      return;
    }

    const [x1, y1] = face.topLeft;
    const [x2, y2] = face.bottomRight;

    const width = x2 - x1;
    const height = y2 - y1;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0);

    // ROI (mejilla)
    const sx = x1 + width * 0.2;
    const sy = y1 + height * 0.3;
    const sw = width * 0.6;
    const sh = height * 0.4;

    const data = ctx.getImageData(sx, sy, sw, sh).data;

    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < data.length; i += 4) {
      const pr = data[i];
      const pg = data[i + 1];
      const pb = data[i + 2];

      const brightness = (pr + pg + pb) / 3;

      if (brightness > 30 && brightness < 230) {
        r += pr; g += pg; b += pb; count++;
      }
    }

    if (!count) {
      setLoading(false);
      return;
    }

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    const [x, y, z] = rgbToXyz(r, g, b);
    const [L, a, bLab] = xyzToLab(x, y, z);

    const ita = calculateITA(L, bLab);
    const tone = classifyITA(ita);

    setResult({
      tone,
      ita: ita.toFixed(2),
      lab: { L, a, b: bLab },
      rgb: [r, g, b],
    });

    setLoading(false);
  };

  return { analyze, result, loading };
}