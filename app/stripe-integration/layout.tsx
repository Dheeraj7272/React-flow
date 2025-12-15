
import { loadStripe } from "@stripe/stripe-js";
import "../globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-san">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 bg-whitesm:items-start">
        {children}
      </main>
    </div>
  );
}
