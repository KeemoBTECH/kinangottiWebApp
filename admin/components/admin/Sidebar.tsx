"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Bell,
    Calendar,
    Users,
    Settings,
    LogOut,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/notices", label: "Notice Board", icon: Bell },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/applications", label: "Applications", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    // Extra safety: if no token, sidebar shouldn't render anyway
    // but this catches edge cases
    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token && pathname !== "/login") {
            router.replace("/login");
        }
    }, [pathname, router]);

    function logout() {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        window.location.href = "/login";
    }

    return (
        <aside className="w-64 bg-emerald-900 text-white h-screen fixed left-0 top-0 flex flex-col z-50">
            <div className="p-6 border-b border-emerald-800">
                <div className="flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-emerald-400" />
                    <div>
                        <h1 className="font-bold text-lg leading-tight">KTVC Admin</h1>
                        <p className="text-xs text-emerald-300">Management Panel</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-emerald-800 text-white"
                                : "text-emerald-100 hover:bg-emerald-800/50 hover:text-white"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-emerald-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-800/50 hover:text-white transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}