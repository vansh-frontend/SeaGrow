import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();
    setProfile(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {profile && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">{profile.full_name}</h2>
              <p className="text-gray-600">@{profile.username}</p>
            </div>
          </div>
          <p className="text-gray-700">{profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;