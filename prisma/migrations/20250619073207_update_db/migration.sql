/*
  Warnings:

  - You are about to drop the column `precipitation` on the `weather_histories` table. All the data in the column will be lost.
  - Added the required column `rain_amount` to the `weather_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uv` to the `weather_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weather_histories" DROP COLUMN "precipitation",
ADD COLUMN     "rain_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "uv" DOUBLE PRECISION NOT NULL;
