import React from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen } from 'lucide-react';

const Learning = () => {
  const [courses, setCourses] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setCourses(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Learning Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <BookOpen className="text-teal-600 h-6 w-6" />
            </div>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;