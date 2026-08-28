import Link from "next/link";
import Image from "next/image";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Academic Calendar", href: "/calendar" },
    { label: "Library", href: "/library" },
    { label: "E-Learning", href: "/e-learning" },
    { label: "Student Portal", href: "/portal" },
];

const schools = [
    "Mechanical Engineering Department",
    "Building Department",
    "Electrical Engineering Department",
    "ICT Department",
    "Business Department"
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/fileTitle.png"
                                alt="Kinango TVC Logo"
                                width={40}
                                height={40}
                            />
                            <span className="text-lg font-bold text-white">KINANGO TVC</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Kinango Technical and Vocational College is a leading institution committed to providing quality education and training in various technical and vocational fields. Our mission is to empower students with the skills and knowledge needed to excel in their careers.

                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-emerald-400">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Schools */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Our Departments</h4>
                        <ul className="space-y-2 text-sm">
                            {schools.map((school) => (
                                <li key={school}>{school}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-emerald-500" />
                                <span>Samburu, Mombasa, Kenya</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-emerald-500" />
                                <span>+254 746 632 243</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-emerald-500" />
                                <span>kinangotti2030@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-gray-800" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>© 2026 Kinango Technical College. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

