-- CreateTable
CREATE TABLE "Wedding" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "BrideName" TEXT NOT NULL,
    "GroomName" TEXT NOT NULL,
    "Date_Wedding" DATETIME NOT NULL,
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
    "Groom_SocialURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guest" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "NoWhatsapp" TEXT NOT NULL,
    "Kode" TEXT NOT NULL,
    "Jml" INTEGER NOT NULL,
    "Date_Modified" DATETIME NOT NULL,
    "Date_Added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "WeddingId" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Guest_WeddingId_fkey" FOREIGN KEY ("WeddingId") REFERENCES "Wedding" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Wish" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "GuestId" TEXT NOT NULL,
    "Wish" TEXT NOT NULL,
    "Donate" REAL,
    CONSTRAINT "Wish_GuestId_fkey" FOREIGN KEY ("GuestId") REFERENCES "Guest" ("UUID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_Email_key" ON "Guest"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Wish_GuestId_key" ON "Wish"("GuestId");
