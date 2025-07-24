export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-2">{children}</main>
  );
}
