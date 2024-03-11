import { Button } from "@nextui-org/react";
import * as actions from "@/app/actions";
import { auth } from "@/auth";
import Profile from "@/components/Profile";


export default async function Home() {

  const session = await auth()


  return (
    <>
      <form action={actions.signIn}>
        <Button type="submit">Login</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Logout</Button>
      </form>
      {
        session?.user ? <div>{JSON.stringify(session.user)}</div> :
        <div>Signed Out</div>
      }
      <Profile />
    </>
  );
}
