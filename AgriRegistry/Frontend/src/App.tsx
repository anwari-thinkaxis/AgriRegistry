import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/Authentication/Login/Page";
import RegisterPage from "./pages/Authentication/Register/Page";
import FarmPage from "./pages/Farms/Page";
import CreateFarmPage from "./pages/Farms/Create/Page";
import LocationPage from './pages/Locations/Page';
import CreateLocation from './pages/Locations/Create/Page';
import EditLocationPage from './pages/Locations/Edit/Page';
import HelloWorldPage from "./pages/HelloWorld/Page";
import HelloWorldPythonPage from "./pages/HelloWorldPython/Page";
import ErrorBoundary from './pages/components/ErrorBoundary';
import PrivateRoute from "./pages/components/PrivateRoute";
import Header from './pages/components/Header';
import { SidebarProvider } from './components/ui/sidebar';
import { AppSidebar } from './pages/components/AppSidebar';

function App() {
    return (
        <ErrorBoundary>
            <SidebarProvider>
                <AppSidebar />
                <Router>
                    <Routes>
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/register" element={<RegisterPage />} />

                        {/* Protected Routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/farms" element={<FarmPage />} />
                            <Route path="/farms/create" element={<CreateFarmPage />} />

                            <Route path="/locations" element={<LocationPage />} />
                            <Route path="/locations/create" element={<CreateLocation />} />
                            <Route path="/location/edit/:id" element={<EditLocationPage />} />
                        </Route>

                        <Route path="/HelloWorld" element={<HelloWorldPage />} />
                        <Route path="/HelloWorldPython" element={<HelloWorldPythonPage />} />

                        {/* Default Route */}
                        <Route path="*" element={<div>Page Not Found</div>} />
                    </Routes>
                </Router>
            </SidebarProvider>
        </ErrorBoundary>
    );
}

export default App;
