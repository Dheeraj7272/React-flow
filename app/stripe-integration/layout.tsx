
import { loadStripe } from "@stripe/stripe-js";
import "../globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-san">
      <main className="flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-center px-16 bg-whitesm:items-start">
        {children}
      </main>
    </div>
  );
}
