"use client";

import { useEffect, useState, useRef } from "react";
import { Users, BookOpen, Award, Calendar } from "lucide-react";

const stats = [
    { icon: Users, value: 10, suffix: "00+", label: "Students Enrolled" },
    { icon: BookOpen, value: 100, suffix: "+", label: "Academic Programmes" },
    { icon: Award, value: 5, suffix: "", label: "Schools & Institutes" },
    { icon: Calendar, value: 70, suffix: "+", label: "Years of Excellence" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, target]);

    return (
        <div ref={ref} className="text-3xl font-bold">
            {count}
            {suffix}
        </div>
    );
}

export default function StatsSection() {
    return (
        <section className="py-16 bg-emerald-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label} className="space-y-3">
                            <stat.icon className="mx-auto h-10 w-10 text-emerald-400" />
                            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                            <div className="text-sm text-emerald-200">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}