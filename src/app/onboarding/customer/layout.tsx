import React, { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-2">
      <Suspense fallback={<div>Loading page content...</div>}>
        {children}
      </Suspense>
    </main>
  );
}
