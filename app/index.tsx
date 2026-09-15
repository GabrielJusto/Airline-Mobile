import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";


export default function Index() {
  const { isSignedIn } = useAuth();

  return <Redirect href={isSignedIn ? "/ticketFilter" : "/login"} />;
}
