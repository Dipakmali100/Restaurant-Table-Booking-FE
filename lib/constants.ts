// Generate time slots from 11:00 to 22:00
export const timeSlots = Array.from({ length: 11 }, (_, i) => {
  const hour = i + 11;
  // const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:00`;
})