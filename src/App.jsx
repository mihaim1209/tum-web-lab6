import { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ThemeToggle from './components/ThemeToggle';
import StatisticsPanel from './components/StatisticsPanel';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="app-shell">
          <header className="app-header">
            <div className="brand">
              <p className="brand-kicker">Lab 6 · Client-only</p>
              <h1 className="brand-title">Expense Tracker</h1>
              <p className="brand-sub">
                Manage and track your spending. Add expenses, like items, and filter by category. 
                All data is stored locally in your browser.
              </p>
            </div>
            <ThemeToggle />
          </header>
          <main className="app-main">
            <StatisticsPanel />
            <div className="two-col">
              <ExpenseForm />
              <div></div>
            </div>
            <ExpenseList />
          </main>
          <footer className="app-footer">
            <p>Built with React. Data persists in your browser using localStorage.</p>
          </footer>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
