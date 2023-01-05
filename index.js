import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

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
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization ? req.headers.authorization : null;
            if(!req.body.operationName.startsWith('IntrospectionQuery')) {
                // console.log(req.body.operationName);
                const querysIncluidas = !['LoginUsuario'].includes(req.body.operationName);
                // console.log(querysIncluidas);
                if(querysIncluidas){
                    try {                        
                        // console.log(process.env.SECURITY_KEY);
                        return jwt.verify(token.replace('Bearer ', ''), process.env.SECURITY_KEY);
                    } catch (error) {
                        throw new Error('Token invalido');
                    }
                }
            }
        }
    })

    const { url } = await server.listen();
    console.log(`🚀 Server in running on `, url);
}

startApolloServer();