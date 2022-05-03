const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Consulta de todos los usuario
const Usuarios = async () => {
    const consulta_usuarios = await prisma.usuario.findMany()
    console.log(consulta_usuarios)
    return consulta_usuarios;
}

// Consulta de todos los usuario
const Clasificacion = async () => {
    const consulta_usuarios = await prisma.usuario
    console.log(consulta_usuarios)
    return consulta_usuarios;
}

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

module.exports = [persons, Usuarios, Clasificacion]