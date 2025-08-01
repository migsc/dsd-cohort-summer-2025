import type { Metadata } from "next";
import Providers from "@/providers";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "client",
  description: "client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="grid grid-rows-[auto_1fr]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
