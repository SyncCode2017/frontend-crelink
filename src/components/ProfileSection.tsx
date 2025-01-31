// import React, { useState } from 'react';
// import WalletService from '../services/wallet';

// const ProfileSection: React.FC = () => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [username, setUsername] = useState(WalletService.userProfile?.username || '');
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             if (!username.trim()) {
//                 throw new Error('Username cannot be empty');
//             }

//             await WalletService.updateProfile(username.trim());
//             setIsEditing(false);
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Failed to update profile');
//         }
//     };

//     return (
//         <div className="bg-gray-800 rounded-lg p-6 mb-8">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-semibold">Profile</h2>
//                 {!isEditing && (
//                     <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-purple-400 hover:text-purple-300"
//                     >
//                         Edit
//                     </button>
//                 )}
//             </div>

//             {isEditing ? (
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-2">
//                             Username
//                         </label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full bg-gray-700 rounded-lg p-2"
//                             placeholder="Enter your username"
//                             maxLength={30}
//                         />
//                     </div>

//                     {error && (
//                         <p className="text-red-500 text-sm">{error}</p>
//                     )}

//                     <div className="flex justify-end space-x-4">
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setIsEditing(false);
//                                 setUsername(WalletService.userProfile?.username || '');
//                             }}
//                             className="px-4 py-2 text-gray-400 hover:text-white"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             ) : (
//                 <div>
//                     <div className="mb-4">
//                         <p className="text-sm text-gray-400">Username</p>
//                         <p className="text-lg">
//                             {WalletService.userProfile?.username || 'Not set'}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-400">Wallet Address</p>
//                         <p className="text-lg font-mono">
//                             {WalletService.connection?.address}
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfileSection; 