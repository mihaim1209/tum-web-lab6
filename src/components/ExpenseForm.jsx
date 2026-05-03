import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
  });

  const { addExpense } = useExpenses();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.amount) {
      alert('Please fill in all fields');
      return;
    }

    addExpense({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });

    setFormData({
      title: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 className="card-title">Add Expense</h2>
      
      <div className="form-grid">
        <div className="field">
          <label className="field-label" htmlFor="title">Description</label>
          <input
            id="title"
            className="input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Lunch at restaurant"
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="amount">Amount</label>
          <input
            id="amount"
            className="input"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="category">Category</label>
          <select
            id="category"
            className="input"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="date">Date</label>
          <input
            id="date"
            className="input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </div>
    </form>
  );
}
