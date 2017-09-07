#!/usr/bin/env node
// require('./src')()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const MongoClient = require('mongodb').MongoClient,
  test = require('assert')

const { server, database } = require('./config')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const { getTokenFromRequest } = require('./utils/auth')

const port = 3000 + 1;

const graphqlSchema = require('./resources/graphql/schema.graphql');

// app.use(express.static(__dirname));
// app.use('/graphql', graphqlHTTP(() => ({ schema })));

app.enable('trust proxy');

app.use((req, res, next) => {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		return res.redirect(`https://${req.headers.host}${req.url}`);
	}
	return next();
});

app.use(bodyParser.json());

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './build', 'index.html'));
});


mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => console.log('We are connected!'))

const schema = makeExecutableSchema({ typeDefs, resolvers })
const corsOptions = { origin: 'http://localhost:3000' }

app.use(cors(corsOptions))

app.use('/graphql', bodyParser.json(), graphqlHTTP(request => ({
  schema,
  context: { token: getTokenFromRequest(request) }
})))
app.use('/graphiql', graphqlHTTP({ endpointURL: '/graphql' }))

app.listen(server.port, () => console.log(`Now browse to ${server.host}:${server.port}/graphiql`))

app.listen(port, (request, response, error) => {
	const port = this.address().port;
	if (error) {
		console.error(error);
	} else {
		console.info('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
		console.info('  Press CTRL-C to stop\n');
		console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
	}
});
