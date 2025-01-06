import LoginPage from "./pages/Authentication/Login/Page";
import RegisterPage from "./pages/Authentication/Register/Page";

import ProducePage from "./pages/Produces/Page";
import FarmPage from "./pages/Farms/Page";
import CreateFarmPage from "./pages/Farms/Create/Page";
import FarmDetailsPage from "./pages/Farms/[id]/Page";
import LocationPage from "./pages/Locations/Page";
import CreateLocation from "./pages/Locations/Create/Page";
import EditLocationPage from "./pages/Locations/Edit/Page";
import HelloWorldPage from "./pages/HelloWorld/Page";
import HelloWorldPythonPage from "./pages/HelloWorldPython/Page";
import ErrorBoundary from "./pages/components/ErrorBoundary";
import PrivateRoute from "./pages/components/PrivateRoute";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./pages/components/AppSidebar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full">
          <SidebarTrigger className="sticky top-0" />
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/produces" element={<ProducePage />} />

              <Route path="/farms" element={<FarmPage />} />
              <Route path="/farms/create" element={<CreateFarmPage />} />
              <Route path="/farms/:id" element={<FarmDetailsPage />} />

              <Route path="/locations" element={<LocationPage />} />
              <Route path="/locations/create" element={<CreateLocation />} />
              <Route path="/location/edit/:id" element={<EditLocationPage />} />
            </Route>

            <Route path="/HelloWorld" element={<HelloWorldPage />} />
            <Route
              path="/HelloWorldPython"
              element={<HelloWorldPythonPage />}
            />

            {/* Default Route */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
      </SidebarProvider>
    </ErrorBoundary>
  );
}

export default App;
