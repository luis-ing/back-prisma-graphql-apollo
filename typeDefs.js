const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Persons {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }

    type Users {
        idusuario: ID!
        nombre: String
        apellidos: String
        alias: String
        contrasena: String
        estatus: Int
    }

    type Clasificacion {
        idclasificacion: ID!
        titulo_clasificacion: String
        fecha_creada: String
        estatus: Boolean
    }

    type Query {
        hello: String
        personCount: Int!
        allPersons: [Persons]!
        allUsers: [Users]
        allClasification: [Clasificacion]
    }
`

module.exports = {typeDefs}