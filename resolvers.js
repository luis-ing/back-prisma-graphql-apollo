const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
//const {persons,Usuarios,Clasificacion} =require('./db')
const resolvers = {
    Query: {
        hello: () => 'Hello world',
        personCount: () => persons.length,
        allPersons: () => persons,
        allClasification: () => {
            return prisma.allClasification.findMany();
        },
    },
};

module.exports = {resolvers}