import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

export const metadata = {
    title: "HabitMaker",
    description: "Make habits with the power of AI",
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
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
