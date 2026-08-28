"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Loader2, Calendar, ImageIcon } from "lucide-react";
import api from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Event {
    _id: string;
    title: string;
    location: string;
    date: string;
    image?: string;
    isPublished: boolean;
    createdAt: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const { data } = await api.get("/events"); // Correct endpoint
            setEvents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteEvent(id: string) {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            await api.delete(`/events/${id}`);
            setEvents(events.filter((e) => e._id !== id));
        } catch (error) {
            alert("Failed to delete event");
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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                    <p className="text-gray-500 mt-1">Manage college events and activities</p>
                </div>
                <Link href="/events/new">
                    <Button className="bg-emerald-700 hover:bg-emerald-800">
                        <Plus className="h-4 w-4 mr-2" /> New Event
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event._id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-48 bg-gray-100">
                            {event.image ? (
                                <img src={`${API_URL.replace('/api', '')}${event.image}`} alt={event.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="h-10 w-10 text-gray-300" />
                                </div>
                            )}
                            {!event.isPublished && (
                                <Badge variant="outline" className="absolute top-3 left-3 bg-white/90">Draft</Badge>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                {event.location && <span className="ml-2">· {event.location}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/events/edit/${event._id}`} className="flex-1">
                                    <Button variant="outline" className="w-full" size="sm">
                                        <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteEvent(event._id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {events.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center text-gray-500">
                        No events yet. Click "New Event" to create one.
                    </CardContent>
                </Card>
            )}
        </div>
    );
}