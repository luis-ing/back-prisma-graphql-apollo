import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        GetSprint(id_proyecto: Int!): [proyecto]
    }

    type Sprint {
        id: Int
        nombre: String
        path: String
        orden: Int
        activo: Int
    }
`;

export const resolver = {
    Query: {
        GetSprint: async (_, { id_proyecto }) => {
            try {
                const proyecto = await prisma.sprint.findMany({
                    where: {
                        activo: true,
                        id_proyecto
                    }
                });
                return proyecto;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Permisos: {
        herramienta: async (root) => {
            return root.c_herramientas;
        }
    }
};