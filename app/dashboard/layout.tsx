import NavBar from "@/Components/Shared-ui/NavBar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      sx={{ background: "linear-gradient(145deg, #611EC6 50%, #3B82F6 100%)", height:'100vh' }}
    >
      <NavBar />
      {/* <Sidebar /> */}
      {children} {/* 👈 This is the Next.js equivalent of <Outlet /> */}
    </Box>
  );
}
