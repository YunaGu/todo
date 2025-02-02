import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import './styles/App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRkq4wBiRxfsiKy1aSAaoNHHpQmpuxJQ8",
  authDomain: "todo-a407b.firebaseapp.com",
  projectId: "todo-a407b",
  storageBucket: "todo-a407b.firebasestorage.app",
  messagingSenderId: "339236976753",
  appId: "1:339236976753:web:08efd82d3cb5166880c3d0",
  measurementId: "G-0809SKF5EF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [leftTodos, setLeftTodos] = useState([]);
  const [rightTodos, setRightTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch todos from Firestore
  useEffect(() => {
    const unsubscribeLeft = onSnapshot(collection(db, "xiaoyu"), (snapshot) => {
      const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLeftTodos(todos);
    });

    const unsubscribeRight = onSnapshot(collection(db, "yun"), (snapshot) => {
      const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRightTodos(todos);
    });

    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, []);

  const handleAddTodo = (user) => async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await addDoc(collection(db, user), {
        title: inputValue,
        completed: false,
        timestamp: new Date(),
      });
      setInputValue('');
    }
  };

  const handleDeleteTodo = (user, id) => async () => {
    await deleteDoc(doc(db, user, id));
  };

  const handleToggleComplete = (user, id, completed) => async () => {
    await updateDoc(doc(db, user, id), { completed: !completed });
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="header-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <div className="buttons">
          <button className="add-button" onClick={handleAddTodo("xiaoyu")}> + Assign to Xiaoyu</button>
          <button className="add-button" onClick={handleAddTodo("yun")}> + Assign to Yun</button>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h2>Xiaoyu</h2>
          <ul>
            {leftTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                onToggle={handleToggleComplete("xiaoyu", todo.id, todo.completed)}
                onRemove={handleDeleteTodo("xiaoyu", todo.id)}
              />
            ))}
          </ul>
        </div>
        <div className="card">
          <h2>Yun</h2>
          <ul>
            {rightTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                onToggle={handleToggleComplete("yun", todo.id, todo.completed)}
                onRemove={handleDeleteTodo("yun", todo.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;