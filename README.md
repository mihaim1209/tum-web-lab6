# Expense Tracker

A modern, responsive, client-side expense tracking web application built with React and Vite. Track your spending, set budgets, and gain insights into your expenses with an intuitive interface supporting light and dark themes.

## Features

### Core Functionality
- **Add Expenses**: Create new expenses with title, amount, category, and date
- **Edit Expenses**: Modify existing expenses with a modal form
- **Delete Expenses**: Remove expenses you no longer need
- **Like/Favorite**: Mark important expenses as favorites
- **Search**: Find expenses by title instantly

### Filtering & Sorting
- **Category Filter**: Filter expenses by 7 categories (Food, Transport, Entertainment, Utilities, Shopping, Health, Other)
- **Date Range Filter**: Filter by Today, This Week, This Month, This Year, or Custom Range
- **Smart Sorting**: Sort by date (newest/oldest) or amount (highest/lowest)

### Statistics & Insights
- **Dashboard**: View total spent, average expense, and total count
- **Category Breakdown**: See spending by category with visual bar charts
- **Top Spending**: Identify your highest spending category
- **Monthly Trends**: Track spending across recent months

### Budget Management
- **Monthly Budget**: Set and track your monthly spending limit
- **Budget Alerts**: Get warnings when you exceed your budget
- **Progress Visualization**: Visual budget progress bar with percentage

### User Experience
- **Light/Dark Theme**: Toggle between light and dark modes (preference saved)
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Local Storage**: All data persists in browser
- **Smooth Animations**: Delightful animations and transitions
- **Accessible**: Proper labels, focus states, and semantic HTML

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS Variables (theme system)
- **State Management**: React Context API
- **Storage**: Browser localStorage
- **Typography**: DM Sans + Fraunces fonts
- **Color Palette**: Warm, professional design system

## User Flows

### Creating an Expense
1. Fill in the "Add Expense" form
2. Enter: Description, Amount, Category, Date
3. Click "Add Expense"
4. Expense appears immediately at the top of the list
5. Data is automatically saved to localStorage

### Viewing & Filtering Expenses
1. See all expenses in the main list
2. Use category filter to narrow by type
3. Use date range filter for time-based filtering
4. Search by title to find specific expenses
5. Sort by date or amount for different views
6. Total is calculated and displayed automatically

### Editing an Expense
1. Click the edit button (✎) on any expense
2. Modal opens with current values
3. Modify any field (title, amount, category, date)
4. Click "Save Changes"
5. Expense updates in place
6. Changes persist to localStorage

### Managing Budget
1. See monthly budget in Statistics panel
2. Click edit (✎) next to budget amount
3. Enter new budget limit
4. Click checkmark to save
5. Progress bar updates automatically
6. Alert appears if spending exceeds budget

## Getting Started

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

## Deployment

The app is configured for easy deployment to GitHub Pages.

### Quick Deploy

```bash
npm run deploy
```

This will:
1. Build the production version
2. Push to the `gh-pages` branch
3. Make the app live at: https://MihaiM1209.github.io/tum-web-lab6/

## Project Structure

```
src/
├── App.jsx                 # Main app component
├── index.css              # Global styles + design tokens
├── components/
│   ├── ExpenseForm.jsx    # Add expense form
│   ├── ExpenseItem.jsx    # Individual expense row
│   ├── ExpenseList.jsx    # Expense list with filters
│   ├── StatisticsPanel.jsx # Dashboard and stats
│   ├── BudgetTracker.jsx  # Budget management
│   ├── ThemeToggle.jsx    # Light/dark theme switcher
│   └── ExpenseEditModal.jsx # Edit expense modal
├── context/
│   ├── ExpenseContext.jsx # Expense state management
│   └── ThemeContext.jsx   # Theme state management
└── main.jsx               # React entry point
```

## Styling & Theme

The app uses CSS custom properties (CSS variables) for theming. Two complete themes are provided:

- **Light Theme**: Warm, light palette with beige backgrounds
- **Dark Theme**: Warm, dark palette for reduced eye strain

Theme preference is stored in localStorage and persists across sessions.

## Data Persistence

All expense data is stored locally in your browser using localStorage. No data is sent to any server. Your data:
- Persists across browser sessions
- Is not shared with any third party
- Can be exported by clearing localStorage manually

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Commits

This project was built incrementally with meaningful commits:

1. Initial project setup with React + Vite
2. Add sorting and animations
3. Add statistics dashboard
4. Add advanced filtering and search
5. Add edit expense functionality
6. Add budget tracker
7. Add comprehensive README
8. Add GitHub Pages deployment configuration
9. Add modern UI design refresh (fonts, colors, layout)

## License

Built for TUM Web Lab 6.

## Live Demo

Visit the live app: https://MihaiM1209.github.io/tum-web-lab6/
