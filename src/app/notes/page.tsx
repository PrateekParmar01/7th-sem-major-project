import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import NotesTable from "@/components/NotesTable";

const Page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const { user } = session;
  
  return (
    <NotesTable userId={user.id} />
  )
}

export default Page;

