"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewNoticePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("GENERAL");
    const [published, setPublished] = useState(true);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        try {
            await api.post("/notices", {
                title: formData.get("title"),
                content: formData.get("content"),
                category,
                isPublished: published,
            });
            router.push("/notices");
        } catch (error) {
            alert("Failed to create notice");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-8 max-w-3xl">
            <Link href="/notices" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Notices
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Notice</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" required placeholder="e.g., 12th Graduation Ceremony" />
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
                            <Textarea id="content" name="content" required rows={8} placeholder="Write the full notice content here..." />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Switch id="published" checked={published} onCheckedChange={setPublished} />
                                <Label htmlFor="published" className="cursor-pointer">
                                    {published ? "Published" : "Draft"}
                                </Label>
                            </div>
                            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish Notice"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}