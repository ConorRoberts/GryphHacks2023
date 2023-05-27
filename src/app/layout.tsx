import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "HabitMaker",
    description: "Make habits with the power of AI",
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <div className="min-h-screen">
                        <div className="flex justify-end p-2">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        <div className="flex-1 flex flex-col">{children}</div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Layout;
