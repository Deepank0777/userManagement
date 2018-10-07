
const 	express 		= 	require('express'),
		mongoose 	= 	require('mongoose'),
		path 		= 	require('path'),
		config 		= 	require(__dirname + '/config');

const app = express();

//Clean up the form
const bodyParser = 	require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Public Routes
app.get('/',	function(req,res) { res.status(200).send('Welcome to Inventory Management'); res.end(); });
app.use('/api/users',	require(config.routePath +'UserRoutes'));


//404 Error 
app.get('*', function(req, res){ res.status(404).send('404 Not Found.'); });

//Bind connection to error event (to get notification of connection errors)
connect()
	.on('error', console.error.bind(console, 'MongoDB connection error:'))
	.on('disconnected', connect)
	.once('open', listen);


function connect() {
	mongoose.connect(config.databaseUri,config.databaseOptions);
	mongoose.Promise = global.Promise;

	//Connect to DB
	return mongoose.connection;
}

function listen() {
	const port=process.env.PORT || 3000;
	app.listen(port, () => console.log(`Listening to the port ${port} ...`));	
}
