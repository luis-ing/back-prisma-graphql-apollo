import { ApolloServer } from 'apollo-server';

import { typeDefs as UsuarioTypeDefs, resolver as UsuarioResolvers } from './graphql/Usuario.js';

const Query = `
    scalar DateTime
`;

const typeDefs = [
    Query,
    UsuarioTypeDefs,
];
const resolvers = [
    UsuarioResolvers,
];

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    
    const { url } = await server.listen();
    console.log(`🚀 Server in running on `, url);
}
    
startApolloServer();