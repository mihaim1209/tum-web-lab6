import { createContext, useState, useContext, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      liked: false,
    };
    setExpenses([newExpense, ...expenses]);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map(e =>
      e.id === id ? { ...e, ...updatedData } : e
    ));
  };

  const toggleLike = (id) => {
    setExpenses(expenses.map(e =>
      e.id === id ? { ...e, liked: !e.liked } : e
    ));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, updateExpense, toggleLike }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
