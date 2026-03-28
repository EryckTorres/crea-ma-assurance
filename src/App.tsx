import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import UploadCAT from "@/pages/UploadCAT";
import MyProcesses from "@/pages/MyProcesses";
import ProcessingFeedback from "@/pages/ProcessingFeedback";
import ResultPage from "@/pages/ResultPage";
import ProcessList from "@/pages/ProcessList";
import ProcessDetail from "@/pages/ProcessDetail";
import Analytics from "@/pages/Analytics";
import SystemSettings from "@/pages/SystemSettings";
import SemanticSearch from "@/pages/SemanticSearch";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadCAT /></ProtectedRoute>} />
      <Route path="/my-processes" element={<ProtectedRoute><MyProcesses /></ProtectedRoute>} />
      <Route path="/processing" element={<ProtectedRoute><ProcessingFeedback /></ProtectedRoute>} />
      <Route path="/result/:id" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      <Route path="/processes" element={<ProtectedRoute><ProcessList /></ProtectedRoute>} />
      <Route path="/process/:id" element={<ProtectedRoute><ProcessDetail /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
      <Route path="/system-health" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SemanticSearch /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
