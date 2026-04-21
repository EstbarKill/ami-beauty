import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

let faceLandmarker = null;
let runningMode = "VIDEO";
let loading = false;

export async function getFaceLandmarker(mode = "VIDEO") {
  if (faceLandmarker && runningMode === mode) return faceLandmarker;
  if (loading) return faceLandmarker;

  loading = true;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
  );

  runningMode = mode;

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: mode,
    numFaces: 1,
  });
  loading = false;
  return faceLandmarker;
}

export async function detectFace(source) {
  if (!source) return null;

  // 🎥 VIDEO
  if (source instanceof HTMLVideoElement) {
    if (source.readyState !== 4) return null;

    const model = await getFaceLandmarker("VIDEO");

    const now = performance.now();

let res;

const originalError = console.error;

console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("TensorFlow Lite")
  ) {
    return; // 🚫 ignorar log basura
  }
  originalError(...args);
};

try {
  res = model.detectForVideo(source, now);
} finally {
  console.error = originalError;
  
}

    return res?.faceLandmarks?.[0] ?? null;
  }

  // 🖼 IMAGE
  if (
    source instanceof HTMLImageElement ||
    source instanceof HTMLCanvasElement
  ) {
    const model = await getFaceLandmarker("IMAGE");

    const res = model.detect(source);

    return res?.faceLandmarks?.[0] ?? null;
  }

  return ;
}