import React from 'react';
import { supabase } from '../lib/supabase';
import { Users, MessageSquare, Heart } from 'lucide-react';

const Community = () => {
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Community</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
          Create Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-4">
              {post.profiles?.avatar_url ? (
                <img
                  src={post.profiles.avatar_url}
                  alt={post.profiles.username}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <Users className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <p className="font-semibold">@{post.profiles?.username}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-teal-600">
                <Heart className="h-5 w-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-teal-600">
                <MessageSquare className="h-5 w-5" />
                <span>Comment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;