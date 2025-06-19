/*
  Warnings:

  - Added the required column `nh3` to the `air_qualities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "air_qualities" ADD COLUMN     "nh3" DOUBLE PRECISION NOT NULL;
