import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button className="w-40" type="submit">
        sign Out
        <LogOut color="yellow" />
      </Button>
    </form>
  );
};

export default SignOutButton;
