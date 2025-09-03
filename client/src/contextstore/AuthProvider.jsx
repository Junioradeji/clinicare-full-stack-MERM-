import { AuthContext } from ".";
import { useState, useEffect } from "react";
import { getAuthenticatedUser, refreshAccessToken } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import LazyLoader from "@/components/LazyLoader";

export default function AuthProvider({ children }) {
  //set and save accessToken in state memory
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); //default value of logged in user


  //query to refresh accessToken on app start
  useQuery({
    queryKey: ["refresh_token"],
    queryFn: async () => {
      const res = await refreshAccessToken();
      // make api call to get new accessToken, then update it in our accessToken state using the setAccessToken setter function
      if (res.status === 200) {
        const newAccessToken = res.data?.data?.accessToken;
        setAccessToken(newAccessToken);
        return res;
      } else {
        return null;
      }

    },
    onError: (error) => {
      console.error("Error refreshing access token", error);
      setAccessToken(null); // clear accessToken on error
    },
    enabled: !accessToken, // ensure it runs only when we dont have acceesToken
    retry: false, // dont run again if queryFn fails
  });

  //fetch auth user
const { isPending, data } = useQuery({
    queryKey: ["auth_user", accessToken],
    queryFn: () => getAuthenticatedUser(accessToken),
    onError: async (error) => {
      console.error("Error fetching user", error);
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data?.status === 200) {
      setUser(data?.data?.data);
    }
  }, [data?.data?.data, data?.status]);
  // console.log(user);
  // console.log(accessToken);

  if (isPending && accessToken) {
    // show a loading spinner while fetching user
    return <LazyLoader />;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}
