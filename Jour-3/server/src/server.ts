import express from 'express';
import cors from 'cors';
import movieRoutes from './route/route';

const app = express();
const PORT = 3001; // Port 3001 pour ne pas gêner React (5173)

app.use(cors());
app.use(express.json());


app.use(movieRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

