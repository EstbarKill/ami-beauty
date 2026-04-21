let faceMeshInstance = null;

export async function getFaceMesh() {
  if (faceMeshInstance) return faceMeshInstance;

  await loadScript(
    "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js"
  );

  if (!window.FaceMesh) {
    throw new Error("FaceMesh no cargó");
  }

  const faceMesh = new window.FaceMesh({
    locateFile: (file) => {
      // 🚨 FORZAR VERSION NO SIMD (CRÍTICO)
      if (file.includes("simd")) {
        file = file.replace("_simd", "");
      }

      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6,
  });

  faceMeshInstance = faceMesh;
  return faceMeshInstance;
}

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}