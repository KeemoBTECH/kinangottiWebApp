import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import NewsEventsList from "@/components/ui/NewsEventsList";

export const metadata = {
    title: "News & Events | Kinango TVC",
    description: "Latest news and events from Kinango Technical and Vocational College",
};

export default function NewsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">News & Events</h1>
                    <p className="text-gray-500 mb-8">Stay updated with the latest happenings at Kinango TVC</p>
                    <NewsEventsList showAll />
                </div>
            </main>
            <Footer />
        </>
    );
}