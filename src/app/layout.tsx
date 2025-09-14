'use client'
import React from 'react';
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
            {children}
            <Analytics />
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
