import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [redditJobs, setRedditJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs from Reddit
  const fetchRedditJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseJobs = await Promise.all([
        fetch('https://www.reddit.com/r/jobs/top.json?limit=5'),
        fetch('https://www.reddit.com/r/remotejobs/top.json?limit=5'),
      ]);

      const dataJobs = await Promise.all(responseJobs.map((res) => res.json()));

      const allRedditJobs = [
        ...dataJobs[0]?.data?.children || [],
        ...dataJobs[1]?.data?.children || [],
      ];

      if (allRedditJobs.length === 0) {
        setError('No jobs found on Reddit.');
      } else {
        setRedditJobs(allRedditJobs);
      }
    } catch (err) {
      setError('Failed to fetch Reddit job postings.');
      console.error('Error fetching Reddit jobs:', err);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchRedditJobs();
    const interval = setInterval(fetchRedditJobs, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Construct the LinkedIn search URL based on user input
      const linkedinSearchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(
        searchQuery
      )}&origin=GLOBAL_SEARCH_HEADER&sid=5Pu`;
      window.open(linkedinSearchUrl, '_blank');
    }
  };

  if (loading) return <div className="text-center text-lg font-medium">Loading...</div>;
  if (error) return <div className="text-red-500 text-center font-semibold">{error}</div>;

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-teal-600 to-teal-400 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Find Your Next Job</h1>
            <p className="text-lg mb-6">
              Explore the latest job postings from Reddit and LinkedIn job boards.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-l-md text-black"
                placeholder="Search jobs..."
              />
              <button
                onClick={handleSearchSubmit}
                className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Job Postings</h2>

          {/* Reddit Jobs */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Reddit Jobs</h3>
            {redditJobs.length > 0 ? (
              redditJobs.map((post) => (
                <div
                  key={post.data.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold">
                    <a
                      href={`https://www.reddit.com${post.data.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      {post.data.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Posted by {post.data.author}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">{post.data.selftext}</p>
                  <a
                    href={`https://www.reddit.com${post.data.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 font-medium hover:underline mt-4 inline-block"
                  >
                    Read More <ExternalLink className="h-4 w-4 inline ml-1" />
                  </a>
                </div>
              ))
            ) : (
              <p>No Reddit job posts available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
