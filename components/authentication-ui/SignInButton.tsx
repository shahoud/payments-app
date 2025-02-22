import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const SignInButton = ({ callbackUrl }: { callbackUrl: string | undefined }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: callbackUrl });
      }}
    >
      <Button className="w-40" type="submit">
        SignIn / Google
        <LogIn color="yellow" />
      </Button>
    </form>
  );
};

export default SignInButton;
