import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import { useAuthContext } from "./context";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/AuthSore";
import { useEffect } from "react";

// Create the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 1, // Retry once on failure
      staleTime: 1000 * 60, // Data is fresh for 1 minute
    },
  },
});

const App = () => {
  const { userLoading } = useAuthContext();



  if (userLoading) {
    return <Loader />;
  }



  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
