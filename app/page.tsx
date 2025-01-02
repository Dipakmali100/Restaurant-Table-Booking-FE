import RestaurantBooking from '@/components/RestaurantBooking';

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')] bg-cover bg-center">
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Restaurant Table Booking</h1>
              <p className="text-lg text-gray-200">Experience culinary excellence in the heart of the city</p>
            </div>
            <RestaurantBooking />
          </div>
        </div>
      </div>
    </main>
  );
}