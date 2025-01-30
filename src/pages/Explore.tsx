import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { IPItem, WorkCategory } from '../types';
import PublicIPCard from '../components/PublicIPCard';


const CATEGORIES: WorkCategory[] = ['MUSIC', 'LYRICS', 'POEM', 'BEATS'];

const ExplorePage: React.FC = () => {
    const [works, setWorks] = useState<IPItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<WorkCategory | 'ALL'>('ALL');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        setIsLoading(true);
        try {
            // Mock data with new fields
            const mockWorks: IPItem[] = [
                {
                    id: 'IP003',
                    title: 'Summer Melody',
                    imageUrl: 'https://picsum.photos/400/300?random=1',
                    category: 'MUSIC',
                    isFractionalized: false,
                    ownershipPercentage: 100,
                    createdAt: new Date('2024-01-20'),
                    approvalTokens: 5,
                    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                    uri: 'ipfs://QmZ9YQrX5Z8Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z',
                    parentIPs: [
                        {
                            id: 'IP001',
                            address: 'ipfs://QmParent4Hash'
                        }
                    ]
                },
                {
                    id: 'IP004',
                    title: 'Urban Poetry',
                    owner: '0x123d35Cc6634C0532925a3b844Bc454e4438f789',
                    imageUrl: 'https://picsum.photos/400/300?random=2',
                    category: 'POEM',
                    isFractionalized: false,
                    ownershipPercentage: 100,
                    createdAt: new Date('2024-02-05'),
                    uri: 'ipfs://QmW8YQrX5Z8Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z',
                    parentIPs: [{
                        id: 'IP001',
                        address: 'ipfs://QmParent1Hash'
                    }]
                },
                {
                    id: 'IP005',
                    title: 'Neon Beats',
                    imageUrl: 'https://picsum.photos/400/300?random=3',
                    category: 'BEATS',
                    isFractionalized: false,
                    ownershipPercentage: 100,
                    createdAt: new Date('2024-02-10'),
                    owner: '0x987d35Cc6634C0532925a3b844Bc454e4438f321',
                    uri: 'ipfs://QmV7YQrX5Z8Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z',
                    parentIPs: [
                        {
                            id: 'IP002',
                            address: 'ipfs://QmParent5Hash'
                        },
                        {
                            id: 'IP003',
                            address: 'ipfs://QmParent6Hash'
                        }
                    ]
                }
            ];
            setWorks(mockWorks);
        } catch (error) {
            console.error('Error fetching works:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredWorks = selectedCategory === 'ALL'
        ? works
        : works.filter(work => work.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <Navbar />
            <div className="pt-16">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Explore Works</h1>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`px-4 py-2 rounded-full ${selectedCategory === 'ALL'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            All
                        </button>
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full ${selectedCategory === category
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {category.charAt(0) + category.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorks.map((work) => (
                                <PublicIPCard key={work.id} ip={work} />
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredWorks.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">
                                No works found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage; 