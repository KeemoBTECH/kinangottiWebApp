"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowLeft, Upload, ImageIcon } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function NewEventPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState(true);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("isPublished", published.toString());

        const token = localStorage.getItem("admin_token");

        try {
            const res = await fetch(`${API_URL}/events`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            router.push("/events");
        } catch (error: any) {
            alert(error.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-8 max-w-3xl">
            <Link href="/events" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Events
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Event Thumbnail</Label>
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mx-auto h-40 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="space-y-2">
                                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <ImageIcon className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <p className="text-sm text-gray-500">Click to upload event image</p>
                                        <p className="text-xs text-gray-400">JPG, PNG, WebP up to 5MB</p>
                                    </div>
                                )}
                                <input
                                    ref={fileRef}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Event Title</Label>
                            <Input id="title" name="title" required placeholder="e.g., Open Day 2026" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Event Date</Label>
                                <Input id="date" name="date" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="e.g., Main Campus Hall" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" required rows={6} placeholder="Describe the event..." />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Switch id="published" checked={published} onCheckedChange={setPublished} />
                                <Label htmlFor="published" className="cursor-pointer">
                                    {published ? "Published" : "Draft"}
                                </Label>
                            </div>
                            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Event"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}