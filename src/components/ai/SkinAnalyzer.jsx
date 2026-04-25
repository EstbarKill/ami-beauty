"use client";

import { useRef, useState } from "react";
import useSkinAnalysis from "@/hooks/useSkinAnalysis";
import AnalysisModal from "@/components/ui/AnalysisModal";
import { detectFace } from "@/lib/faceDetector";
import { useEffect } from "react";

export default function SkinAnalyzer({ mode }) {
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const loopRef = useRef(false);
  const frameRef = useRef(null);

  const { analyze, result, loading, reset } =
    useSkinAnalysis(videoRef, canvasRef);

  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
      const handleVisibility = () => {
    if (document.hidden) {
      stopCamera();
      setCameraOn(false);
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibility);
  };
  }, []);
if (!navigator.mediaDevices) {
  alert("Tu navegador no soporta cámara. Usa Chrome actualizado.");
}
  // 🎥 ACTIVAR / DESACTIVAR CÁMARA
const toggleCamera = async () => {
  try {
    if (cameraOn) {
      stopCamera();
      setCameraOn(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: false,
    });

    videoRef.current.srcObject = stream;

    await new Promise(resolve => {
      videoRef.current.onloadedmetadata = () => resolve();
    });

    loopRef.current = true;
    setCameraOn(true);

    detectFaceLoop();

  } catch (err) {
    console.error("Error cámara:", err);

    alert("No se pudo acceder a la cámara. Verifica permisos o usa HTTPS.");
  }
};

const stopCamera = () => {
  loopRef.current = false;

  if (frameRef.current) {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }

  const stream = videoRef.current?.srcObject;

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null;
  }
};
  // 👁 DETECCIÓN LIGERA (SIN ANALYZE)
const detectFaceLoop = async () => {
  if (!loopRef.current) return;

  if (!videoRef.current?.srcObject) return;

  try {
    const face = await detectFace(videoRef.current);
    setFaceDetected(!!face);
  } catch (err) {
    console.error("Error real:", err);
    setFaceDetected(false);
  }

  frameRef.current = requestAnimationFrame(detectFaceLoop);
};

  // 📁 SUBIR IMAGEN
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = async () => {
      setPreview(url);

      const res = await analyze(img);

      if (res) {
        setShowModal(true);
      } else {
        alert("No se detectó rostro en la imagen");
      }
    };

    img.src = url;
  };

  // 📸 ANALIZAR CÁMARA
const handleAnalyze = async () => {
  const result = await analyze();
  
  if (!result) {
    alert("No se pudo analizar el rostro");
    return;
  }
    setShowModal(true);
};

  return (
    <div className="space-y-4">

      {/* CONTROLES */}
      <div className="flex gap-2 justify-center">

        {/* MODO UPLOAD */}
        {mode === "upload" && (
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 border border-white/20"
          >
            Subir foto
          </button>
        )}

        {/* MODO CÁMARA */}
        {mode === "camera" && (
          <>
            <button
              onClick={toggleCamera}
              className="px-4 py-2 border border-white/20"
            >
              {cameraOn ? "Desactivar cámara" : "Activar cámara"}
            </button>

            <button
              disabled={!faceDetected}
              onClick={handleAnalyze}
              className="px-4 py-2 bg-amber-400 text-black disabled:opacity-30"
            >
              Analizar
            </button>
          </>
        )}

      </div>

      {/* INPUT FILE */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      {/* VIDEO */}
      {mode === "camera" && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-[320px] mx-auto rounded"
        />
        
      )}

      {/* PREVIEW */}
      {preview && (
        <img
          src={preview}
          className="w-[320px] mx-auto rounded"
        />
      )}

      {/* CANVAS OCULTO */}
      <canvas ref={canvasRef} className="hidden" />

      {/* LOADING */}
      {loading && (
        <p className="text-amber-400 text-center">
          Analizando...
        </p>
      )}

      {/* ESTADO DETECCIÓN */}
      {mode === "camera" && cameraOn && (
        <p className="text-xs text-center text-white/40">
          {faceDetected ? "Rostro detectado ✔" : "Buscando rostro..."}
        </p>
      )}

      {/* MODAL RESULTADO */}
      {showModal && result?.data?.tone && (
        <AnalysisModal
          result={result}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}