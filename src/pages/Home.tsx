import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  BookOpen,
  Users,
  Bike,
  Newspaper,
  MessageSquare,
  Image,
  CheckSquare,
} from 'lucide-react';

// Features data
const features = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: 'Job Board',
    description: 'Find your next opportunity or post job openings',
    link: '/jobs',
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Learning Center',
    description: 'Access courses and tutorials to enhance your skills',
    link: '/learning',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Community',
    description: 'Connect with like-minded professionals',
    link: '/community',
  },
  {
    icon: <Bike className="h-8 w-8" />,
    title: 'Bike Sharing',
    description: 'Sustainable transportation for our community',
    link: '/bike-sharing',
  },
  {
    icon: <Newspaper className="h-8 w-8" />,
    title: 'Tech News',
    description: 'Stay updated with the latest in technology',
    link: '/news',
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: 'Chat',
    description: 'Real-time communication with other members',
    link: '/chat',
  },
  {
    icon: <Image className="h-8 w-8" />,
    title: 'Content Sharing',
    description: 'Share and discover amazing content',
    link: '/content',
  },
  {
    icon: <CheckSquare className="h-8 w-8" />,
    title: 'Todo Lists',
    description: 'Stay organized and productive',
    link: '/todo',
  },
];

// Skeleton loader
const SkeletonLoader = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section Skeleton */}
      <section className="text-center py-20 bg-gray-200 rounded-lg animate-pulse">
        <div className="h-10 bg-gray-300 rounded-lg w-2/3 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-300 rounded-lg w-1/2 mx-auto mb-8"></div>
        <div className="h-10 bg-gray-300 rounded-full w-40 mx-auto"></div>
      </section>

      {/* Features Grid Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="p-6 bg-gray-200 rounded-lg shadow-md animate-pulse"
            >
              <div className="h-8 w-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
      </section>

      {/* Stats Section Skeleton */}
      <section className="bg-gray-200 p-8 rounded-lg shadow-md animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <div className="h-8 bg-gray-300 rounded-lg w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

// Main Home Component
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to SeaGro</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Your all-in-one platform for professional growth, learning, and community building
        </p>
        <Link
          to="/signup"
          className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-50 transition-colors"
        >
          Get Started
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-teal-600 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-teal-600">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-teal-600">500+</div>
            <div className="text-gray-600">Available Courses</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-teal-600">1000+</div>
            <div className="text-gray-600">Job Listings</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-teal-600">50+</div>
            <div className="text-gray-600">Community Events</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
