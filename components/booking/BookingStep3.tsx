"use client";

import { Calendar as CalendarIcon, Clock, Users, User, Phone, Mail } from "lucide-react";
import { BookingData } from "@/types/booking";

interface BookingStep3Props {
  date: Date | undefined;
  bookingData: BookingData;
}

export default function BookingStep3({ date, bookingData }: BookingStep3Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <span>
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>{bookingData.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-gray-500" />
            <span>
              {bookingData.guests}{" "}
              {parseInt(bookingData.guests) === 1 ? "Guest" : "Guests"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-500" />
            <span>{bookingData.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span>{bookingData.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <span>{bookingData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}