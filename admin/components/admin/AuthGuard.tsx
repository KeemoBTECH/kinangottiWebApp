"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        const isLoginPage = pathname === "/login";

        if (!token && !isLoginPage) {
            router.replace("/login");
        } else if (token && isLoginPage) {
            router.replace("/dashboard");
        } else {
            setAuthenticated(true);
        }

        setChecking(false);
    }, [pathname, router]);

    // Show nothing while checking (prevents flash of sidebar)
    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Login page doesn't get the sidebar
    if (pathname === "/login") {
        return <>{children}</>;
    }

    // Protected pages get the sidebar layout
    if (!authenticated) {
        return null;
    }

    return <>{children}</>;
}