import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseEditModal from './ExpenseEditModal';

const categoryNames = {
  food: 'Food',
  transport: 'Transport',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

export default function ExpenseItem({ expense }) {
  const { removeExpense, toggleLike } = useExpenses();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const categoryName = categoryNames[expense.category] || 'Other';

  return (
    <>
      <div className="expense-row">
        <div className="expense-main">
          <div className="expense-title-line">
            <h4 className="expense-title">{expense.title}</h4>
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
          </div>
          <div className="expense-meta">
            <span className="pill">{categoryName}</span>
            <span>{new Date(expense.date).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="expense-actions">
          <button 
            className="btn-icon"
            onClick={() => setIsEditModalOpen(true)}
            title="Edit"
          >
            ✎
          </button>
          <button 
            className={`btn-icon ${expense.liked ? 'is-on' : ''}`}
            onClick={() => toggleLike(expense.id)}
            title={expense.liked ? "Unlike" : "Like"}
          >
            ★
          </button>
          <button 
            className="btn-icon btn-danger"
            onClick={() => removeExpense(expense.id)}
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <ExpenseEditModal 
          expense={expense} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </>
  );
}
