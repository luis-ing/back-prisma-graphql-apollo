const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
// Incluimos los archivos
//const {typeDefs} =require('./typeDefs')
const typeDefs = gql`
    type Clasificacion {
        idclasificacion: ID!
        titulo_clasificacion: String
        fecha_creada: String
        estatus: Int
    }

    type Prioridad_tareas {
        id_prioridad_tareas: ID!
        titulo_prioridad: String!
    }

    type Tareas {
        idtareas: ID!
        titulo: String
        contenido: String
        creado_por: Int
        asignado: Int
        fecha_creada: String
        idclasificacion: [Clasificacion]
        id_prioridad_tareas:Int
    }

    type Usuario {
        idusuario: ID!
        nombre: String
        apellidos: String
        alias: String
        contrasena: String
        estatus_activo: Int
    }

    input usuarioInput {
        nombre: String
        apellidos: String
        alias: String
        contrasena: String
        estatus_activo: Int
    }

    type Query {
        hello: String
        allClasification: [Clasificacion]!
        allUsuario: [Usuario]!
        allPrioridad: [Prioridad_tareas]!
        allTareas: [Tareas]!
    }

    type Mutation {
        addUsuario(
            nombre: String!
            apellidos: String!
            alias: String
            contrasena: String
            estatus_activo: Int
        ): Usuario

        updateUsuario( idusuario: ID!, data: usuarioInput ): Usuario

    }
`

//const {resolvers} = require('./resolvers')
const resolvers = {
    Query: {
        hello: () => 'Hello world',
        allClasification: () => {
            return prisma.clasificacion.findMany();
        },
        allUsuario: () => {
            return prisma.usuario.findMany();
        },
        allPrioridad: () => {
            return prisma.prioridad_tareas.findMany()
        },
        allTareas: () => {
            return prisma.tareas.findMany({

            })
        }
    },

    Mutation: {
        addUsuario: async (root, arg) => {
            console.log(arg);
            const insert_usuario = await prisma.usuario.create({
                data: arg//{ nombre_usuario: 'arg', contrasena: '12345a' }, //funciona 
            })
            return insert_usuario;
        },
        updateUsuario: async (_, { idusuario, data }) => {
            const { nombre, apellidos, alias,contrasena, estatus_activo } = data;
            console.log("idusuario= ", idusuario, "data= ", nombre);

            const upd_user = await prisma.usuario.update({
                where: { idusuario: parseInt(idusuario) },
                data: { nombre, apellidos, alias, contrasena , estatus_activo }
            })
            return upd_user;
        }
    }
};

// Iniciamos express
const app = express();

// De esta manera podemos integrar un API
app.get('/', (req, res) => res.send('Bienvenidoa mi API'))

app.set('port', process.env.PORT || 4000);

module.exports = app;

async function start() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    // La funcion "start()" inicializa las funciones de apollo
    await apolloServer.start()

    // 
    apolloServer.applyMiddleware({app})

    app.use('*', (req, res) => res.status(404).send('Not found'))

    // Configuración tipica de servidor express
    app.listen(app.get('port'), () => {
        console.log(`Servidor en puerto ${ app.get('port') }`)
    })
}

start();
/*
const persons = [
    {
        name: "Midu",
        phone: "043-1234567",
        street: "Calle Frontend",
        city: "Barcelona",
        id: "8238489-342-11e9-bc57-3b4534a3c1"
    },
    {
        name: "Youseff",
        phone: "043-1234567",
        street: "Avenida Fullstack",
        city: "Mataro",
        id: "8238489-342-11e9-bc57-3b4534a3c1"
    },
    {
        name: "Itzi",
        street: "Pasaje Testing",
        city: "Barcelona",
        id: "8238489-342-11e9-bc57-3b4534a3c1"
    },
    {
        name: "Luis",
        phone: "043-1234567",
        street: "Calle Full-stack",
        city: "Mty",
        id: "8238489-342-11e9-bc57-3b4534a3c1"
    }
];

const typeDefinitions = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server listo en ${url}`)
})
*/