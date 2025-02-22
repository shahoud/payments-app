//The id is part of our session object but not included in the default Session type,we extend the type definition as follows:

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
  }

  // interface jwt {
  //   id: string;
  // }
}
