"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, User } from "lucide-react";
import { BookingData } from "@/types/booking";

interface BookingStep2Props {
  bookingData: BookingData;
  onInputChange: (field: string, value: string) => void;
}

export default function BookingStep2({
  bookingData,
  onInputChange,
}: BookingStep2Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <Input
            id="name"
            placeholder="John Doe"
            value={bookingData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="pl-10"
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={bookingData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="pl-10"
          />
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={bookingData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            className="pl-10"
          />
          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}