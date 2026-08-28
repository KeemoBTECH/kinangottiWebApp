import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace("/api", "");

async function fetchItem(id: string) {
    try {
        let res = await fetch(`${API_URL}/notices/public/${id}`, { cache: "no-store" });
        if (res.ok) {
            const data = await res.json();
            return { ...data, type: "notice" as const };
        }

        res = await fetch(`${API_URL}/events/public/${id}`, { cache: "no-store" });
        if (res.ok) {
            const data = await res.json();
            return { ...data, type: "event" as const };
        }

        return null;
    } catch {
        return null;
    }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
    const item = await fetchItem(params.id);
    if (!item) return notFound();

    const isEvent = item.type === "event";
    const imgUrl = item.image ? (item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image}`) : null;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link href="/">
                        <Button variant="ghost" className="mb-6 pl-0">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                        </Button>
                    </Link>

                    <Card className="overflow-hidden">
                        {imgUrl && (
                            <div className="relative h-64 md:h-80 bg-gray-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imgUrl} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <CardContent className="p-6 md:p-8 space-y-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${isEvent ? "bg-purple-100 text-purple-800" : "bg-emerald-100 text-emerald-800"}`}>
                                {isEvent ? "Event" : "Notice"}
                            </span>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(item.date || item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                                </span>
                                {isEvent && item.location && (
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {item.location}
                                    </span>
                                )}
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {item.content || item.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
}