import { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="app">
          <header className="app-header">
            <h1>💰 Expense Tracker</h1>
            <ThemeToggle />
          </header>
          <main className="app-main">
            <ExpenseForm />
            <ExpenseList />
          </main>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
