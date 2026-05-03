import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import './ExpenseEditModal.css';

export default function ExpenseEditModal({ expense, onClose }) {
  const { updateExpense } = useExpenses();
  const [formData, setFormData] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? value : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpense(expense.id, {
      ...formData,
      amount: parseFloat(formData.amount)
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Expense</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-title">Description</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-amount">Amount ($)</label>
            <input
              id="edit-amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="food">🍔 Food</option>
              <option value="transport">🚗 Transport</option>
              <option value="entertainment">🎬 Entertainment</option>
              <option value="utilities">💡 Utilities</option>
              <option value="shopping">🛍️ Shopping</option>
              <option value="health">🏥 Health</option>
              <option value="other">📌 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-date">Date</label>
            <input
              id="edit-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
