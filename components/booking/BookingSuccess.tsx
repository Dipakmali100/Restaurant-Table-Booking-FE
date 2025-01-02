"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Users, User, Phone, Mail, CheckCircle2 } from "lucide-react";
import { BookingData } from "@/types/booking";

interface BookingSuccessProps {
  booking: BookingData & { date: Date | undefined };
}

export default function BookingSuccess({ booking }: BookingSuccessProps) {
  return (
    <Card className="w-full backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        <CardDescription>
          Thank you for choosing our Restaurant. We look forward to serving you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>
                {booking.date?.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-500" />
              <span>
                {booking.guests}{" "}
                {parseInt(booking.guests) === 1 ? "Guest" : "Guests"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <span>{booking.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>{booking.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>{booking.phone}</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button onClick={() => window.location.reload()}>
            Make Another Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}