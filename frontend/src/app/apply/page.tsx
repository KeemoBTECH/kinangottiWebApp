"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send, CheckCircle, User, Mail, Phone, BookOpen } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const programmes = [
    "Building Technology",
    "Electrical Engineering",
    "Information Communication Technology (ICT)",
    "Business Studies",
    "Agriculture",
    "Automotive Engineering",
    "Catering & Hospitality",
    "Hairdressing & Beauty Therapy",
    "Plumbing",
    "Masonry",
    "Carpentry & Joinery",
    "Other",
];

export default function ApplyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [programme, setProgramme] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const payload = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            programme,
        };

        try {
            const res = await fetch(`${API_URL}/applications/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Failed to submit application. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="p-8 space-y-4">
                        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-emerald-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
                        <p className="text-gray-600">
                            Thank you for applying to Kinango Technical & Vocational College. We have received your application and will contact you shortly.
                        </p>
                        <Button
                            onClick={() => router.push("/")}
                            className="bg-emerald-700 hover:bg-emerald-800"
                        >
                            Back to Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                        <Image
                            src="/images/fileTitle.png"
                            alt="KTVC Logo"
                            width={60}
                            height={60}
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Online Application</h1>
                    <p className="text-gray-500 mt-2">
                        Fill in the form below to apply for admission at Kinango TVC
                    </p>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg">Student Application Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Row */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            required
                                            placeholder="John"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            required
                                            placeholder="Doe"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Row */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            placeholder="+254 7XX XXX XXX"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Programme */}
                            <div className="space-y-2">
                                <Label htmlFor="programme">Programme of Interest</Label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                    <Select value={programme} onValueChange={setProgramme} required>
                                        <SelectTrigger className="pl-10">
                                            <SelectValue placeholder="Select a programme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {programmes.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-red-900 hover:bg-red-800 text-white font-semibold"
                                disabled={loading || !programme}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <Send className="h-4 w-4 mr-2" />
                                )}
                                {loading ? "Submitting..." : "Submit Application"}
                            </Button>

                            <p className="text-xs text-center text-gray-400">
                                By submitting, you agree to our terms and conditions.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}