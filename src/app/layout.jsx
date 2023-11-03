import Navbar from "@/components/Navbar.jsx";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className=" text-white h-[calc(100vh-5rem)]">
          {children}
        </div>
      </body>
    </html>
  );
}
