import Image from "next/image";

const partners = [
    { name: "TVET Authority", logo: "/images/tveta.png" },
    { name: "CDACC ", logo: "/images/cdacc.png" },
    { name: "KNEC", logo: "/images/knek.png" },
    { name: "Ministry of Education", logo: "/images/moe.png" },

];

export default function PartnersSection() {
    return (
        <section className="py-12 bg-white border-t">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    Accreditations & Partnerships
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
                    {partners.map((p) => (
                        <div key={p.name} className="flex items-center gap-2">
                            {/* Replace with actual logo images */}
                            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                {p.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}