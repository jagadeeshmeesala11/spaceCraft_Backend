const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRouter = require('./Routes/UserRoute');
const roomRouter = require('./Routes/RoomRoute');
const modelsRoutes = require('./Routes/ModelsRoute');
const projectRoutes = require('./Routes/ProjectRoute')
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// Routes
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/models', modelsRoutes);
app.use('/api/projects',projectRoutes);


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));