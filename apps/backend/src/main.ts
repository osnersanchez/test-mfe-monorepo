import express, { Application } from 'express';
import cors from 'cors';
import itemsRoutes from './routes/items';

const app: Application = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
