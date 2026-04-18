"use client";
import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

export default function SkinAnalyzer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await tf.setBackend("webgl");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    })();
  }, []);

  const analyze = async () => {
    setLoading(true);
    const model = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );

    const faces = await model.estimateFaces(videoRef.current);
    if (!faces.length) {
      alert("No se detectó rostro");
      setLoading(false);
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 300, 300);
    const data = ctx.getImageData(0,0,300,300).data;

    let r=0,g=0,b=0,count=0;
    for(let i=0;i<data.length;i+=4){
      r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++;
    }
    r/=count; g/=count; b/=count;

    const brightness = (r+g+b)/3;
    let tone = "Oscuro";
    if (brightness > 170) tone = "Claro";
    else if (brightness > 100) tone = "Medio";

    setResult({ tone, rgb: [r,g,b] });
    setLoading(false);
  };

  return (
    <div className="text-center">
      <video ref={videoRef} autoPlay width={300} className="mx-auto rounded" />
      <canvas ref={canvasRef} width={300} height={300} className="hidden" />

      <button onClick={analyze} className="btn-primary mt-4">
        {loading ? "Analizando..." : "Analizar piel"}
      </button>

      {result && (
        <div className="mt-4">
          <p>Tono: {result.tone}</p>
          <p>RGB: {result.rgb.map(n=>n.toFixed(0)).join(", ")}</p>
        </div>
      )}
    </div>
  );
}