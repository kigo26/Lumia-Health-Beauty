import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Printer, Calendar, MapPin, Clock, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';

const MOCK_BOOKINGS = [
  { id: '1', service: 'Deep Tissue Recovery', date: 'June 15, 2026', time: '10:00 AM', center: 'Emerald Zen Spa', status: 'Confirmed' },
  { id: '2', service: 'Aromatherapy Session', date: 'June 20, 2026', time: '02:00 PM', center: 'Pearl Wellness', status: 'Pending' },
];

export const Bookings = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = (booking: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - ${booking.service}</title>
            <style>
              body { font-family: sans-serif; padding: 40px; }
              .header { border-bottom: 1px solid #ccc; padding-bottom: 20px; }
              .details { margin-top: 20px; }
              .item { display: flex; justify-content: space-between; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Booking Receipt</h1>
              <p>${new Date().toLocaleDateString()}</p>
            </div>
            <div class="details">
              <div class="item"><strong>Service:</strong> <span>${booking.service}</span></div>
              <div class="item"><strong>Date:</strong> <span>${booking.date}</span></div>
              <div class="item"><strong>Time:</strong> <span>${booking.time}</span></div>
              <div class="item"><strong>Center:</strong> <span>${booking.center}</span></div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      toast.success('Receipt prepared for printing.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-6xl font-serif italic text-serene-dark mb-12">Your Sanctuary Bookings</h1>
      <div className="space-y-6">
        {MOCK_BOOKINGS.map((booking) => (
          <div key={booking.id} className="p-8 bg-white rounded-[2rem] border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-serene-dark">{booking.service}</h3>
              <div className="flex items-center gap-4 text-xs text-serene-dark/60 font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {booking.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {booking.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {booking.center}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn("px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold", 
                booking.status === 'Confirmed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                {booking.status}
              </span>
              <button 
                onClick={() => handlePrint(booking)}
                className="flex items-center gap-2 px-6 py-3 bg-serene-dark text-white rounded-xl text-[10px] uppercase font-bold tracking-widest hover:scale-[1.02] transition-transform"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
