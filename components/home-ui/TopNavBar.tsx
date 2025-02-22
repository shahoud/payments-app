import { auth, signIn, signOut } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";

const TopNavBar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between bg-slate-800 text-white h-12 p-4">
      <section>
        <h4>Taskati</h4>
      </section>
      <section>
        {session && session.user ? (
          <section className="flex gap-5">
            <Link href="/dashboard">Manage</Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button name="signout" type="submit">
                Sign Out
              </button>
            </form>
          </section>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button name="signout" type="submit">
              Sign In
            </Button>
          </form>
        )}
      </section>
    </nav>
  );
};

export default TopNavBar;
