import { AuthContext } from ".";
import { useState } from "react";
import { getAuthenticatedUser, refreshAccessToken } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import LazyLoader from "@/components/LazyLoader";

export default function AuthProvider({ children }) {
  //set and save accessToken in state memory
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); //default value of logged in user
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  //query to refresh accessToken on app start
  useQuery({
    queryKey: ["refresh_token"],
    queryFn: async () => {
      setIsAuthenticating(true); //set isAuthenticating to true while refreshing token
      const res = await refreshAccessToken;
      // make api call to get new accessToken, then update it in our accessToken state using the setAccessToken setter function
      if (res.status === 200) {
        const newAccessToken = res.data?.data?.accessToken;
        setAccessToken(newAccessToken);
        setIsAuthenticating(false); //set isAuthenticating to false after refreshing token
        return res;
      } else {
        setAccessToken(null); // if res. status is not 200, remove the accessToken and force a logout
        setIsAuthenticating(false); //set isAuthenticating to false if refreshing token fails
        return null;
      }

    },
    enabled: !accessToken, // ensure it runs only when we dont have acceesToken
    retry: false, // dont run again if queryFn fails
  });

  //fetch auth user
  useQuery({
    queryKey: ["auth_user"], //cache key for our api call
    queryFn: async () => {
      setIsAuthenticating(true); //set isAuthenticating to true while fetching user
      const res = await getAuthenticatedUser(accessToken);
      if (res.status === 200) {
        setUser(res.data?.data);  //hold the value from our res in user state
        setIsAuthenticating(false); //set isAuthenticating to false after fetching user
        return res;
      }
      setIsAuthenticating(false); //set isAuthenticating to false if fetching user fails
      return null;
    },
    onError: (error) => {
      console.error("Error fetching user", error);
    },
    enabled: !!accessToken
  });
  console.log(user);
  console.log(accessToken);

  if (isAuthenticating) {
    // show a loading spinner while fetching user
    return <LazyLoader />;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}
