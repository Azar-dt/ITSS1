import { CustomLocalizationProvider } from "@/providers/localizationProvider";
import React from "react";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "../providers/sessionProvider";
import "./globals.css";

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
          <CustomLocalizationProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
              }}
            />
            {children}
          </CustomLocalizationProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
