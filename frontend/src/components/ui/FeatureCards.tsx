import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
    {
        title: "Welcome to Kinango TVC",
        description:
            "Kinango Technical & Vocational College is a leading institution dedicated to providing high-quality education and training in various technical and vocational fields. Our mission is to empower students with the skills and knowledge needed to succeed in their chosen careers.",
        image: "/images/home.jpg",
        link: "/programmes",
        cta: "View Programmes",
    },
    {
        title: "Programmes",
        description:
            "Walking with you all the way to create new paths where none exist.",
        image: "/images/programmes.jpeg",
        link: "/programmes",
        cta: "View Programmes",
    },
    {
        title: "Student Life",
        description:
            "Kinango Technical & Vocational College offers a vibrant campus life with numerous activities and opportunities for personal growth.",
        image: "/images/fresher.jpg",
        link: "/campus-life",
        cta: "Read More",
    },
];

export default function FeatureCards() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <CardContent className="p-6 space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-blue-500 text-sky-700 hover:bg-red-900 hover:text-white"
                                >
                                    {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}