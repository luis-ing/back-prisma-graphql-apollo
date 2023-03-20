import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        getTickets(id: Int!): Tarea
    }

    type Tarea {
        id: Int
        titulo: String
        contenido: String
        fecha_creacion: DateTime
        fecha_modificacion: DateTime
        orden: Int
        activo: Int
        id_creador: Int
        id_responsable: Int
        id_urgencia: Int
        id_columna_tablero: Int
        id_sprint: Int
        ColumnaTablero: ColumnaTablero
    }
`;

export const resolver = {
    Query: {
        getTickets: async (_, { id }) => {
            try {
                const Tickets = await prisma.tarea.findMany({
                    where: {
                        activo: true,
                        id
                    }
                });
                return Tickets;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Tarea: {
        ColumnaTablero: async root => prisma.c_columna_tablero.findFirst({
            where: {
                id: root.id_columna_tablero
            }
        })
    }
};