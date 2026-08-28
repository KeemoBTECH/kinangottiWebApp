"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Notice {
    _id: string;
    title: string;
    createdAt: string;
}

export default function NoticeBoard() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotices() {
            try {
                const res = await fetch(`${API_URL}/notices/public`);
                const data = await res.json();
                setNotices(data.slice(0, 5)); // Show latest 5
            } catch (error) {
                console.error("Failed to fetch notices:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNotices();
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <Bell className="h-6 w-6 text-emerald-700" />
                    <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-4 uppercase tracking-wide">
                        Notice Board
                    </h3>
                    <Separator className="mb-4" />

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-emerald-700" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notices.map((notice) => (
                                <div
                                    key={notice._id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <Link
                                            href={`/news/${notice._id}`}
                                            className="font-medium text-gray-900 hover:text-emerald-700 transition-colors"
                                        >
                                            {notice.title}
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                            {new Date(notice.createdAt).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/news/${notice._id}`}
                                        className="flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800 whitespace-nowrap"
                                    >
                                        Read More <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))}

                            {notices.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No notices available.</p>
                            )}
                        </div>
                    )}

                    <div className="mt-6 pt-4 border-t text-center">
                        <Link
                            href="/news"
                            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                        >
                            View All Notices →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}