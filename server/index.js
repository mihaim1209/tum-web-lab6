import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import expensesRouter from './expenses.js';
import { tokenRouter } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve simple swagger UI
const swaggerPath = path.join(__dirname, 'swagger.json');
const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
import swaggerUi from 'swagger-ui-express';
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/token', tokenRouter);
app.use('/expenses', expensesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Expense API is running. See /docs for API docs.' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
