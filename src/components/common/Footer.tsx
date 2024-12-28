import React from 'react';
import { Ship } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Ship className="h-6 w-6" />
              <span className="font-bold text-xl">SeaGro</span>
            </div>
            <p className="text-gray-400">
              Your all-in-one platform for professional growth and community building.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="text-gray-400 hover:text-white">Jobs</a></li>
              <li><a href="/learning" className="text-gray-400 hover:text-white">Learning</a></li>
              <li><a href="/community" className="text-gray-400 hover:text-white">Community</a></li>
              <li><a href="/bike-sharing" className="text-gray-400 hover:text-white">Bike Sharing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/news" className="text-gray-400 hover:text-white">News</a></li>
              <li><a href="/content" className="text-gray-400 hover:text-white">Content</a></li>
              <li><a href="/todo" className="text-gray-400 hover:text-white">Todo Lists</a></li>
              <li><a href="/chat" className="text-gray-400 hover:text-white">Chat</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@seagro.com</li>
              <li className="text-gray-400">Phone: (555) 123-4567</li>
              <li className="text-gray-400">Address: 123 SeaGro Street</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SeaGro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;