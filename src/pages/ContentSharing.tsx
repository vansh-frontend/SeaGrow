import React from 'react';
import { supabase } from '../lib/supabase';
import { Image, Video, Heart, MessageSquare, Share2 } from 'lucide-react';

const ContentSharing = () => {
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('content_posts')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Content Sharing</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
          Share Content
        </button>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                {post.profiles?.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.username}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}
                <span className="font-semibold">@{post.profiles?.username}</span>
              </div>
              <p className="text-gray-700 mb-4">{post.description}</p>
            </div>
            
            {post.media_type === 'image' ? (
              <img
                src={post.media_url}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            ) : (
              <video
                src={post.media_url}
                controls
                className="w-full h-96 object-cover"
              />
            )}

            <div className="p-4 border-t">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-teal-600">
                  <Heart className="h-5 w-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-teal-600">
                  <MessageSquare className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-teal-600">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSharing;