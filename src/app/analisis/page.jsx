"use client";

import { useRef, useState } from "react";
import useFaceDetection from "@/hooks/useFaceDetection";

export default function AnalisisPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const face = useFaceDetection(videoRef);

  const [status, setStatus] = useState("idle");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setStatus("streaming");
    } catch (err) {
      console.error(err);
    }
  };

  const analyze = () => {
    if (!face) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const box = face.box;

    const x = box.xMin;
    const y = box.yMin;
    const w = box.width;
    const h = box.height;

    const imageData = ctx.getImageData(x, y, w, h);

    console.log("PIXELS:", imageData);

    setStatus("done");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Detector Facial IA</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: 400 }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div style={{ marginTop: 20 }}>
        {status === "idle" && (
          <button onClick={startCamera}>Activar cámara</button>
        )}

        {status === "streaming" && (
          <button onClick={analyze} disabled={!face}>
            Analizar
          </button>
        )}

        {!face && status === "streaming" && <p>Buscando rostro...</p>}
        {face && <p>Rostro detectado ✅</p>}
      </div>
    </div>
  );
}