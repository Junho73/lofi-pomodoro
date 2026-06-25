import React, { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now().toString(), text: inputValue.trim(), completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-container">
      <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>Reminders</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {todos.map(todo => (
          <label key={todo.id} className="todo-item" data-cy={`todo-item-${todo.id}`}>
            <input 
              type="checkbox" 
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-cy="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
          </label>
        ))}
      </div>
      
      <div style={{ marginTop: '0.5rem' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAdd}
          placeholder="New Reminder..." 
          data-cy="todo-input"
        />
      </div>
    </div>
  );
};
