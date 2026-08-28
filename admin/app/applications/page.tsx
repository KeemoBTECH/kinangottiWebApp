"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";

interface Application {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    programme: string;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    REVIEWING: "bg-blue-100 text-blue-800",
    ACCEPTED: "bg-emerald-100 text-emerald-800",
    REJECTED: "bg-red-100 text-red-800",
};

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    async function fetchApplications() {
        try {
            const { data } = await api.get("/applications");
            setApplications(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            await api.patch(`/applications/${id}/status`, { status });
            setApplications(applications.map((a) => (a._id === id ? { ...a, status } : a)));
        } catch (error) {
            alert("Failed to update status");
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admission Applications</h1>

            <div className="space-y-4">
                {applications.map((app) => (
                    <Card key={app._id}>
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-lg">
                                            {app.firstName} {app.lastName}
                                        </h3>
                                        <Badge className={statusColors[app.status]}>{app.status}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">{app.email} · {app.phone}</p>
                                    <p className="text-sm text-emerald-700 font-medium">Programme: {app.programme}</p>
                                    <p className="text-xs text-gray-400">
                                        Applied {new Date(app.createdAt).toLocaleDateString("en-GB")}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Update:</span>
                                    <Select value={app.status} onValueChange={(val) => updateStatus(app._id, val)}>
                                        <SelectTrigger className="w-36">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="REVIEWING">Reviewing</SelectItem>
                                            <SelectItem value="ACCEPTED">Accepted</SelectItem>
                                            <SelectItem value="REJECTED">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {applications.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center text-gray-500">
                            No applications received yet.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}