import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        GetProyectos: [proyecto]
        GetProyecto(idproyecto: Int!): proyecto
        GetTProyecto: [proyecto_usuario]
        getProyectinfo(id: Int!): proyecto
    }

    type Mutation {
        newProyecto(nombre: String, usuarios_id: Int): respondMsg
        UpdateProyecto(idproyecto: Int!, nombre: String): proyecto
        DeleteProyecto(idproyecto: Int!): proyecto
    }

    type proyecto {
        id: Int!
        nombre: String
        clave: String
        completado: Int
        activo: Int
        usuarios_id: Int
    }

    type proyecto_usuario {
        idProyecto: Int
        idUsuario: Int
        fecha_creacion: DateTime
        activo: Int
        idEstatusInvitacion: Int
    }

    type respondMsg {
        code: Int
        mng: String
        data: String
    }
`;

export const resolver = {
    Query: {
        GetProyectos: async () => {
            try {
                return await prisma.proyecto.findMany();
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        GetProyecto: async (_, { idproyecto }) => {
            try {
                return await prisma.proyecto.findUnique({
                    where: {
                        usuarios_id: idproyecto
                    },
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        GetTProyecto: async () => {
            try {
                return await prisma.t_proyecto_usuario.findMany();
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        getProyectinfo: async (_, { id }) => {
            try {
                return await prisma.proyecto.findUnique({
                    where: {
                        id
                    }
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        newProyecto: async (_, { nombre, usuarios_id }) => {
            try {
                console.log(nombre, usuarios_id);
                // const Proyecto = await prisma.proyecto.create({
                //     data: {
                //         nombre: nombre, completado: false, activo: false, usuarios_id: usuarios_id
                //     },
                // });
                await prisma.t_proyecto_usuario.create({
                    data: {
                        nombre: nombre, completado: false, activo: false, usuario_id: usuarios_id
                    },
                });
                // console.log(Proyecto);
                const respuesta = { code: 1, mng: `Proyecto ${nombre}, creado correctamente`, data: null };
                return respuesta;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        UpdateProyecto: async (_, { id, nombre }) => {
            try {
                const updateProyecto = await prisma.proyecto.update({
                    where: {
                        id: id,
                    },
                    data: {
                        nombre: nombre,
                    },
                })
                return updateProyecto;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        DeleteProyecto: async (_, { idproyecto }) => {
            try {
                const deleteProyecto = await prisma.proyecto.update({
                    where: {
                        idproyecto: idproyecto,
                    },
                    data: {
                        activo: false,
                    },
                })
                return deleteProyecto;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    }
};