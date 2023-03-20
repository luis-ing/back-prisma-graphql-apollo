import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

import { typeDefs as UsuarioTypeDefs, resolver as UsuarioResolvers } from './graphql/Usuario.js';
import { typeDefs as ProyectoTypeDefs, resolver as ProyectoResolvers } from './graphql/Proyecto.js';
import { typeDefs as MenuTypeDefs, resolver as MenuResolvers } from './graphql/Menu.js';
import { typeDefs as SprintTypeDefs, resolver as SprintResolvers } from './graphql/Sprint.js';
import { typeDefs as ColumnaTableroTypeDefs, resolver as ColumnaTableroResolvers } from './graphql/ColumnaTablero.js';
import { typeDefs as TareaTypeDefs, resolver as TareaResolvers } from './graphql/Tarea.js';

const Query = `
    scalar DateTime
`;

const typeDefs = [
    Query,
    UsuarioTypeDefs,
    ProyectoTypeDefs,
    MenuTypeDefs,
    SprintTypeDefs,
    ColumnaTableroTypeDefs,
    TareaTypeDefs
];
const resolvers = [
    UsuarioResolvers,
    ProyectoResolvers,
    MenuResolvers,
    SprintResolvers,
    ColumnaTableroResolvers,
    TareaResolvers
];

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization ? req.headers.authorization : null;
            if (!req.body.operationName.startsWith('IntrospectionQuery')) {
                // console.log(req.body.operationName);
                const querysIncluidas = !['LoginUsuario', 'NewUsuario'].includes(req.body.operationName);
                // console.log(querysIncluidas);
                if (querysIncluidas) {
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