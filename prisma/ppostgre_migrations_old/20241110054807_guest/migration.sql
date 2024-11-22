/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Wedding" (
    "UUID" TEXT NOT NULL,
    "BrideName" TEXT NOT NULL,
    "GroomName" TEXT NOT NULL,
    "Date_Wedding" TIMESTAMP(3) NOT NULL,
    "Location" TEXT NOT NULL,
    "Link_Maps" TEXT NOT NULL,
    "Link_Streaming" TEXT NOT NULL,
    "Link_Website" TEXT NOT NULL,
    "GroomParent" TEXT NOT NULL,
    "BrideParent" TEXT NOT NULL,
    "Hastag" TEXT NOT NULL,
    "Bride_Social" TEXT NOT NULL,
    "Bride_SocialURL" TEXT NOT NULL,
    "Groom_Social" TEXT NOT NULL,
    "Groom_SocialURL" TEXT NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Guest" (
    "UUID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "NoWhatsapp" TEXT NOT NULL,
    "Kode" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Jml" INTEGER NOT NULL,
    "Date_Modified" TIMESTAMP(3) NOT NULL,
    "Date_Added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "WeddingId" TEXT,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Wish" (
    "UUID" TEXT NOT NULL,
    "GuestId" TEXT NOT NULL,
    "Wish" TEXT NOT NULL,
    "Donate" DOUBLE PRECISION,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("UUID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_Email_key" ON "Guest"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Wish_GuestId_key" ON "Wish"("GuestId");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_WeddingId_fkey" FOREIGN KEY ("WeddingId") REFERENCES "Wedding"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wish" ADD CONSTRAINT "Wish_GuestId_fkey" FOREIGN KEY ("GuestId") REFERENCES "Guest"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;
