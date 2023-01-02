import { PrismaClient } from '@prisma/client';
import { gql } from "apollo-server";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const typeDefs = gql`

    type Query {
        getUsuarios: [usuario]
        getUsuario(id: Int!): usuario
        loginUsuario(username: String, password: String): respondMsg
    }

    type Mutation {
        newUsuario(nombre: String, apellidos: String, username: String, password: String): usuario
        updateUsuario(id: Int,nombre: String, apellidos: String, username: String, password: String): usuario
        deleteUsuario(id: Int): usuario
    }

    type usuario {
        id: Int!
        nombre: String
        apellidos: String
        username: String
        password: String
        fecha_registro: DateTime
        activo: Int
    }

    type respondMsg {
        code: Int
        mng: String
    }
`;

export const resolver = {
    Query: {
        getUsuarios: async () => {
            try {
                return await prisma.usuario.findMany();
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        getUsuario: async (_, {id}) => {
            try {
                return await prisma.usuario.findUnique({
                    where: {
                        id: id
                    },
                });
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        loginUsuario: async (_, { username, password }) => {
            try {
                const usuario = await prisma.usuario.findFirst({
                    where: {
                        username: username
                    },
                });
                if(usuario){
                    const checkPassword = await bcrypt.compare(password, usuario.password);
                    if(checkPassword){
                        const respuesta = {code: 1, mng: `Usuario ${username}, sesion iniciada`};
                        return respuesta;
                    } else {
                        const respuesta = {code: 2, mng: "Usuario existente, contraseña incorrecta"};
                        return respuesta;
                    }
                } else {
                    const respuesta = {code: 0, mng: "Usuario no existentes"};
                    return respuesta;
                }
            } catch (error) {
                console.log(error)
                return error;
            }
        }
    },
    Mutation: {
        newUsuario: async (_, {nombre, apellidos, username, password}) => {
            try {
                const passHash = await bcrypt.hash(password, 10);
                const n_Usuario = await prisma.usuario.create({
                    data: {
                        nombre: nombre, apellidos: apellidos, username: username, password: passHash
                    },
                })
                return n_Usuario;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        updateUsuario: async (_, {id, nombre, apellidos, username, password}) => {
            try {
                const passHash = await bcrypt.hash(password, 10);
                const updateUser = await prisma.usuario.update({
                    where: {
                      id: id,
                    },
                    data: {
                        nombre: nombre,
                        apellidos: apellidos,
                        username: username,
                        password: passHash
                    },
                })
                return updateUser;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        deleteUsuario: async (_, { id }) => {
            try {
                const deleteUser = await prisma.usuario.update({
                    where: {
                      id: id,
                    },
                    data: {
                        activo: false,
                    },
                })
                return deleteUser;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    }
};