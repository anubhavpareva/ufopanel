import NavBar from "@/Components/Shared-ui/NavBar";
import ProtectedRoute from "@/Components/Shared-ui/ProtectedWrapper";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Box
        display={"flex"}
        flexDirection={"row"}
        minHeight={'100vh'}
        sx={{
          background: "linear-gradient(145deg, #611EC6 50%, #3B82F6 100%)",
          py: 2,
        }}
      >
        <NavBar />
        {/* <Sidebar /> */}
        {children} {/* 👈 This is the Next.js equivalent of <Outlet /> */}
      </Box>
    </ProtectedRoute>
  );
}
