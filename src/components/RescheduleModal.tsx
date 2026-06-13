import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CalendarSlotPicker } from './CalendarSlotPicker';
import { toast } from 'react-hot-toast';

interface Props {
  booking: any;
  onClose: () => void;
}

export const RescheduleModal = ({ booking, onClose }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleConfirm = () => {
    toast.success(`Rescheduled ${booking.service} to ${selectedDate?.toLocaleDateString()} at ${selectedTime}`);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-serene-dark/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl"
        >
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-serene-dark italic">Reschedule {booking.service}</h2>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-6 h-6 text-serene-dark" />
            </button>
          </header>
          
          <CalendarSlotPicker 
             selectedDate={selectedDate}
             selectedTime={selectedTime}
             onDateChange={setSelectedDate}
             onTimeChange={setSelectedTime}
             availableTimes={['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM']}
          />
          
          <div className="mt-8 pt-6 border-t flex justify-end">
             <button 
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                className="px-8 py-3 bg-serene-dark text-white rounded-xl text-xs uppercase font-bold tracking-widest disabled:opacity-50"
             >
                Confirm Reschedule
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
