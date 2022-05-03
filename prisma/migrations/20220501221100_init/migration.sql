/*
  Warnings:

  - You are about to alter the column `fecha_creada` on the `clasificacion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `DateTime(0)`.
  - You are about to drop the column `estatus` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clasificacion` MODIFY `fecha_creada` DATETIME(0) NULL,
    MODIFY `estatus` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `estatus`,
    ADD COLUMN `estatus_activo` INTEGER NULL;
