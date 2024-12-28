import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Newspaper, ExternalLink } from "lucide-react";

type Article = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  source: string;
  created_at: string;
};

type RedditPost = {
  data: {
    id: string;
    title: string;
    selftext: string;
    permalink: string;
    author: string;
  };
};

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [redditArticles, setRedditArticles] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from<Article>("news_articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      if (data) setArticles(data);
    } catch (_) {
      setError("Failed to fetch articles from the database.");
    }
  };

  const fetchRedditTechNews = async () => {
    try {
      const response = await fetch(
        "https://www.reddit.com/r/technology/top.json?limit=5"
      );
      const data = await response.json();
      if (!data?.data?.children) throw new Error("Invalid Reddit response.");
      setRedditArticles(data.data.children);
    } catch (_) {
      setError("Failed to fetch Reddit articles.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchArticles(), fetchRedditTechNews()]);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center text-lg font-medium">Loading...</div>;
  if (error) return <div className="text-red-500 text-center font-semibold">{error}</div>;

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-teal-600 to-teal-400 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              Stay Informed with the Latest News
            </h1>
            <p className="text-lg mb-6">
              Dive into today's top stories and breaking news from trusted
              sources and communities.
            </p>
            <a
              href="#trending"
              className="bg-white text-teal-600 px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-teal-50 transition"
            >
              Explore Top Stories
            </a>
          </div>
          {articles[0]?.image_url ? (
            <img
              src={articles[0].image_url}
              alt={articles[0].title}
              className="mt-8 md:mt-0 md:ml-8 h-64 w-full md:w-1/2 object-cover rounded-lg shadow-md"
            />
          ) : null}
        </div>
      </section>

      {/* Trending News Section */}
      <section id="trending" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Trending News</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {article.image_url ? (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Newspaper className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.content}
                  </p>
                  <a
                    href="#"
                    className="text-teal-600 font-medium hover:underline"
                  >
                    Read More <ExternalLink className="h-4 w-4 inline ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reddit News Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Latest from Reddit</h2>
          <div className="space-y-6">
            {redditArticles.map((post) => (
              <div
                key={post.data.id}
                className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
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
                <p className="text-sm text-gray-600 mt-2">
                  Posted by {post.data.author}
                </p>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {post.data.selftext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
