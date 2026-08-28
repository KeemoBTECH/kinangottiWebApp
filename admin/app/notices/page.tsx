"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface Notice {
    _id: string;
    title: string;
    category: string;
    isPublished: boolean;
    createdAt: string;
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    async function fetchNotices() {
        try {
            const { data } = await api.get("/notices");
            setNotices(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteNotice(id: string) {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        try {
            await api.delete(`/notices/${id}`);
            setNotices(notices.filter((n) => n._id !== id));
        } catch (error) {
            alert("Failed to delete notice");
        }
    }

    const categoryColors: Record<string, string> = {
        GENERAL: "bg-blue-100 text-blue-800",
        VACANCY: "bg-red-100 text-red-800",
        REMINDER: "bg-amber-100 text-amber-800",
        ADMISSION: "bg-emerald-100 text-emerald-800",
    };

    if (loading) {
        return (
            <div className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Notice Board</h1>
                    <p className="text-gray-500 mt-1">Manage news, updates, and announcements</p>
                </div>
                <Link href="/notices/new">
                    <Button className="bg-emerald-700 hover:bg-emerald-800">
                        <Plus className="h-4 w-4 mr-2" /> New Notice
                    </Button>
                </Link>
            </div>

            <div className="space-y-4">
                {notices.map((notice) => (
                    <Card key={notice._id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-lg text-gray-900">{notice.title}</h3>
                                    <Badge className={categoryColors[notice.category] || "bg-gray-100"}>
                                        {notice.category}
                                    </Badge>
                                    {!notice.isPublished && (
                                        <Badge variant="outline">Draft</Badge>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {new Date(notice.createdAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/notices/edit/${notice._id}`}>
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4 text-gray-600" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" onClick={() => deleteNotice(notice._id)}>
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {notices.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center text-gray-500">
                            No notices yet. Click "New Notice" to create one.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}