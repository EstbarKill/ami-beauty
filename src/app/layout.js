import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import { StoreProvider } from "@/context/StoreContext";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <Header />
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}