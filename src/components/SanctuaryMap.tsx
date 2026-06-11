import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Star, Map as MapIcon, Users } from 'lucide-react';
import { MOCK_PROVIDERS, MOCK_CENTERS } from '../data';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

// Custom icons using Lucide and DivIcon for a clean look
const createCustomIcon = (type: 'provider' | 'center') => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-10 h-10 bg-white shadow-2xl rounded-full border-2 border-tranquil-teal animate-pulse opacity-20"></div>
        <div class="relative w-8 h-8 rounded-full flex items-center justify-center ${
          type === 'provider' ? 'bg-[#2a9d8f] text-white' : 'bg-[#e9c46a] text-white'
        } shadow-lg border-2 border-white">
          ${type === 'provider' ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'}
        </div>
      </div>
    `,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const centerIcon = createCustomIcon('center');
const providerIcon = createCustomIcon('provider');

export const SanctuaryMap = () => {
  // Center of Nairobi as default view
  const defaultCenter: [number, number] = [-1.2921, 36.8219];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-[600px] rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl relative z-10"
    >
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // Using a slightly more muted tile layer if available, or just standard OSM
        />

        {/* Render Wellness Centers */}
        {MOCK_CENTERS.map((center) => (
          <Marker 
            key={center.id} 
            position={[center.location.lat, center.location.lng]}
            icon={centerIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 space-y-3 min-w-[200px]">
                <div className="aspect-video w-full rounded-xl overflow-hidden">
                  <img src={center.images[0]} alt={center.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif italic text-lg leading-tight">{center.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-tranquil-accent">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-bold">{center.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">• {center.reviewCount} Reviews</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {center.address}
                  </p>
                </div>
                <button className="w-full py-2 bg-tranquil-teal text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                  Book Sanctuary
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render Providers */}
        {MOCK_PROVIDERS.map((provider) => (
          <Marker 
            key={provider.uid} 
            position={[provider.location.lat, provider.location.lng]}
            icon={providerIcon}
          >
            <Popup>
              <div className="p-2 space-y-3 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-black/5">
                    <img src={provider.photoURL} alt={provider.displayName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif italic text-base leading-tight">{provider.displayName}</h4>
                    <p className="text-[9px] text-tranquil-teal font-bold uppercase tracking-widest">{provider.certificationLevel}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {provider.specialties.slice(0, 2).map(s => (
                    <span key={s} className="text-[8px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 font-medium">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <div className="flex items-center gap-1 text-tranquil-accent">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">{provider.rating}</span>
                  </div>
                  <button className="px-3 py-1.5 bg-tranquil-cream text-tranquil-teal rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-tranquil-teal hover:text-white transition-all border border-tranquil-teal/10">
                    Connect
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-10 left-10 z-[1000] bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-black/5 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#2a9d8f] flex items-center justify-center text-white scale-75">
            <Users size={10} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-text">Specialist Ritualists</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#e9c46a] flex items-center justify-center text-white scale-75">
            <MapIcon size={10} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-tranquil-text">Sanctuary Centers</span>
        </div>
      </div>
    </motion.div>
  );
};
