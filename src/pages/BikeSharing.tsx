import React from 'react';
import { supabase } from '../lib/supabase';
import { Bike, MapPin } from 'lucide-react';

const BikeSharing = () => {
  const [bikes, setBikes] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    const { data } = await supabase
      .from('bikes')
      .select('*')
      .eq('status', 'available');
    if (data) setBikes(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Bike Sharing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike) => (
          <div key={bike.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <Bike className="text-teal-600 h-8 w-8" />
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Available
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{bike.model}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{bike.location}</span>
            </div>
            <button className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeSharing;