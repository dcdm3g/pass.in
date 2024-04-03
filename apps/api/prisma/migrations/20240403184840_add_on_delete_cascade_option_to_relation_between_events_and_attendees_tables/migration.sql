-- DropForeignKey
ALTER TABLE "attendees" DROP CONSTRAINT "attendees_event_id_fkey";

-- AddForeignKey
ALTER TABLE "attendees" ADD CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
