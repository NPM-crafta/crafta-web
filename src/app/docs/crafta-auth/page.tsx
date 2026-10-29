import { redirect } from "next/navigation";

export default function AuthDocsRoot() {
  redirect("/docs/crafta-auth/overview");
}