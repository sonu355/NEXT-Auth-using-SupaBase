import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css"
import { AppUtilsProvider } from "@/context/AppUtils";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App With Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppUtilsProvider>
          <Toaster />
          {children}
        </AppUtilsProvider>
      </body>
    </html>
  );
}
