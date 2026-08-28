// kinangotti-admin/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    GraduationCap,
    Loader2,
    Mail,
    Lock,
    KeyRound,
    ArrowLeft,
    ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<"credentials" | "otp">("credentials");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [tempToken, setTempToken] = useState("");
    const [countdown, setCountdown] = useState(0);

    async function handleStep1(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/auth/login-step1", { email, password });
            setTempToken(data.tempToken);
            setStep("otp");
            startCountdown(60);
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOTP(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/auth/verify-otp", { tempToken, otp });
            localStorage.setItem("admin_token", data.token);
            localStorage.setItem("admin_user", JSON.stringify(data.admin));
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    }

    async function resendOTP() {
        try {
            await api.post("/auth/resend-otp", { tempToken });
            startCountdown(60);
            setError("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to resend");
        }
    }

    function startCountdown(seconds: number) {
        setCountdown(seconds);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
            {/* Top Logo Section */}
            <div className="mb-8 text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-4">
                    <Image
                        src="/images/fileTitle.png"
                        alt="KTVC Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Kinango Technical</h1>
                <p className="text-sm text-gray-500">And Vocational College</p>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md shadow-lg border-0">
                <CardContent className="p-8">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${step === "credentials"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Credentials
                        </div>
                        <div className="w-6 h-px bg-gray-200" />
                        <div
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${step === "otp"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            <KeyRound className="h-3.5 w-3.5" />
                            Verify OTP
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
                        {step === "credentials" ? "Sign In to Admin" : "Enter OTP Code"}
                    </h2>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        {step === "credentials"
                            ? "Enter your credentials to access the admin panel"
                            : `We sent a 6-digit code to ${email}`}
                    </p>

                    {step === "credentials" ? (
                        <form onSubmit={handleStep1} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="barakakamramba3@gmail.com"
                                        className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        placeholder="Enter your password"
                                        className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Continue"
                                )}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-5">
                            <button
                                type="button"
                                onClick={() => setStep("credentials")}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-700 mb-2"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" /> Back to login
                            </button>

                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                                    6-Digit Verification Code
                                </Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="otp"
                                        type="text"
                                        required
                                        maxLength={6}
                                        placeholder="000000"
                                        className="pl-10 h-11 text-center tracking-[0.5em] font-mono text-lg bg-gray-50 border-gray-200 focus:bg-white"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                                disabled={loading || otp.length !== 6}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Verify & Sign In"
                                )}
                            </Button>

                            <div className="text-center pt-2">
                                {countdown > 0 ? (
                                    <p className="text-sm text-gray-500">
                                        Resend code in <span className="font-mono font-semibold text-emerald-700">{countdown}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={resendOTP}
                                        className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
                                    >
                                        Didn't receive it? Resend OTP
                                    </button>
                                )}
                            </div>
                        </form>
                    )}

                    <Separator className="my-6" />

                    <div className="text-center space-y-2">
                        <p className="text-xs text-gray-400">
                            Protected by two-factor authentication
                        </p>
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Kinango TVC. All rights reserved.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}