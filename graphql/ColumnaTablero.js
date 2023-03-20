import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        GetTablero(id_proyecto: Int!): [ColumnaTablero]
    }

    type Mutation {
        updateColumnTicket(data: String!): respondMsg
    }

    type ColumnaTablero {
        id: Int
        descripcion: String
        activo: Int
        id_proyecto: Int
        tickets: [Tarea]
    }
`;

export const resolver = {
    Query: {
        GetTablero: async (_, { id_proyecto }) => {
            try {
                const ColumnaTablero = await prisma.c_columna_tablero.findMany({
                    where: {
                        activo: true,
                        id_proyecto
                    },
                    include: {
                        tarea: {
                            orderBy: {
                                orden: 'asc'
                            }
                        },
                    },
                });
                return ColumnaTablero;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Mutation: {
        updateColumnTicket: async (_, { data }) => {
            try {
                console.log('data => ');
                JSON.parse(data).map((row) => {
                    // console.log(row.idColumnOrigin, row.task);
                    row.task && row.task.map(async (item) => {
                        console.log('item ', item.idTarea, item.orden, row.idColumnOrigin);
                        return await prisma.tarea.update({
                            where: {
                                id: item.idTarea,
                            },
                            data: {
                                id_columna_tablero: row.idColumnOrigin,
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
        },
    },
    ColumnaTablero: {
        tickets: async root => root.tarea
    }
};