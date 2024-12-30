import React from 'react';
import { BookOpen } from 'lucide-react';

const Learning = () => {
  // Static categories and courses data
  const categories = [
    { name: 'Frontend', key: 'frontend' },
    { name: 'Backend', key: 'backend' },
    { name: 'Fullstack', key: 'fullstack' },
    { name: 'Python', key: 'python' },
    { name: 'SQL', key: 'sql' },
  ];

  // Static course data mapped to categories
  const courses = {
    frontend: [
      {
        id: 1,
        title: 'HTML for Beginners',
        description: 'Learn the basics of HTML, the foundation of web development.',
        url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
      },
      {
        id: 2,
        title: 'CSS Flexbox Guide',
        description: 'Master CSS Flexbox layout for responsive designs.',
        url: 'https://www.freecodecamp.org/learn/responsive-web-design/css-flexbox/',
      },
    ],
    backend: [
      {
        id: 1,
        title: 'Node.js for Beginners',
        description: 'Learn the basics of Node.js, a backend JavaScript runtime.',
        url: 'https://www.freecodecamp.org/learn/apis-and-microservices/',
      },
      {
        id: 2,
        title: 'Express.js Framework',
        description: 'Understand Express.js for building web applications with Node.js.',
        url: 'https://expressjs.com/',
      },
    ],
    fullstack: [
      {
        id: 1,
        title: 'MERN Stack Development',
        description: 'Learn full-stack JavaScript development using MongoDB, Express, React, and Node.js.',
        url: 'https://www.freecodecamp.org/learn/quality-assurance/',
      },
      {
        id: 2,
        title: 'JAMstack Development',
        description: 'Build modern websites using JavaScript, APIs, and Markup.',
        url: 'https://www.netlify.com/blog/what-is-jamstack/',
      },
    ],
    python: [
      {
        id: 1,
        title: 'Python for Beginners',
        description: 'Learn the basics of Python programming for data analysis and web development.',
        url: 'https://www.python.org/about/gettingstarted/',
      },
      {
        id: 2,
        title: 'Python Web Development with Django',
        description: 'Build web applications using Python and Django.',
        url: 'https://www.djangoproject.com/start/',
      },
    ],
    sql: [
      {
        id: 1,
        title: 'SQL for Beginners',
        description: 'Learn how to manage databases using SQL.',
        url: 'https://www.w3schools.com/sql/',
      },
      {
        id: 2,
        title: 'Advanced SQL Queries',
        description: 'Master advanced SQL queries for database management.',
        url: 'https://www.codecademy.com/learn/learn-sql',
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [displayedCourses, setDisplayedCourses] = React.useState<any[]>([]);

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setDisplayedCourses(courses[categoryKey]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Learning Center</h1>

      {/* Categories Navigation */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.key}
            className="bg-teal-600 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-teal-700 transition-colors duration-300"
            onClick={() => handleCategoryClick(category.key)}
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>

      {/* Courses Section */}
      {selectedCategory && (
        <>
          <h2 className="text-2xl font-bold mb-4">Courses in {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedCourses.length > 0 ? (
              displayedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <BookOpen className="text-teal-600 h-6 w-6" />
                  </div>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    Start Learning
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No courses found in this category.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Learning;
