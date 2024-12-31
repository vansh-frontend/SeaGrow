import React, { useState, useRef, useEffect } from 'react';
import { Bike, MapPin } from 'lucide-react';

// OpenCage Geocoding API Key
const OPEN_CAGE_API_KEY = 'fc8c7116619546d583ce1087f6ae6181';

const RideBooking = () => {
  const [rides, setRides] = useState<any[]>([]);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [desiredLocation, setDesiredLocation] = useState<string>('');
  const [pickupCoordinates, setPickupCoordinates] = useState<any | null>(null);
  const [desiredCoordinates, setDesiredCoordinates] = useState<any | null>(null);

  const pickupInputRef = useRef<HTMLInputElement | null>(null);
  const desiredInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Load Google Maps API script dynamically
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places`;
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

  const fetchLocationCoordinates = async (location: string) => {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${OPEN_CAGE_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results[0]) {
      return data.results[0].geometry;
    }
    return null;
  };

  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupLocation(e.target.value);
    const coords = await fetchLocationCoordinates(e.target.value);
    setPickupCoordinates(coords);
  };

  const handleDesiredChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredLocation(e.target.value);
    const coords = await fetchLocationCoordinates(e.target.value);
    setDesiredCoordinates(coords);
  };

  useEffect(() => {
    // Fetch ride data from static sources or APIs
    fetchRides();
  }, []);

  const fetchRides = async () => {
    // Static ride data with rates
    const rapidoRides = await fetchRapidoRides();
    const uberRides = await fetchUberRides();
    const inDriverRides = await fetchInDriverRides();
    setRides([...rapidoRides, ...uberRides, ...inDriverRides]);
  };

  const fetchRapidoRides = async () => {
    return [
      { id: 1, model: 'Rapido Bike', location: 'Sector 17, Chandigarh', rate: '₹50-₹100' },
    ];
  };

  const fetchUberRides = async () => {
    return [
      { id: 2, model: 'Uber Bike', location: 'Sector 22, Chandigarh', rate: '₹80-₹150' },
    ];
  };

  const fetchInDriverRides = async () => {
    return [
      { id: 3, model: 'InDriver Bike', location: 'Sector 43, Chandigarh', rate: '₹40-₹90' },
    ];
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
          onChange={handlePickupChange}
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
          onChange={handleDesiredChange}
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
            <p className="text-gray-600 mb-4">Rate: {ride.rate}</p>
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
