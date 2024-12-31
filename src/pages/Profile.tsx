import React, { useState, useEffect } from 'react';

// Define types for profile data
interface Profile {
  full_name: string;
  username: string;
  bio: string;
  links: string[];
  avatar_url: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    username: '',
    bio: '',
    links: [],
    avatar_url: '',
  });

  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    // Check if profile data exists in local storage
    const savedProfile = JSON.parse(localStorage.getItem('profile') || '{}');
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Profile) => {
    setProfile({
      ...profile,
      [field]: e.target.value,
    });
  };

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...profile.links];
    updatedLinks[index] = value;
    setProfile({ ...profile, links: updatedLinks });
  };

  const addLink = () => {
    setProfile({ ...profile, links: [...profile.links, ''] });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile));
    setEditing(false);
  };

  const handleDeleteProfilePicture = () => {
    setProfile({ ...profile, avatar_url: '' });
  };

  const handleDelete = () => {
    // Reset profile data and remove from local storage
    localStorage.removeItem('profile');
    setProfile({
      full_name: '',
      username: '',
      bio: '',
      links: [],
      avatar_url: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {editing ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-pic-upload"
            />
            <label htmlFor="profile-pic-upload" className="cursor-pointer">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-white text-xl">+</span>
                </div>
              )}
            </label>
            {profile.avatar_url && (
              <button
                onClick={handleDeleteProfilePicture}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
            <div>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => handleChange(e, 'full_name')}
                className="text-2xl font-semibold mb-2 p-2 w-full border border-gray-300 rounded"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={profile.username}
                onChange={(e) => handleChange(e, 'username')}
                className="text-gray-600 mb-2 p-2 w-full border border-gray-300 rounded"
                placeholder="Username"
              />
            </div>
          </div>

          <textarea
            value={profile.bio}
            onChange={(e) => handleChange(e, 'bio')}
            className="text-gray-700 p-2 w-full border border-gray-300 rounded"
            placeholder="Tell us about yourself..."
          ></textarea>

          <div>
            <h3 className="font-semibold mb-2">Links</h3>
            {profile.links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded"
                  placeholder={`Link ${index + 1}`}
                />
                <button
                  onClick={() => setProfile({ ...profile, links: profile.links.filter((_, i) => i !== index) })}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addLink} className="text-blue-500">+ Add Link</button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">{profile.full_name}</h2>
              <p className="text-gray-600">@{profile.username}</p>
            </div>
          </div>
          <p className="text-gray-700">{profile.bio}</p>
          <div>
            <h3 className="font-semibold">Links:</h3>
            {profile.links.length > 0 ? (
              <ul className="list-disc pl-5">
                {profile.links.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No links added.</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
