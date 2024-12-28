import React from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { CheckSquare, Square, Trash2 } from 'lucide-react';

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = React.useState<any[]>([]);
  const [newTodo, setNewTodo] = React.useState('');

  React.useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    if (data) setTodos(data);
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    await supabase.from('todos').insert({
      title: newTodo,
      user_id: user?.id,
    });

    setNewTodo('');
    fetchTodos();
  };

  const toggleTodo = async (id: string, isCompleted: boolean) => {
    await supabase
      .from('todos')
      .update({ is_completed: !isCompleted })
      .eq('id', id);
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await supabase.from('todos').delete().eq('id', id);
    fetchTodos();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Todo List</h1>

      <form onSubmit={addTodo} className="mb-8">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Add Todo
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 border-b last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleTodo(todo.id, todo.is_completed)}
                className="text-gray-500 hover:text-teal-600"
              >
                {todo.is_completed ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
              </button>
              <span
                className={`${
                  todo.is_completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;