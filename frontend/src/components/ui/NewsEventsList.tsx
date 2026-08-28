"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace("/api", "");

interface NewsItem {
    _id: string;
    title: string;
    content?: string;
    description?: string;
    image?: string;
    date?: string;
    createdAt: string;
    type: "notice" | "event";
}

export default function NewsEventsList({ showAll = false }: { showAll?: boolean }) {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const [noticesRes, eventsRes] = await Promise.all([
                    fetch(`${API_URL}/notices/public`),
                    fetch(`${API_URL}/events/public`),
                ]);

                const notices = await noticesRes.json();
                const events = await eventsRes.json();

                const combined: NewsItem[] = [
                    ...(Array.isArray(notices) ? notices : []).map((n: any) => ({
                        ...n,
                        type: "notice" as const,
                    })),
                    ...(Array.isArray(events) ? events : []).map((e: any) => ({
                        ...e,
                        type: "event" as const,
                        date: e.date,
                    })),
                ];

                combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setItems(showAll ? combined : combined.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [showAll]);

    function truncate(text: string | undefined, length: number) {
        if (!text) return "";
        return text.length > length ? text.substring(0, length) + "..." : text;
    }

    function getImageUrl(item: NewsItem) {
        if (!item.image) return null;
        if (item.image.startsWith("http")) return item.image;
        return `${BASE_URL}${item.image}`;
    }

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
        );
    }

    if (items.length === 0) {
        return <p className="text-center text-gray-500 py-12">No news or events available.</p>;
    }

    return (
        <div className={`grid gap-6 ${showAll ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"}`}>
            {items.map((item) => {
                const imgUrl = getImageUrl(item);
                return (
                    <Card key={item._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all bg-white">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                            {imgUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={imgUrl} alt={item.title || "News"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                                    <FileText className="h-10 w-10 text-emerald-200" />
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4 space-y-3">
                            <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                {item.title || "Untitled"}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(item.date || item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                                {truncate(item.content || item.description, 120)}
                            </p>
                            <Link href={`/news/${item._id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors pt-1">
                                <FileText className="h-3.5 w-3.5" /> Read More
                            </Link>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}