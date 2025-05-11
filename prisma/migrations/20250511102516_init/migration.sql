-- CreateTable
CREATE TABLE "AgeGroupSavings" (
    "ageGroup" TEXT NOT NULL PRIMARY KEY,
    "savings" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "EducationDistribution" (
    "ageRange" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "probability" REAL NOT NULL,

    PRIMARY KEY ("ageRange", "educationLevel")
);

-- CreateTable
CREATE TABLE "IncomeDistribution" (
    "ageRange" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "baseIncome" INTEGER NOT NULL,
    "multiplier" REAL NOT NULL,

    PRIMARY KEY ("ageRange", "educationLevel")
);
