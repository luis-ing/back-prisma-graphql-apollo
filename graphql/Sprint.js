import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        getSprint(id_proyecto: Int!): [Sprint]
    }

    type Sprint {
        id: Int
        id_proyecto: Int
        numer_sprint: Int
        fecha_inicio: DateTime
        fecha_fin: DateTime
        fecha_completado: DateTime
        es_backlog: Int
        iniciado: Int
        completado: Int
        activo: Int
        tickets: [Tarea]
    }
`;

export const resolver = {
    Query: {
        getSprint: async (_, { id_proyecto }) => {
            try {
                const proyecto = await prisma.sprint.findMany({
                    where: {
                        activo: true,
                        id_proyecto
                    },
                    include: {
                        tarea: {
                            select: {
                                id: true,
                                titulo: true,
                                contenido: true,
                                fecha_creacion: true,
                                fecha_modificacion: true,
                                orden: true,
                                activo: true,
                                id_creador: true,
                                id_responsable: true,
                                id_urgencia: true,
                                id_columna_tablero: true,
                                id_sprint: true,
                            },
                            orderBy: {
                                // id_columna_tablero: 'asc',
                                orden: 'asc',
                            }
                        }
                    },
                });
                return proyecto;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Sprint: {
        tickets: async root => root.tarea
    }
};