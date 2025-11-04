"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/rtk/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/mui-theme";
import GlobalAlert from "./Shared-ui/GlobalAlert";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalAlert/>
        {children}
      </ThemeProvider>
      </PersistGate>
      </Provider>
  );
}
