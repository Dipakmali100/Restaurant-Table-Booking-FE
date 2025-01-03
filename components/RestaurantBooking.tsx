"use client";

import { useEffect, useState } from "react";
import BookingStep1 from "./booking/BookingStep1";
import BookingStep2 from "./booking/BookingStep2";
import BookingStep3 from "./booking/BookingStep3";
import BookingSuccess from "./booking/BookingSuccess";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { BookingData } from "@/types/booking";
import axios from "axios";
import { timeSlots } from "@/lib/constants";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RestaurantBooking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeslotLoader, setTimeslotLoader] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>({
    time: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (date) {
      const fetchBookedTimes = async () => {
        try {
          setTimeslotLoader(true);
          const response = await axios.post(`${API_URL}/api/getBookedTimes`, { date });
          const { data }: any = response;
          if (data.success) {
            const alreadyBookedTimes = data.data;
            const updatedTimeSlots = timeSlots.filter((time) => !alreadyBookedTimes.includes(time));
            setAvailableTimeSlots(updatedTimeSlots);
            setTimeslotLoader(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      setAvailableTimeSlots([]);
      handleInputChange("time", "")
      fetchBookedTimes();
    }
  }, [date]);

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && (!date || !bookingData.time || !bookingData.guests)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (
      step === 2
    ) {
      if(!bookingData.name || !bookingData.email || !bookingData.phone) {
        toast.error("Please fill in all fields");
        return;
        //include space in regex means space is allowed
      }else if(!bookingData.name.match(/^[a-zA-Z ]+$/)){ 
        toast.error("Name should not include numbers or symbols");
        return;
      }else if(!bookingData.email.match(/\S+@\S+\.\S+/)){
        toast.error("Please enter a valid email address");
        return;
      }else if(!bookingData.phone.match(/^[0-9]{10}$/)){
        toast.error("Please enter a valid phone number");
        return;
      }
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {

    try {
      // Adjust the date with the timezone offset
      if (date) {
        console.log("All Details: ", { date, ...bookingData });
        const response: any = await axios.post(`${API_URL}/api/bookOrder`, { date, ...bookingData });
        if (response.data.success) {
          toast.success("Booking confirmed! We'll see you soon.");
          setIsSuccess(true);
        }
      }
    } catch (err) {
      toast.error("Oops! This time slot just got booked. Please choose another time slot");
      setStep(1);
    }
  };

  if (isSuccess) {
    return <BookingSuccess booking={{ date, ...bookingData }} />;
  }

  return (
    <Card className="w-full backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
      <CardHeader>
        <CardTitle>Table Reservation</CardTitle>
        <CardDescription>
          Book your table in just a few simple steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <BookingStep1
            date={date}
            setDate={setDate}
            bookingData={bookingData}
            onInputChange={handleInputChange}
            availableTimeSlots={availableTimeSlots}
            loader={timeslotLoader}
          />
        )}

        {step === 2 && (
          <BookingStep2
            bookingData={bookingData}
            onInputChange={handleInputChange}
          />
        )}

        {step === 3 && (
          <BookingStep3 date={date} bookingData={bookingData} />
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Confirm Booking</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}