import React from 'react';
import DatePicker from 'react-datepicker';
import { cn } from '../lib/utils';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface CalendarSlotPickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
  availableTimes: string[];
  suggestedTimes?: string[];
}

export const CalendarSlotPicker: React.FC<CalendarSlotPickerProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  availableTimes,
  suggestedTimes = [],
}) => {
  return (
    <div className="space-y-8">
      {/* Date Picker */}
      <div className="space-y-4">
        <label className="text-[9px] font-bold text-aura-brown uppercase tracking-[0.3em] ml-4 flex items-center gap-2">
          <CalendarIcon className="w-3 h-3" />
          Select Date
        </label>
        <div className="w-full bg-aura-beige/5 border border-black/5 rounded-[1.5rem] overflow-hidden">
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            minDate={new Date()}
            inline
            calendarClassName="w-full !border-0 !bg-transparent"
            dayClassName={(date) =>
              cn(
                "hover:!bg-aura-dark hover:!text-white !rounded-full !transition-all !duration-300",
                selectedDate && date.toDateString() === selectedDate.toDateString()
                  ? "!bg-aura-dark !text-white"
                  : "!text-aura-dark"
              )
            }
          />
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-4">
          <label className="text-[9px] font-bold text-aura-brown uppercase tracking-[0.3em] ml-4 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Select Slot
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => onTimeChange(time)}
                className={cn(
                  "py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border relative",
                  selectedTime === time
                    ? "bg-aura-dark text-white border-aura-dark shadow-lg"
                    : "bg-white text-aura-dark border-black/5 hover:border-aura-dark",
                  suggestedTimes.includes(time) && selectedTime !== time && "border-aura-brown/50"
                )}
              >
                {time}
                {suggestedTimes.includes(time) && (
                  <span className="absolute -top-2 -right-2 bg-aura-brown text-white text-[8px] px-2 py-0.5 rounded-full">
                    Smart
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
