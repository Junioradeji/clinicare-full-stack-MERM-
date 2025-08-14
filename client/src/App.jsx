import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./contextstore/AuthProvider";

const queryClient = new QueryClient()

export default function App() {
  return (
    <>
    <Toaster position = "top-right" richColors />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider> 
    </QueryClientProvider>

  
    </>
  );
}
