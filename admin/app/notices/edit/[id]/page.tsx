"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface Notice {
    _id: string;
    title: string;
    content: string;
    category: string;
    isPublished: boolean;
}

export default function EditNoticePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [notice, setNotice] = useState<Notice | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [category, setCategory] = useState("GENERAL");
    const [published, setPublished] = useState(true);

    useEffect(() => {
        async function fetchNotice() {
            try {
                const { data } = await api.get(`/notices/${id}`);
                setNotice(data);
                setCategory(data.category);
                setPublished(data.isPublished);
            } catch {
                alert("Failed to load notice");
                router.push("/notices");
            } finally {
                setLoading(false);
            }
        }
        fetchNotice();
    }, [id, router]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData(e.currentTarget);
        try {
            await api.put(`/notices/${id}`, {
                title: formData.get("title"),
                content: formData.get("content"),
                category,
                isPublished: published,
            });
            router.push("/notices");
        } catch {
            alert("Failed to update notice");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
        );
    }

    if (!notice) return null;

    return (
        <div className="p-8 max-w-3xl">
            <Link href="/notices" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Notices
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Edit Notice</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" required defaultValue={notice.title} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GENERAL">General</SelectItem>
                                    <SelectItem value="VACANCY">Vacancy</SelectItem>
                                    <SelectItem value="REMINDER">Reminder</SelectItem>
                                    <SelectItem value="ADMISSION">Admission</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" required rows={8} defaultValue={notice.content} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Switch id="published" checked={published} onCheckedChange={setPublished} />
                                <Label htmlFor="published" className="cursor-pointer">{published ? "Published" : "Draft"}</Label>
                            </div>
                            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800" disabled={saving}>
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Notice"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}