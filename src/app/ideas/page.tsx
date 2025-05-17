import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import IdeaGenerator from "./IdeaGenerator";

export default async function IdeasPage() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <IdeaGenerator />;
}
