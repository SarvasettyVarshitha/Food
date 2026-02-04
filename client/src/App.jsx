import React, { useState } from 'react';
import KitchenView from './components/KitchenView';
import Analytics from './components/Analytics';
import { Home, FileText, Users, Phone, Mail, MapPin, ChefHat, TrendingDown, Award } from 'lucide-react';

// EDITABLE CONTENT - Change these values to customize your app
const APP_CONFIG = {
    title: "EcoFood Manager", 
    subtitle: "Smart Hostel Food Waste Reduction",
    contact: {
        email: "mahaswarup19082001@gmail.com", 
        phone: "+91 7569981071", 
        address: "SLN Charities, KR Road, Near Fort, Bangalore - 02" 
    },
    aboutUs: {
        description: "We revolutionize hostel dining with AI-powered waste tracking and sustainable food management solutions.",
        mission: "Creating zero-waste hostel environments through smart technology and data-driven insights."
    }
};

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleUpdate = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-20">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-indigo-100 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <ChefHat className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                                    {APP_CONFIG.title}
                                </h1>
                                <p className="text-sm text-slate-500">{APP_CONFIG.subtitle}</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            {[
                                { id: 'home', label: 'Home', icon: Home },
                                { id: 'record', label: 'Record', icon: FileText },
                                { id: 'about', label: 'About', icon: Users },
                                { id: 'contact', label: 'Contact', icon: Phone }
                            ].map(({ id, label, icon: Icon }) => (
                                <button 
                                    key={id}
                                    onClick={() => scrollToSection(id)} 
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-medium"
                                >
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-slate-800 mb-6">
                            Reduce Food Waste,
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Save the Planet</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Transform your hostel's food management with intelligent tracking, real-time analytics, and sustainable practices.
                        </p>
                        <button 
                            onClick={() => scrollToSection('record')}
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            Start Recording Food
                        </button>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { icon: TrendingDown, title: "Waste Reduced", value: "45%", color: "from-green-500 to-emerald-500" },
                            { icon: Award, title: "Money Saved", value: "$2.5K", color: "from-blue-500 to-cyan-500" },
                            { icon: ChefHat, title: "Meals Tracked", value: "1,200+", color: "from-purple-500 to-pink-500" }
                        ].map(({ icon: Icon, title, value, color }, index) => (
                            <div key={index} className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
                                <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <Icon className="text-white" size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-2">{value}</h3>
                                <p className="text-slate-600 font-medium">{title}</p>
                            </div>
                        ))}
                    </div>

                    <Analytics refreshTrigger={refreshTrigger} />
                </div>
            </section>

            {/* Record Section */}
            <section id="record" className="py-20 bg-gradient-to-r from-slate-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Record Food Entry</h2>
                        <p className="text-xl text-slate-600">Help us track and reduce waste with detailed logging</p>
                    </div>
                    <KitchenView onUpdate={handleUpdate} />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/50">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center">
                                <Users size={40} className="mr-4 text-indigo-600" />
                                About EcoFood Manager
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-lg text-slate-600 leading-relaxed">{APP_CONFIG.aboutUs.description}</p>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-l-4 border-indigo-500">
                                    <h3 className="font-bold text-indigo-800 mb-3 text-xl">Our Mission</h3>
                                    <p className="text-indigo-700 text-lg">{APP_CONFIG.aboutUs.mission}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { title: "Smart Tracking", desc: "AI-powered waste detection" },
                                    { title: "Real-time Analytics", desc: "Live dashboard insights" },
                                    { title: "Cost Savings", desc: "Reduce operational expenses" },
                                    { title: "Sustainability", desc: "Environmental impact reduction" }
                                ].map((feature, index) => (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                                        <h4 className="font-bold text-slate-800 mb-2">{feature.title}</h4>
                                        <p className="text-slate-600 text-sm">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                            <Phone size={40} className="mr-4" />
                            Get In Touch
                        </h2>
                        <p className="text-xl text-indigo-100">Ready to transform your hostel's food management?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Mail, title: "Email Us", value: APP_CONFIG.contact.email, color: "from-blue-400 to-blue-600" },
                            { icon: Phone, title: "Call Us", value: APP_CONFIG.contact.phone, color: "from-green-400 to-green-600" },
                            { icon: MapPin, title: "Visit Us", value: APP_CONFIG.contact.address, color: "from-purple-400 to-purple-600" }
                        ].map(({ icon: Icon, title, value, color }, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                                <h3 className="font-bold text-white text-xl mb-3">{title}</h3>
                                <p className="text-indigo-100">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-white py-4 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <ChefHat className="text-white" size={16} />
                        </div>
                        <span className="text-lg font-bold">{APP_CONFIG.title}</span>
                        <span className="text-slate-400">© 2026 EcoFood Manager</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
