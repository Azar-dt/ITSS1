import { Toaster } from "react-hot-toast";
import "./globals.css";
import React from "react";
import { NextAuthProvider } from "../providers/sessionProvider";

export const metadata = {
  title: "Sakura Bike",
  description: "By Exodia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
            }}
          />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
