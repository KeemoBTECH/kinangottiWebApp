"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Users, Calendar, FileText } from "lucide-react";
import api from "@/lib/api";

export default function DashboardPage() {
    const [stats, setStats] = useState({ notices: 0, events: 0, applications: 0, pending: 0 });

    useEffect(() => {
        async function fetchStats() {
            try {
                const [noticesRes, appsRes] = await Promise.all([
                    api.get("/notices"),
                    api.get("/applications"),
                ]);
                setStats({
                    notices: noticesRes.data.length,
                    events: 0, // fetch from events endpoint
                    applications: appsRes.data.length,
                    pending: appsRes.data.filter((a: any) => a.status === "PENDING").length,
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchStats();
    }, []);

    const cards = [
        { title: "Total Notices", value: stats.notices, icon: Bell, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Total Events", value: stats.events, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Applications", value: stats.applications, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Pending Review", value: stats.pending, icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                            <div className={`p-2 rounded-lg ${card.bg}`}>
                                <card.icon className={`h-5 w-5 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">View and manage student applications from the Applications tab.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <a href="/notices/new" className="block text-sm text-emerald-700 hover:underline">+ Post New Notice</a>
                        <a href="/events/new" className="block text-sm text-emerald-700 hover:underline">+ Add New Event</a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}