import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

export default function ExpenseList() {
  const { expenses } = useExpenses();
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Helper function to get date range
  const getDateRangeFilter = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch(dateRange) {
      case 'today':
        return {
          start: today,
          end: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        };
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        return {
          start: weekStart,
          end: new Date()
        };
      case 'month':
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: new Date()
        };
      case 'year':
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: new Date()
        };
      case 'custom':
        return {
          start: customStartDate ? new Date(customStartDate) : null,
          end: customEndDate ? new Date(customEndDate) : null
        };
      default:
        return null;
    }
  };

  let filteredExpenses = expenses.filter(e => {
    // Category filter
    if (filterCategory !== 'all' && e.category !== filterCategory) return false;

    // Search filter
    if (searchTerm && !e.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    // Date range filter
    const dateFilter = getDateRangeFilter();
    if (dateFilter && (dateFilter.start || dateFilter.end)) {
      const expenseDate = new Date(e.date);
      if (dateFilter.start && expenseDate < dateFilter.start) return false;
      if (dateFilter.end && expenseDate >= dateFilter.end) return false;
    }

    return true;
  });

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
      
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters-section">
        <div className="filter-section">
          <label htmlFor="filter">Category:</label>
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
          <label htmlFor="sort">Sort:</label>
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

        <div className="filter-section">
          <label htmlFor="date-range">Period:</label>
          <select
            id="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {dateRange === 'custom' && (
        <div className="custom-date-range">
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            placeholder="Start date"
          />
          <span>to</span>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            placeholder="End date"
          />
          <button
            onClick={() => {
              setCustomStartDate('');
              setCustomEndDate('');
              setDateRange('all');
            }}
            className="btn-reset"
          >
            Reset
          </button>
        </div>
      )}

      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add one to get started!</p>
      ) : (
        <>
          <div className="expense-list">
            {filteredExpenses.length === 0 ? (
              <p className="empty-state">No expenses match your filters.</p>
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
