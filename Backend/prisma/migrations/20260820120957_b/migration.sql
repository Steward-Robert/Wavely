-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
