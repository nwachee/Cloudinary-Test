const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: './src/.env' })
const connectDB = require('./DB/connect');
const rootRoute = require('./routes/index.route')

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Root Route
app.use('/api/v1', rootRoute)


const port = process.env.PORT || 5000
const start = (async () => {
	await connectDB(process.env.MONGO_URI);

	app.listen(port, () => {
		console.log(`Server is listening at ${port}...`);
	});
});

start();