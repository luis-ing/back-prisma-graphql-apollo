-- CreateTable
CREATE TABLE `clasificacion` (
    `idclasificacion` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_clasificacion` VARCHAR(45) NULL,
    `fecha_creada` VARCHAR(45) NULL,
    `estatus` BOOLEAN NULL,

    PRIMARY KEY (`idclasificacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prioridad_tareas` (
    `id_prioridad_tareas` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_prioridad` VARCHAR(45) NULL,

    PRIMARY KEY (`id_prioridad_tareas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tareas` (
    `idtareas` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(45) NULL,
    `contenido` TEXT NULL,
    `creado_por` INTEGER NOT NULL,
    `asignado` INTEGER NOT NULL,
    `fecha_creada` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `idclasificacion` INTEGER NULL,
    `id_prioridad_tareas` INTEGER NULL,

    INDEX `fk_tareas_clasificacion_idx`(`idclasificacion`),
    INDEX `fk_tareas_prioridad_tareas1_idx`(`id_prioridad_tareas`),
    PRIMARY KEY (`idtareas`, `creado_por`, `asignado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `idusuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NULL,
    `apellidos` VARCHAR(45) NULL,
    `alias` VARCHAR(45) NULL,
    `contrasena` VARCHAR(45) NULL,
    `estatus` VARCHAR(45) NULL,

    PRIMARY KEY (`idusuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `fk_tareas_clasificacion` FOREIGN KEY (`idclasificacion`) REFERENCES `clasificacion`(`idclasificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `fk_tareas_prioridad_tareas1` FOREIGN KEY (`id_prioridad_tareas`) REFERENCES `prioridad_tareas`(`id_prioridad_tareas`) ON DELETE NO ACTION ON UPDATE NO ACTION;
