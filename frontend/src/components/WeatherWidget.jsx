import React, { useState, useEffect, useCallback } from 'react';
import { getWidgets } from '../api';

const WeatherWidget = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [locationName, setLocationName] = useState('Panchkula');

    const fetchWeather = useCallback(async (lat, lon) => {
        setRefreshing(true);
        try {
            const params = lat && lon ? { lat, lon } : {};
            const res = await getWidgets(params);
            if (res.data.weather) {
                setData(res.data.weather);
                if (lat && lon) {
                    try {
                        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
                        const geoData = await geoRes.json();
                        const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || 'Your Location';
                        setLocationName(city);
                    } catch (e) {
                        setLocationName('Your Location');
                    }
                } else {
                    setLocationName('Panchkula');
                }
            }
        } catch (err) {
            console.error('Weather Fetch Error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    const handleRefresh = useCallback(() => {
        if (refreshing) return;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
                () => fetchWeather()
            );
        } else {
            fetchWeather();
        }
    }, [fetchWeather, refreshing]);

    useEffect(() => {
        handleRefresh();
    }, []);

    if (loading) return null;
    if (!data) return null;

    const getIcon = (condition) => {
        const cond = condition?.toUpperCase() || '';
        if (cond.includes('CLEAR')) return 'fa-sun text-yellow-400';
        if (cond.includes('CLOUDY')) return 'fa-cloud-sun text-blue-300';
        if (cond.includes('RAIN') || cond.includes('DRIZZLE')) return 'fa-cloud-showers-heavy text-blue-400';
        if (cond.includes('THUNDERSTORM')) return 'fa-cloud-bolt text-indigo-400';
        return 'fa-cloud text-gray-400';
    };

    return (
        <div className="relative overflow-hidden rounded-2xl mb-4 shadow-xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 min-h-[180px]">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-2">
                    <i className="fas fa-location-dot text-primary-red text-[9px]"></i>
                    <h3 className="text-white font-black text-[10px] tracking-widest uppercase italic">{locationName}</h3>
                </div>
                <button 
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className={`text-white/40 hover:text-white transition-all ${refreshing ? 'animate-spin' : ''}`}
                >
                    <i className="fas fa-rotate text-[10px]"></i>
                </button>
            </div>

            {/* Content */}
            <div className="p-4 relative z-10 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <div className="text-4xl font-black text-white leading-none tracking-tighter tabular-nums drop-shadow-2xl">
                            {data.temp}<span className="text-lg font-light opacity-40 ml-1">°</span>
                        </div>
                        <div className="mt-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-primary-red mr-2">{data.condition}</span>
                            <span className="text-[9px] font-bold text-white/40 uppercase">Feels {data.feelsLike}°</span>
                        </div>
                    </div>

                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center p-3 border border-white/10 backdrop-blur-md">
                        <i className={`fas ${getIcon(data.condition)} text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></i>
                    </div>
                </div>

                {/* Sub Stats */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-white/5 rounded-xl p-2 border border-white/5 flex items-center gap-2">
                        <i className="fas fa-droplet text-blue-400/50 text-[10px]"></i>
                        <div>
                            <div className="text-[7px] uppercase font-black text-white/30 tracking-widest">Humidity</div>
                            <div className="text-[10px] font-black text-white">{data.humidity}%</div>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2 border border-white/5 flex items-center gap-2">
                        <i className="fas fa-wind text-green-400/50 text-[10px]"></i>
                        <div>
                            <div className="text-[7px] uppercase font-black text-white/30 tracking-widest">Wind</div>
                            <div className="text-[10px] font-black text-white">{data.warning?.split(': ')[1] || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Polish */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-red/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default WeatherWidget;
