import { useExpenses } from '../context/ExpenseContext';
import './ExpenseItem.css';

const categoryEmojis = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '💡',
  shopping: '🛍️',
  health: '🏥',
  other: '📌',
};

export default function ExpenseItem({ expense }) {
  const { removeExpense, toggleLike } = useExpenses();
  const emoji = categoryEmojis[expense.category] || '💰';

  return (
    <div className={`expense-item ${expense.liked ? 'liked' : ''}`}>
      <div className="expense-content">
        <div className="expense-header">
          <span className="category-emoji">{emoji}</span>
          <h4 className="expense-title">{expense.title}</h4>
        </div>
        <div className="expense-details">
          <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
          <span className="expense-amount">${expense.amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="expense-actions">
        <button 
          className={`btn-like ${expense.liked ? 'active' : ''}`}
          onClick={() => toggleLike(expense.id)}
          title={expense.liked ? "Unlike" : "Like"}
        >
          {expense.liked ? '❤️' : '🤍'}
        </button>
        <button 
          className="btn-delete"
          onClick={() => removeExpense(expense.id)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
