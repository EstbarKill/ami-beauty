"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import Link from "next/link"

const QRCode = dynamic(() => import("react-qr-code"), {
  ssr: false
})

export default function AISection() {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin + "/analisis")
    }
  }, [])

  return (
    <section className="bg-black text-white text-center p-10">

      <h2 className="text-3xl mb-4">
        Descubre tu tono con IA
      </h2>

      <p className="mb-6">
        Usa tu cámara o escanea desde tu móvil
      </p>

      <Link href="/analisis/page.js">
        <button className="btn-primary mb-6">
          Usar cámara
        </button>
      </Link>

      {url && (
        <div className="flex justify-center bg-white p-4 rounded">
          <QRCode value={url} size={180} />
        </div>
      )}

    </section>
  )
}