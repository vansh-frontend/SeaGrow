import React, { useState, useEffect } from "react";
import { CheckSquare, Square, Trash2, Edit } from "lucide-react"; // icons for actions

type Todo = {
  id: string;
  title: string;
  is_completed: boolean;
  category: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["Work", "Personal", "Others"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Work");
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategoryForEdit, setNewCategoryForEdit] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // To track todo being deleted

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTodoItem: Todo = {
      id: Date.now().toString(), // Unique ID based on timestamp
      title: newTodo,
      is_completed: false,
      category: selectedCategory,
    };

    setTodos([newTodoItem, ...todos]); // Add to the beginning of the list
    setNewTodo(""); // Clear the input field
  };

  // Toggle Todo Completion status
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
      )
    );
  };

  // Delete a todo with confirmation
  const deleteTodo = (id: string) => {
    if (confirmDelete === id) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos); // Update the state
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage
      setConfirmDelete(null); // Reset delete confirmation
    } else {
      setConfirmDelete(id); // Set delete confirmation for the selected todo
    }
  };

  // Add a new category if it doesn't exist
  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]); // Add new category
      setNewCategory(""); // Clear input
    }
  };

  // Modify an existing todo
  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTitle(todo.title);
    setNewCategoryForEdit(todo.category);
  };

  const saveEditedTodo = () => {
    if (!newTitle.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo?.id
          ? { ...todo, title: newTitle, category: newCategoryForEdit }
          : todo
      )
    );
    setEditingTodo(null); // Exit edit mode
  };

  // Filter todos based on completion status
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.is_completed;
    if (filter === "Pending") return !todo.is_completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">My To-Dos</h1>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Category Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add a new category..."
            className="flex-1 p-3 border rounded-lg focus:outline-none"
          />
          <button
            onClick={addCategory}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter Todos</h2>
        <div className="flex space-x-4">
          {["All", "Completed", "Pending"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-teal-600 hover:text-white transition`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-lg shadow-lg">
        {filteredTodos.length ? (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-500 hover:text-teal-600"
                >
                  {todo.is_completed ? (
                    <CheckSquare className="h-6 w-6" />
                  ) : (
                    <Square className="h-6 w-6" />
                  )}
                </button>
                <span
                  className={`${
                    todo.is_completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title} ({todo.category || "Uncategorized"})
                </span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => startEditing(todo)}
                  className="text-gray-500 hover:text-teal-600"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No todos available.</p>
        )}
      </div>

      {/* Edit Todo Modal */}
      {editingTodo && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Todo</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Edit todo title"
            />
            <select
              value={newCategoryForEdit}
              onChange={(e) => setNewCategoryForEdit(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={saveEditedTodo}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
