import React from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setJobs(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Job Board</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
          Post a Job
        </button>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-500 mb-4">{job.location}</p>
                <p className="text-gray-700">{job.description}</p>
              </div>
              <Briefcase className="text-teal-600 h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;