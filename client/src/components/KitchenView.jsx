import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Upload, Image as ImageIcon, Calendar, Utensils, Scale, AlertCircle } from 'lucide-react';

const KitchenView = ({ onUpdate }) => {
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [mealType, setMealType] = useState('Breakfast');
    const [quantity, setQuantity] = useState('');
    const [reason, setReason] = useState('LEFTOVER');
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('mealType', mealType);
            formData.append('quantity', quantity);
            formData.append('reason', reason);
            if (photo) {
                formData.append('photo', photo);
            }

            await axios.post('/api/waste', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Waste entry recorded successfully!');
            setQuantity('');
            setPhoto(null);
            setPreview(null);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error(err);
            setMessage('Failed to record waste. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Upload className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Record Food Entry</h3>
                    <p className="text-slate-600">Help us track and reduce waste with detailed information</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Date Input */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                                <Calendar size={18} className="mr-2 text-indigo-600" />
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white/50 backdrop-blur-sm text-slate-800 font-medium"
                                required
                            />
                        </div>

                        {/* Meal Type */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                                <Utensils size={18} className="mr-2 text-purple-600" />
                                Meal Type
                            </label>
                            <select
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all bg-white/50 backdrop-blur-sm text-slate-800 font-medium"
                            >
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                            </select>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                                <Scale size={18} className="mr-2 text-green-600" />
                                Quantity (kg)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all bg-white/50 backdrop-blur-sm text-slate-800 font-medium"
                                placeholder="e.g. 5.5"
                                required
                            />
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                                <AlertCircle size={18} className="mr-2 text-orange-600" />
                                Reason
                            </label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-white/50 backdrop-blur-sm text-slate-800 font-medium"
                            >
                                <option value="LEFTOVER">Leftover</option>
                                <option value="OVERCOOKED">Overcooked</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-4">
                        <label className="flex items-center text-sm font-semibold text-slate-700">
                            <ImageIcon size={18} className="mr-2 text-blue-600" />
                            Upload Photo (Optional)
                        </label>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <label className="group cursor-pointer">
                                <div className="flex flex-col items-center justify-center h-48 border-3 border-dashed border-slate-300 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                        <ImageIcon className="text-white" size={24} />
                                    </div>
                                    <p className="text-slate-600 font-medium text-center px-4">
                                        {photo ? photo.name : "Click to upload food photo"}
                                    </p>
                                    <p className="text-sm text-slate-400 mt-2">PNG, JPG up to 10MB</p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                            
                            {preview && (
                                <div className="h-48 rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:hover:scale-100"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Recording Entry...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <Upload size={20} />
                                    <span>Submit Entry</span>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`p-4 rounded-2xl text-center font-medium border-2 ${
                            message.includes('success') 
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200' 
                                : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-red-200'
                        }`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default KitchenView;
