import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, TrendingDown, Image as ImageIcon, BarChart3, Calendar, Target } from 'lucide-react';

const Analytics = ({ refreshTrigger }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/analytics');
            setData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <div className="text-center p-12">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 font-medium">Loading analytics...</p>
            </div>
        );
    }
    
    if (!data) {
        return (
            <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
                <p className="text-red-600 font-medium">Failed to load analytics data</p>
            </div>
        );
    }

    const avgWaste = data.wasteEntries > 0 ? (data.totalWasteKg / data.wasteEntries).toFixed(2) : 0;

    return (
        <div className="space-y-8">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Waste */}
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Trash2 className="text-white" size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Total Food</p>
                            <p className="text-3xl font-bold text-slate-800">
                                {data.totalWasteKg}
                                <span className="text-lg font-normal text-slate-400 ml-1">kg</span>
                            </p>
                        </div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-red-200 to-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                </div>

                {/* Average Waste */}
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <TrendingDown className="text-white" size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Avg per Entry</p>
                            <p className="text-3xl font-bold text-slate-800">
                                {avgWaste}
                                <span className="text-lg font-normal text-slate-400 ml-1">kg</span>
                            </p>
                        </div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full w-2/3 animate-pulse"></div>
                    </div>
                </div>

                {/* Total Entries */}
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <BarChart3 className="text-white" size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Total Entries</p>
                            <p className="text-3xl font-bold text-slate-800">
                                {data.wasteEntries}
                                <span className="text-lg font-normal text-slate-400 ml-1">logs</span>
                            </p>
                        </div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-4/5 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Recent Entries Table */}
            {data.recentEntries && data.recentEntries.length > 0 && (
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                            <Calendar className="text-white" size={20} />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-800">Recent Food Entries</h4>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-200">
                                    <th className="text-left py-4 px-4 font-semibold text-slate-700 uppercase tracking-wider text-sm">Date</th>
                                    <th className="text-left py-4 px-4 font-semibold text-slate-700 uppercase tracking-wider text-sm">Meal</th>
                                    <th className="text-left py-4 px-4 font-semibold text-slate-700 uppercase tracking-wider text-sm">Quantity</th>
                                    <th className="text-left py-4 px-4 font-semibold text-slate-700 uppercase tracking-wider text-sm">Reason</th>
                                    <th className="text-left py-4 px-4 font-semibold text-slate-700 uppercase tracking-wider text-sm">Photo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentEntries.map((entry, index) => (
                                    <tr key={entry._id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                                        <td className="py-4 px-4 text-slate-700 font-medium">{entry.date}</td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-medium">
                                                {entry.mealType}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-bold text-slate-800">
                                            {entry.quantity} <span className="text-slate-500 font-normal">kg</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                entry.reason === 'LEFTOVER' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                                                entry.reason === 'OVERCOOKED' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800' :
                                                entry.reason === 'UNDERCOOKED' ? 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800' :
                                                'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800'
                                            }`}>
                                                {entry.reason.toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {entry.photoUrl ? (
                                                <a 
                                                    href={entry.photoUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                                >
                                                    <ImageIcon size={16} />
                                                    <span>View</span>
                                                </a>
                                            ) : (
                                                <span className="text-slate-400 font-medium">No photo</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;
