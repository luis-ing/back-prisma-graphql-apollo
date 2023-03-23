import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        getTickets(id: Int!): Tarea
    }
    
    type Mutation {
        updateSprintTicket(data: String!): respondMsg
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
    Mutation: {
        updateSprintTicket: async (_, { data }) => {
            try {
                // console.log('updateSprint ', JSON.parse(data));
                JSON.parse(data).map((row) => {
                    row.task && row.task.map(async (item) => {
                        // console.log('item ', row.idColumnOrigin, item);
                        return await prisma.tarea.update({
                            where: {
                                id: item.idTarea,
                            },
                            data: {
                                id_sprint: row.idColumnOrigin,
                                orden: item.orden,
                            },
                        });
                    });
                });
                const respuesta = { code: 1, mng: `Ticket actualizado correctamente`, data: '' };
                return respuesta;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },
    Tarea: {
        ColumnaTablero: async root => prisma.c_columna_tablero.findFirst({
            where: {
                id: root.id_columna_tablero
            }
        })
    }
};