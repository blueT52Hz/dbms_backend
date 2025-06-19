-- CreateTable
CREATE TABLE "regions" (
    "region_id" TEXT NOT NULL,
    "region_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("region_id")
);

-- CreateTable
CREATE TABLE "cities" (
    "city_id" TEXT NOT NULL,
    "city_name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "region_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "weather_histories" (
    "weather_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "temp_current" DOUBLE PRECISION NOT NULL,
    "temp_min" DOUBLE PRECISION NOT NULL,
    "temp_max" DOUBLE PRECISION NOT NULL,
    "temp_feels_like" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "wind_speed" DOUBLE PRECISION NOT NULL,
    "precipitation" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weather_histories_pkey" PRIMARY KEY ("weather_id")
);

-- CreateTable
CREATE TABLE "air_qualities" (
    "aqi_id" TEXT NOT NULL,
    "weather_id" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "co" DOUBLE PRECISION NOT NULL,
    "no" DOUBLE PRECISION NOT NULL,
    "no2" DOUBLE PRECISION NOT NULL,
    "o3" DOUBLE PRECISION NOT NULL,
    "so2" DOUBLE PRECISION NOT NULL,
    "pm2_5" DOUBLE PRECISION NOT NULL,
    "pm10" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "air_qualities_pkey" PRIMARY KEY ("aqi_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_region_name_key" ON "regions"("region_name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_city_name_key" ON "cities"("city_name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "air_qualities_weather_id_key" ON "air_qualities"("weather_id");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("region_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weather_histories" ADD CONSTRAINT "weather_histories_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "air_qualities" ADD CONSTRAINT "air_qualities_weather_id_fkey" FOREIGN KEY ("weather_id") REFERENCES "weather_histories"("weather_id") ON DELETE RESTRICT ON UPDATE CASCADE;
