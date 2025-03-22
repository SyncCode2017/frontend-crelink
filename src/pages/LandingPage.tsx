import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveAuctions from '../components/LiveAuctions';
import RecentWorks from '../components/RecentWorks';
import Footer from '../components/Footer';
import PublicIPCard from '../components/PublicIPCard';
import BackgroundVideo from '../components/BackgroundVideo';
import { IPItem } from '../types';

const LandingPage: React.FC = () => {
    const [featuredWorks, setFeaturedWorks] = useState<IPItem[]>([]);

    useEffect(() => {
        setFeaturedWorks([
            {
                tokenId: 'IP007',
                title: 'Digital Renaissance',
                category: 'MUSIC',
                imageUrl: 'https://picsum.photos/400/300?random=5',
                isFractionalized: false,
                ownershipPercentage: 100,
                createdAt: new Date('2024-02-20'),
                uri: 'ipfs://QmFeaturedHash1',
                owner: '0x123d35Cc6634C0532925a3b844Bc454e4438f789',
                parentIPs: []
            },
        ]);
    }, []);

    return (
        <div className="relative min-h-screen text-white">
            <BackgroundVideo />
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section with glass effect */}
                <div className="backdrop-blur-sm bg-black/30 py-20">
                    <Hero />
                </div>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-16">
                    {/* Live Auctions Section */}
                    <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-8 mb-16">
                        <LiveAuctions />
                    </div>

                    {/* Recent Works Section */}
                    <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-8 mb-16">
                        <RecentWorks />
                    </div>
                </main>

                {/* Featured Works Section */}
                <section className="py-16 backdrop-blur-sm bg-black/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            Featured Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredWorks.map((work) => (
                                <div key={work.tokenId} className="transform hover:scale-105 transition-transform duration-300">
                                    <PublicIPCard ip={work} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer with glass effect */}
                <div className="backdrop-blur-md bg-black/50">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 