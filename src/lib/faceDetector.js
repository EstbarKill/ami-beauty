let detector = null;

export async function getFaceDetector() {
  if (detector) return detector;

  const tf = await import("@tensorflow/tfjs");
  await import("@tensorflow/tfjs-backend-webgl");

  await tf.setBackend("webgl");
  await tf.ready();

  const faceDetection = await import("@tensorflow-models/face-detection");

  detector = await faceDetection.createDetector(
    faceDetection.SupportedModels.MediaPipeFaceDetector,
    {
      runtime: "tfjs", // 🔥 CLAVE (sin esto se rompe)
      modelType: "short",
    }
  );

  return detector;
}