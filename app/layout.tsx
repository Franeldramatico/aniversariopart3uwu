import React from 'react';
import type { Metadata } from 'next';
import { Cinzel_Decorative } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aranxita & Fran - Amor Eterno',
  description: 'Una experiencia gótica romántica en 3D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${cinzel.variable} font-cinzel antialiased`}>
        {children}
      </body>
    </html>
  );
}