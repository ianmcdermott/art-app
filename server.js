const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let server;

function runServer(){
	const port = process.env.PORT || 8080;
	return new Promise((res, rej) =>{
		server = app.listen(port, () =>{
			console.log(`listening on port ${port}`);
			res(server);
		})
		.on('error', e => {
			rej(e);
		});
	});
}

function closeServer(){
	return new Promise((res, rej) =>{
		console.log('closing server');
		server.close(e => {
			if(e){
				console.log('erroring');
				rej(e);
				return;
			}
			res();
		});
	});
}

if(require.main === module){
	runServer().catch(e => console.error(e));
};

module.exports = {app, runServer, closeServer};