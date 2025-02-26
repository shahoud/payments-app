// import { cn } from "@/lib/utils";
// import { signIn } from "@/auth"; // Adjust to match your `signIn` import path
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   async function handleGoogleLogin() {
//     "use server"; // Server action
//     await signIn("google", { redirectTo });
//   }

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Login</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-6">
//             <form>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input id="password" type="password" required />
//               </div>
//               <Button type="submit" className="w-full">
//                 Login
//               </Button>
//             </form>

//             <form action={handleGoogleLogin}>
//               <Button variant="outline" className="w-full" type="submit">
//                 Login with Google
//               </Button>
//             </form>

//             <div className="mt-4 text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <a href="#" className="underline underline-offset-4">
//                 Sign up
//               </a>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
