"use client";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingData } from "@/types/booking";

interface BookingStep1Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  bookingData: BookingData;
  onInputChange: (field: string, value: string) => void;
  availableTimeSlots: string[];
}

export default function   BookingStep1({
  date,
  setDate,
  bookingData,
  onInputChange,
  availableTimeSlots
}: BookingStep1Props) {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < midnight}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="time">Available Time Slot</Label>
            <Select
              value={bookingData.time}
              onValueChange={(value) => onInputChange("time", value)}
            >
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Select
              value={""+bookingData.guests}
              onValueChange={(value) => onInputChange("guests", value)}
            >
              <SelectTrigger id="guests" className="w-full">
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}