import React from 'react';

interface Work {
    id: string;
    title: string;
    creator: string;
    imageUrl: string;
    category: string;
    publishedAt: Date;
}

const RecentWorks: React.FC = () => {
    const [works, setWorks] = React.useState<Work[]>([]);

    React.useEffect(() => {
        // TODO: Replace with actual API call
        const mockWorks: Work[] = [
            {
                id: '1',
                title: 'Abstract Harmony',
                creator: 'Creator One',
                imageUrl: '/mock/work1.jpg',
                category: 'Digital Art',
                publishedAt: new Date(),
            },
            // Add more mock works as needed
        ];

        setWorks(mockWorks);
    }, []);

    return (
        <section className="my-12">
            <h2 className="text-3xl font-bold mb-6">Recently Published</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {works.map((work) => (
                    <div key={work.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <img
                            src={work.imageUrl}
                            alt={work.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-1">{work.title}</h3>
                            <p className="text-gray-400 text-sm">by {work.creator}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm text-purple-400">{work.category}</span>
                                <span className="text-sm text-gray-400">
                                    {work.publishedAt.toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentWorks; 