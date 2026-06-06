-- DropIndex
DROP INDEX "Cutoff_exam_year_category_idx";

-- AlterTable
ALTER TABLE "Cutoff" ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'Gender-Neutral',
ADD COLUMN     "quota" TEXT NOT NULL DEFAULT 'AI',
ADD COLUMN     "round" INTEGER NOT NULL DEFAULT 6;

-- CreateIndex
CREATE INDEX "Cutoff_exam_year_category_quota_gender_round_idx" ON "Cutoff"("exam", "year", "category", "quota", "gender", "round");
