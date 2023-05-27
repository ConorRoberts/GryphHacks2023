import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import Navigation from "./Navigation";
import "./globals.css";

export const metadata = {
  title: "HabitMaker",
  description: "Make habits with the power of AI",
};

const inter = Inter({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <div className={clsx(inter.className, "min-h-screen relative flex flex-col")}>
            <Navigation />
            <div className="flex-1 flex flex-col">{children}</div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
};

export default Layout;
