import { GraphQLServer } from 'graphql-yoga';

import models from './models';
import resolvers from './graphql/resolvers';

const server = new GraphQLServer({
	typeDefs: './server/graphql/schema.graphql',
	resolvers,
	context: {
		models
	}
});

models.sequelize.sync().then(() => {
	server.start(
		{
			endpoint: '/graphql',
			playground: '/playground'
		},
		() => console.log('Graphql Server Running...')
	);
});
