import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

export default function ExpenseList() {
  const { expenses } = useExpenses();
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  let filteredExpenses = filterCategory === 'all' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  // Apply sorting
  filteredExpenses = [...filteredExpenses].sort((a, b) => {
    switch(sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <div className="expense-list-container">
      <h2>Your Expenses</h2>
      
      <div className="filters-section">
        <div className="filter-section">
          <label htmlFor="filter">Filter by category:</label>
          <select
            id="filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="food">🍔 Food</option>
            <option value="transport">🚗 Transport</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="utilities">💡 Utilities</option>
            <option value="shopping">🛍️ Shopping</option>
            <option value="health">🏥 Health</option>
            <option value="other">📌 Other</option>
          </select>
        </div>

        <div className="filter-section">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">📅 Newest First</option>
            <option value="date-asc">📅 Oldest First</option>
            <option value="amount-desc">💰 Highest Amount</option>
            <option value="amount-asc">💰 Lowest Amount</option>
          </select>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add one to get started!</p>
      ) : (
        <>
          <div className="expense-list">
            {filteredExpenses.length === 0 ? (
              <p className="empty-state">No expenses in this category.</p>
            ) : (
              filteredExpenses.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))
            )}
          </div>

          <div className="total-section">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <p className="expense-count">{filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}</p>
          </div>
        </>
      )}
    </div>
  );
}
