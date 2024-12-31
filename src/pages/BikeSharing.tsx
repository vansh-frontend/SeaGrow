  import React, { useState, useRef, useEffect } from 'react';
  import { Bike, MapPin } from 'lucide-react';

  // Add your Google Maps API Key here
  const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

  const RideBooking = () => {
    const [rides, setRides] = useState<any[]>([]);
    const [pickupLocation, setPickupLocation] = useState<string>('');
    const [desiredLocation, setDesiredLocation] = useState<string>('');

    const pickupInputRef = useRef<HTMLInputElement | null>(null);
    const desiredInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      // Load Google Maps API script dynamically
      const loadGoogleMaps = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          if (pickupInputRef.current && desiredInputRef.current) {
            // Initialize Autocomplete for pickup location
            new window.google.maps.places.Autocomplete(pickupInputRef.current);
            // Initialize Autocomplete for desired location
            new window.google.maps.places.Autocomplete(desiredInputRef.current);
          }
        };
      };
      loadGoogleMaps();
    }, []);

    useEffect(() => {
      fetchRides();
    }, []);

    const fetchRides = async () => {
      // Fetch ride data (from your backend or API)
      const rapidoRides = await fetchRapidoRides();
      const uberRides = await fetchUberRides();
      const inDriverRides = await fetchInDriverRides();
      setRides([...rapidoRides, ...uberRides, ...inDriverRides]);
    };

    const fetchRapidoRides = async () => {
      return [{ id: 1, model: 'Rapido Bike', location: 'Sector 17, Chandigarh' }];
    };

    const fetchUberRides = async () => {
      return [{ id: 2, model: 'Uber Bike', location: 'Sector 22, Chandigarh' }];
    };

    const fetchInDriverRides = async () => {
      return [{ id: 3, model: 'InDriver Bike', location: 'Sector 43, Chandigarh' }];
    };

    const handleBooking = (rideId: number, platform: string) => {
      if (platform === 'rapido') {
        window.location.href = `https://www.rapido.bike/ride/${rideId}`;
      } else if (platform === 'uber') {
        window.location.href = `https://www.uber.com/ride/${rideId}`;
      } else if (platform === 'indriver') {
        window.location.href = `https://www.indriver.com/ride/${rideId}`;
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ride Booking</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Enter Pickup Location</h2>
          <input
            ref={pickupInputRef}
            type="text"
            placeholder="Pickup Location"
            className="w-full p-3 border rounded"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Enter Desired Location</h2>
          <input
            ref={desiredInputRef}
            type="text"
            placeholder="Desired Location"
            className="w-full p-3 border rounded"
            value={desiredLocation}
            onChange={(e) => setDesiredLocation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <div key={ride.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <Bike className="text-teal-600 h-8 w-8" />
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Available
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{ride.model}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{ride.location}</span>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  onClick={() => handleBooking(ride.id, 'rapido')}
                >
                  Book on Rapido
                </button>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  onClick={() => handleBooking(ride.id, 'uber')}
                >
                  Book on Uber
                </button>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  onClick={() => handleBooking(ride.id, 'indriver')}
                >
                  Book on InDriver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default RideBooking;
