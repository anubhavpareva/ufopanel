import PageHeader from "@/Components/Shared-ui/PageHeader";
import { Box } from "@mui/material";

export default function DashboardHome() {
  return (
    <Box width={"100%"}>
      <PageHeader title="Dashboard" />
      <Box px={1}>Dashboard</Box>
    </Box>
  );
}
