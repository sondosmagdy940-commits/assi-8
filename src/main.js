import express from 'express';
import { connectDB } from './common/db/mongoose.js';
import userRouter from './Users/users.Route.js';
import noteRouter from './Notes/notes.Route.js';
const app = express();

app.use(express.json());
connectDB();

app.use('/user',userRouter);
app.use('/note',noteRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});