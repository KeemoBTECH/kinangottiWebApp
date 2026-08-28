"use client";

import NewsEventsList from "./NewsEventsList";

export default function NewsEvents() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">News & Events</h2>
                <NewsEventsList />
            </div>
        </section>
    );
}