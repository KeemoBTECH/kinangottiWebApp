"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Users, Building2, Eye, Star, ThumbsUp, GraduationCap, BookOpen, Wrench, Utensils, Palette, Briefcase, HardHat, Zap, Monitor, ClipboardList, ExternalLink, FileText, Award, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const aboutLinks = [
    { href: "/about/who-we-are", label: "Who are we", icon: Users, desc: "Our identity & purpose" },
    { href: "/about/history", label: "KTVC History", icon: Building2, desc: "Our journey since 2015" },
    { href: "/about/vision-mission-values", label: "Vision, Mission & Values", icon: Eye, desc: "What drives us forward" },
    { href: "/about/core-values", label: "Core Values", icon: Star, desc: "The beliefs we live by" },
    { href: "/about/why-choose-us", label: "Why Choose Us", icon: ThumbsUp, desc: "Reasons to join KTVC" },
];

const programmeLinks = [
    { href: "/programmes/computing", label: "Computing & Informatics", icon: Monitor },
    { href: "/programmes/electrical", label: "Electrical & Electronics", icon: Zap },
    { href: "/programmes/mechanical", label: "Mechanical & Automation", icon: Wrench },
    { href: "/programmes/building", label: "Building & Civil Engineering", icon: HardHat },
    { href: "/programmes/hospitality", label: "Hospitality & Tourism", icon: Utensils },
    { href: "/programmes/business", label: "Business Studies", icon: Briefcase },
    { href: "/programmes/fashion", label: "Fashion Design & Cosmetology", icon: Palette },
];

const admissionLinks = [
    { href: "/admission", label: "Admission", icon: ClipboardList },
    { href: "https://students.kuccps.net/login/", label: "KUCCPS Portal", icon: ExternalLink, external: true },
    { href: "https://www.helb.co.ke/", label: "HELB Portal", icon: ExternalLink, external: true },
];

const studentLinks = [
    { href: "https://intelmis.tvetauthority.go.ke/", label: "Intelmis - Academic Records", icon: FileText, external: true },
    { href: "https://www.knec-portal.ac.ke/", label: "KNEC Exam Results", icon: Award, external: true },
    { href: "https://www.helb.co.ke/", label: "HELB Loan", icon: DollarSign, external: true },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/fileTitle.png" alt="Kinango TVC Logo" width={40} height={40} />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold leading-tight text-emerald-800">Kinango Technical</span>
                        <span className="text-xs text-emerald-600">And Vocational College</span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-5">
                    <Link href="/" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">Home</Link>

                    {/* About Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors outline-none py-5">
                            About <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 mt-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                            <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">About Kinango TVC</p>
                            </div>
                            <div className="py-2">
                                {aboutLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="flex items-start gap-3 px-5 py-3 hover:bg-emerald-600 group/item transition-colors">
                                        <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-emerald-50 group-hover/item:bg-white/20 flex items-center justify-center transition-colors">
                                            <link.icon className="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-gray-800 group-hover/item:text-white transition-colors">{link.label}</span>
                                            <span className="block text-xs text-gray-500 group-hover/item:text-emerald-100 transition-colors">{link.desc}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Programmes Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors outline-none py-5">
                            Programmes <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 mt-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                            <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Our Programmes</p>
                            </div>
                            <div className="py-2">
                                {programmeLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="flex items-center gap-3 px-5 py-2.5 hover:bg-emerald-600 group/item transition-colors">
                                        <link.icon className="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors" />
                                        <span className="text-sm font-medium text-gray-800 group-hover/item:text-white transition-colors">{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Admission Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors outline-none py-5">
                            Admission <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                            <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Admission</p>
                            </div>
                            <div className="py-2">
                                {admissionLinks.map((link) => (
                                    link.external ? (
                                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-2.5 hover:bg-emerald-600 group/item transition-colors">
                                            <link.icon className="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors" />
                                            <span className="text-sm font-medium text-gray-800 group-hover/item:text-white transition-colors">{link.label}</span>
                                        </a>
                                    ) : (
                                        <Link key={link.href} href={link.href} className="flex items-center gap-3 px-5 py-2.5 hover:bg-emerald-600 group/item transition-colors">
                                            <link.icon className="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors" />
                                            <span className="text-sm font-medium text-gray-800 group-hover/item:text-white transition-colors">{link.label}</span>
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Student Services Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors outline-none py-5">
                            Student Services <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 mt-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                            <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Student Services</p>
                            </div>
                            <div className="py-2">
                                {studentLinks.map((link) => (
                                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-2.5 hover:bg-emerald-600 group/item transition-colors">
                                        <link.icon className="h-4 w-4 text-emerald-600 group-hover/item:text-white transition-colors" />
                                        <span className="text-sm font-medium text-gray-800 group-hover/item:text-white transition-colors">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href="/news" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">News</Link>
                    <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">Contact</Link>

                    <Link href="/apply">
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-sm">Apply Now</Button>
                    </Link>
                </nav>

                {/* Mobile Nav */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
                            <Menu className="h-6 w-6 text-gray-700" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] overflow-y-auto">
                        <div className="flex flex-col gap-4 mt-8">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-700 hover:text-emerald-700">Home</Link>

                            <MobileSection title="About" links={aboutLinks.map(l => ({ ...l, external: false }))} setIsOpen={setIsOpen} />
                            <MobileSection title="Programmes" links={programmeLinks.map(l => ({ ...l, external: false }))} setIsOpen={setIsOpen} />
                            <MobileSection title="Admission" links={admissionLinks} setIsOpen={setIsOpen} />
                            <MobileSection title="Student Services" links={studentLinks} setIsOpen={setIsOpen} />

                            <Link href="/news" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-700 hover:text-emerald-700">News</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-700 hover:text-emerald-700">Contact</Link>

                            <Link href="/apply" onClick={() => setIsOpen(false)}>
                                <Button className="bg-red-900 hover:bg-red-800 w-full mt-4">Apply Now</Button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

function MobileSection({ title, links, setIsOpen }: { title: string; links: any[]; setIsOpen: (v: boolean) => void }) {
    return (
        <div className="space-y-2">
            <span className="text-lg font-medium text-gray-900">{title}</span>
            <div className="pl-4 flex flex-col gap-2 border-l-2 border-emerald-200">
                {links.map((link) => (
                    link.external ? (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="text-sm text-gray-600 hover:text-emerald-700 flex items-center gap-2">
                            <link.icon className="h-4 w-4" /> {link.label}
                        </a>
                    ) : (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-sm text-gray-600 hover:text-emerald-700 flex items-center gap-2">
                            <link.icon className="h-4 w-4" /> {link.label}
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
}