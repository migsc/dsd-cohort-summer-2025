import type { Metadata } from "next";
import Providers from "@/providers";

import "../styles/globals.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
      <body suppressHydrationWarning>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
