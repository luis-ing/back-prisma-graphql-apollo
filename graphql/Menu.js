import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        getHerramienta: [Herramienta]
        getPermissionUser(idUser: Int): [Permisos]
    }

    type Mutation {
        newMenu(nombre: String, usuarios_id: Int): respondMsg
    }

    type Herramienta {
        id: Int
        nombre: String
        path: String
        orden: Int
        activo: Int
    }

    type Permisos {
        usuario_id: Int
        herramientas_id: Int
        herramienta: Herramienta
        activo: Int
    }
`;

export const resolver = {
    Query: {
        getHerramienta: async () => {
            try {
                return await prisma.c_herramientas.findMany({
                    where: {
                        activo: true
                    }
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        getPermissionUser: async (_, { idUser }) => {
            try {
                const permisos = await prisma.permisos.findMany({
                    where: {
                        activo: true,
                        usuario_id: idUser
                    },
                    include: {
                        c_herramientas: true
                    }
                });
                console.log(permisos);
                return permisos;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        newProyecto: async (_, {nombre, usuarios_id}) => {
            try {
                console.log(nombre, usuarios_id);
                // const Proyecto = await prisma.proyecto.create({
                //     data: {
                //         nombre: nombre, completado: false, activo: false, usuarios_id: usuarios_id
                //     },
                // });
                await prisma.c_herramientas.create({
                    data: {
                        nombre: nombre, completado: false, activo: false, usuario_id: usuarios_id
                    },
                });
                // console.log(Proyecto);
                const respuesta = {code: 1, mng: `Proyecto ${nombre}, creado correctamente`, data: null};
                return respuesta;
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