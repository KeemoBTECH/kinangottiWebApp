import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function CTASection() {
    return (
        <section className="py-16 bg-red-900 text-white">
            <div className="container mx-auto px-4 text-center space-y-6">
                <p className="text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                    Join Kinango Technical & Vocational College today and embark on a journey of learning, growth, and success. Explore our diverse programmes, engage in vibrant campus life, and take advantage of our student loans and scholarships to make your educational dreams a reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/apply">
                        <Button className="bg-white text-emerald-900 hover:bg-gray-100 px-8 py-3 font-semibold">
                            Apply for Admission
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-3"
                    >
                        Student Loans & Scholarships
                    </Button>
                </div>
            </div>
        </section>
    );
}