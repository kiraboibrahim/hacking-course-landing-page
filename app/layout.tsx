import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Harmless Hacking",
    description: "Learn ethical hacking from scratch with hands-on CTF challenges and real-world scenarios.",

    icons: {
        icon: [
            { url: "/logo-02-favicon-32.png", sizes: "32x32", type: "image/png" },
            { url: "/logo-02-icon-128.png", sizes: "128x128", type: "image/png" },
        ],
        apple: "/logo-02-icon-512.png",
    },

    openGraph: {
        title: "Harmless Hacking",
        description: "Learn ethical hacking from scratch with hands-on CTF challenges and real-world scenarios.",
        url: "https://harmlesshacking.com",
        siteName: "Harmless Hacking",
        images: [
            {
                url: "/logo-06-social-square.png",
                width: 800,
                height: 800,
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary",
        title: "Harmless Hacking",
        description: "Learn ethical hacking from scratch with hands-on CTF challenges and real-world scenarios.",
        images: ["/logo-06-social-square.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}