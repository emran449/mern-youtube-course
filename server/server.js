const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes');

mongoose.connect(`mongodb+srv://emran:emran@cluster0.5cwfigw.mongodb.net/`)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: [
            'Content-Type',
             'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true
    }));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});