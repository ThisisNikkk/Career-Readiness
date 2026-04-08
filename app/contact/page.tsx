import ContactClient from "../components/ContactClient";
import { cacheLife } from "next/cache";

export default async function ContactPage() {
  "use cache";
  cacheLife("days");

  return <ContactClient />;
}