# 💰 Expense Tracker App

A modern, responsive, client-side expense tracking web application built with React and Vite. Track your spending, set budgets, and gain insights into your expenses with an intuitive user interface supporting light and dark themes.

## ✨ Features

### Core Functionality
- ➕ **Add Expenses**: Create new expenses with title, amount, category, and date
- ✏️ **Edit Expenses**: Modify existing expenses with a modal form
- 🗑️ **Delete Expenses**: Remove expenses you no longer need
- ❤️ **Like/Favorite**: Mark important expenses as favorites for quick reference
- 🔍 **Search**: Find expenses by title instantly

### Filtering & Sorting
- 🏷️ **Category Filter**: Filter expenses by 7 categories (Food, Transport, Entertainment, Utilities, Shopping, Health, Other)
- 📅 **Date Range Filter**: Filter by Today, This Week, This Month, This Year, or Custom Range
- 📊 **Smart Sorting**: Sort by date (newest/oldest) or amount (highest/lowest)

### Statistics & Insights
- 📈 **Dashboard**: View total spent, average expense, and total count
- 📊 **Category Breakdown**: See spending by category with visual bar charts
- 🎯 **Top Spending**: Identify your highest spending category
- 📅 **Monthly Trends**: Track spending across recent months

### Budget Management
- 💵 **Monthly Budget**: Set and track your monthly spending limit
- ⚠️ **Budget Alerts**: Get warnings when you exceed your budget
- 📉 **Progress Visualization**: Visual budget progress bar with percentage

### User Experience
- 🌓 **Light/Dark Theme**: Toggle between light and dark modes (preference saved)
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Local Storage**: All data persists in browser (IndexedDB-ready architecture)
- ✨ **Smooth Animations**: Delightful animations and transitions throughout
- ♿ **Accessible**: Proper labels, focus states, and semantic HTML

## 🏗️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS Variables (theme system)
- **State Management**: React Context API
- **Storage**: Browser localStorage
- **Icons**: Unicode Emojis

## 📋 User Flows

### Creating an Expense
1. Fill in the "Add New Expense" form on the left panel
2. Enter: Description, Amount, Category, Date
3. Click "Add Expense"
4. Expense appears immediately at the top of the list
5. Data is automatically saved to localStorage

### Viewing & Filtering Expenses
1. See all expenses in the main list (right side)
2. Use category filter to narrow by type
3. Use date range filter for time-based filtering
4. Search by title to find specific expenses
5. Sort by date or amount for different views
6. Total is calculated and displayed automatically

### Editing an Expense
1. Click the ✏️ (edit) button on any expense
2. Modal opens with current values
3. Modify any field (title, amount, category, date)
4. Click "Save Changes"
5. Expense updates in place
6. Changes persist to localStorage

### Managing Budget
1. See monthly budget in Statistics panel
2. Click edit (✏️) next to budget amount
3. Enter new budget limit
4. Click ✓ to save
5. Progress bar updates automatically
6. Alert appears if spending exceeds budget

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MihaiM1209/tum-web-lab6.git
cd tum-web-lab6

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🌐 Deployment

The app is configured for easy deployment to GitHub Pages.

### Quick Deploy

```bash
npm run deploy
```

This will:
1. Build the production version
2. Push to the `gh-pages` branch
3. App will be live at: **https://MihaiM1209.github.io/tum-web-lab6/**

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 📁 Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx          # Add expense form
│   ├── ExpenseList.jsx          # Main expense list with filters
│   ├── ExpenseItem.jsx          # Individual expense card
│   ├── ExpenseEditModal.jsx     # Edit modal
│   ├── StatisticsPanel.jsx      # Statistics and insights
│   ├── BudgetTracker.jsx        # Budget management
│   ├── ThemeToggle.jsx          # Theme switcher
│   └── *.css                    # Component styles
├── context/
│   ├── ExpenseContext.jsx       # Expense state management
│   └── ThemeContext.jsx         # Theme state management
├── App.jsx                      # Main app component
├── App.css                      # App styles with theme variables
├── index.css                    # Global styles
└── main.jsx                     # Entry point
```

## 🎨 Theming

The app uses CSS Variables for theming. Colors automatically adjust based on the selected theme:

- **Light Theme**: Clean white background with dark text
- **Dark Theme**: Dark background with light text for comfortable viewing

Theme preference is saved in localStorage and persists across sessions.

## 💾 Data Persistence

### What's Stored
- **Expenses**: All expense data (title, amount, category, date, liked status)
- **Theme**: User's preferred theme (light/dark)
- **Budget**: Monthly budget limit

### Storage Method
- **localStorage**: Browser's client-side storage (no server required)
- All data is stored as JSON
- No sensitive data is transmitted

## 🎯 Category Icons

Each category has an emoji icon for quick visual identification:
- 🍔 Food
- 🚗 Transport
- 🎬 Entertainment
- 💡 Utilities
- 🛍️ Shopping
- 🏥 Health
- 📌 Other

## 📱 Responsive Design

The app is fully responsive with optimized layouts for:
- **Desktop**: Two-column layout (form/stats on left, list on right)
- **Tablet**: Adjusted grid with better spacing
- **Mobile**: Single column, stacked layout for easy touch interaction

## ⌨️ Keyboard Navigation

- **Tab**: Navigate through form fields
- **Enter**: Submit forms and confirm actions
- **Escape**: Close modals (when implemented)

## 🐛 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔮 Future Enhancements

Potential features for future versions:
- CSV export/import for backup
- Recurring expenses
- Budget subcategories
- Monthly/yearly reports with charts
- Multi-currency support
- Cloud sync (Firebase integration)
- PWA capabilities
- Category spending goals

## 📊 Commit History

The project was built incrementally with meaningful commits:

1. **Commit 1**: Initial setup with React + Vite, basic components, and theme support
2. **Commit 2**: Sorting functionality and smooth animations
3. **Commit 3**: Statistics dashboard with category breakdown
4. **Commit 4**: Advanced filtering with search and date ranges
5. **Commit 5**: Edit expense modal functionality
6. **Commit 6**: Budget tracker with monthly alerts
7. **Commit 7**: Complete documentation and finalization
8. **Commit 8**: GitHub Pages deployment

## 📝 License

This project is created for educational purposes as part of TUM Web Development Lab 6.

## 👤 Author

MihaiM1209 - TUM Web Development Student

---

**Happy Tracking! 💸**
