import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

export default function ExpenseList() {
  const { expenses } = useExpenses();
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredExpenses = filterCategory === 'all' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="expense-list-container">
      <h2>Your Expenses</h2>
      
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
          </div>
        </>
      )}
    </div>
  );
}
