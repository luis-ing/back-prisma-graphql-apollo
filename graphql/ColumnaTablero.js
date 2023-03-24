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
                JSON.parse(data).map((row) => {
                    row.task && row.task.map(async (item) => {
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
        tickets: async (root) => {
            const sprint = await prisma.sprint.findMany({
                where: {
                    id_proyecto: root.id_proyecto,
                    iniciado: true,
                }
            });
            const tarea = await prisma.tarea.findMany({
                where: {
                    activo: true,
                    id_columna_tablero: root.id,
                    id_sprint: {
                        in: sprint.map((row) => row.id)
                    },
                },
                orderBy: {
                    orden: 'asc'
                },
            });
            return tarea;
        }
        // tickets: async root => {
        //     return await prisma.sprint.findMany({
        //         where: {
        //             id_proyecto: root.id_proyecto
        //         },
        //         // include: {
        //         //     spr
        //         // }
        //     });
        // }
    }
};