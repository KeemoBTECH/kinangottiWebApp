import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full bg-gray-50">
            <div className="container mx-auto px-4 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Welcome to Our College — Where Knowledge Meets Innovation and Excellence
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Kinango Technical & Vocational College (KTVC) is located in the expansive Kwale County, Samburu Sub-County in Mackinnon Township. The college was born out of the government's unwavering commitment to attain the Sustainable Development Goals. Established in September 2019, the institution has since become synonymous with excellence in training, offering a diverse range of programmes and initiatives tailored to meet the evolving needs of its trainee population.

                        </p>
                        <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 text-base">
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Hero Image */}
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/public/images/ict.pmg"
                            alt="ktvc image"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}