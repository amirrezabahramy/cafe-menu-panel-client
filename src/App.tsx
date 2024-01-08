import "./App.css";
import Snackbar from "./components/generic/Snackbar";
import AuthProvider from "./contexts/AuthProvider";
import LocalConfigProvider from "./contexts/LocalConfigProvider";
import QueryClientProvider from "./contexts/QueryClientProvider";
import RouterProvider from "./contexts/RouterProvider";
import SnackbarProvider from "./contexts/SnackbarProvider";
import ThemeProvider from "./contexts/ThemeProvider";

// Start
function App() {
  return (
    <>
      <AuthProvider>
        <LocalConfigProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <QueryClientProvider>
                {/* App */}
                <RouterProvider />
                <Snackbar />
                {/* App */}
              </QueryClientProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </LocalConfigProvider>
      </AuthProvider>
    </>
  );
}

export default App;
