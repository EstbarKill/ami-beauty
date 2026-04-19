let model = null;

export async function getFaceDetector() {
  if (model) return model;

  const tf = await import("@tensorflow/tfjs");
  await import("@tensorflow/tfjs-backend-webgl");

  await tf.setBackend("webgl");
  await tf.ready();

  const blazeface = await import("@tensorflow-models/blazeface");

  model = await blazeface.load();

  return model;
}

export async function detectFace(video) {
  const detector = await getFaceDetector();
  const predictions = await detector.estimateFaces(video, false);

  if (!predictions.length) return null;

  return predictions[0];
}