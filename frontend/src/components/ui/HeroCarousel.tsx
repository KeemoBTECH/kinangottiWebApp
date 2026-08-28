"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
// Use a simple anchor styled like a button instead of Button's asChild prop
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/images/cosmetology.png",
        title: "Cosmetology & Beauty Therapy",
        subtitle:
            "Discover the art of beauty and wellness at Kinango Technical & Vocational College. Our cosmetology program offers hands-on training in hair styling, skincare, makeup artistry, and spa treatments, preparing you for a successful career in the beauty industry.",
        cta: "Read More",
        ctaLink: "/about",
    },
    {
        id: 2,
        image: "/images/building.png",
        title: "Building & Construction Technology",
        subtitle:
            "Build your future with our comprehensive Building & Construction Technology program. Gain practical skills in construction management, structural design, and sustainable building practices, equipping you for a rewarding career in the construction industry.",
        cta: "Learn More",
        ctaLink: "/research",
    },
    {
        id: 3,
        image: "/images/ict.png",
        title: "Information & Communication Technology",
        subtitle:
            "Join our dynamic community of learners and explore the latest in ICT.",
        cta: "Explore ICT",
        ctaLink: "/campus-life",
    },
    {
        id: 4,
        image: "/images/home.jpg",
        title: "Kinango Technical & Vocational College",
        subtitle:
            "Experience excellence in education and innovation at Kinango Technical & Vocational College. Our diverse programs and state-of-the-art facilities empower students to achieve their academic and career goals.",
        cta: "Discover More",
        ctaLink: "/campus-life",
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrent(index);
            setTimeout(() => setIsAnimating(false), 700);
        },
        [isAnimating]
    );

    const next = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length);
    }, [current, goTo]);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image */}
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4 md:px-8 lg:px-12">
                            <div
                                className={`max-w-2xl space-y-6 transition-all duration-700 ${index === current
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                                    }`}
                            >
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-xl">
                                    {slide.subtitle}
                                </p>
                                <a
                                    href={slide.ctaLink}
                                    className="inline-block bg-red-900 hover:bg-red-800 text-white px-8 py-3 text-base font-semibold rounded-sm"
                                >
                                    {slide.cta}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`transition-all duration-300 rounded-full ${index === current
                            ? "w-8 h-2.5 bg-emerald-500"
                            : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slide Counter (optional, Toyota-style) */}
            <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 text-white/70 text-sm font-medium">
                <span className="text-white text-lg">{String(current + 1).padStart(2, "0")}</span>
                <span>/</span>
                <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
        </section>
    );
}