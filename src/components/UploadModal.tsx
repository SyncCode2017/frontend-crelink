import React, { useState } from 'react';
import { WorkCategory } from '../types';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState<WorkCategory>('MUSIC');
    const [parentIPAddress, setParentIPAddress] = useState('');
    const [parentIPId, setParentIPId] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [originalityScore, setOriginalityScore] = useState<number | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const checkOriginality = async () => {
        if (!file) return;

        setIsChecking(true);
        try {
            // TODO: Implement AI originality check
            // This is a mock implementation
            await new Promise(resolve => setTimeout(resolve, 2000));
            setOriginalityScore(Math.random() * 100);
        } catch (error) {
            console.error('Error checking originality:', error);
        } finally {
            setIsChecking(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement submission logic
        console.log({
            file,
            category,
            parentIPAddress,
            parentIPId,
            originalityScore
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Upload Work</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Upload File
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full bg-gray-700 rounded-lg p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as WorkCategory)}
                            className="w-full bg-gray-700 rounded-lg p-2"
                            required
                        >
                            <option value="MUSIC">Music</option>
                            <option value="LYRICS">Lyrics</option>
                            <option value="POEM">Poem</option>
                            <option value="BEATS">Beats</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Parent IP Address
                        </label>
                        <input
                            type="text"
                            value={parentIPAddress}
                            onChange={(e) => setParentIPAddress(e.target.value)}
                            className="w-full bg-gray-700 rounded-lg p-2"
                            placeholder="0x..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Parent IP ID
                        </label>
                        <input
                            type="text"
                            value={parentIPId}
                            onChange={(e) => setParentIPId(e.target.value)}
                            className="w-full bg-gray-700 rounded-lg p-2"
                            placeholder="Enter Parent IP ID"
                        />
                    </div>

                    {file && !originalityScore && (
                        <button
                            type="button"
                            onClick={checkOriginality}
                            disabled={isChecking}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
                        >
                            {isChecking ? 'Checking Originality...' : 'Check Originality'}
                        </button>
                    )}

                    {originalityScore !== null && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm font-medium">Originality Score</p>
                            <p className="text-2xl font-bold">{originalityScore.toFixed(2)}%</p>
                        </div>
                    )}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!originalityScore}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadModal; 