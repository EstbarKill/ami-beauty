import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import CartSidebar from "@/components/ui/CartSidebar";
import Toast from "@/components/ui/Toast";
import { StoreProvider } from "@/context/StoreContext";
import Script from "next/script";

export const metadata = {
  title: "Ami Beauty — Beauty & Cosmetics",
  description:
    "Cosméticos de lujo con análisis de tono de piel mediante inteligencia artificial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
        <head>
    <Script
      src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js"
      strategy="beforeInteractive"
    />
  </head>
      <body>
        <StoreProvider>
          <Header />
          <Navbar />
          {children}
          <Footer />
          <CartSidebar />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
