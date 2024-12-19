import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/Authentication/Login/Page";
import RegisterPage from "./pages/Authentication/Register/Page";
import LocationPage from './pages/Locations/Page';
import CreateLocation from './pages/Locations/Create/Page';
import EditLocationPage from './pages/Locations/Edit/Page';
import HelloWorldPage from "./pages/HelloWorld/Page";
import HelloWorldPythonPage from "./pages/HelloWorldPython/Page";
import ErrorBoundary from './pages/components/ErrorBoundary';
import PrivateRoute from "./pages/components/PrivateRoute";

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />

                    {/* Protected Routes */}
                    <Route element={<PrivateRoute />}>
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
        </ErrorBoundary>
    );
}

export default App;
