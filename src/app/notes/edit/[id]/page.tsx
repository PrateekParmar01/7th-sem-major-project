import dynamic from "next/dynamic";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const ExcalidrawWrapperClient = dynamic(
  async () => (await import("./excalidrawWrapper")).default,
  {
    ssr: false,
  },
);

const Page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const { user } = session;
  return (
    <div className="absolute inset-0 top-16 flex flex-col overflow-hidden">
      <ExcalidrawWrapperClient user={user}/>
    </div>
  );
}

export default Page