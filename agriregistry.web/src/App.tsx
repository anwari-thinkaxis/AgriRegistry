import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationPage from './pages/Locations/Page';
import CreateLocation from './pages/Locations/Create/Page';
import EditLocationPage from './pages/Locations/Edit/Page';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/locations" element={<LocationPage />} />
                <Route path="/locations/create" element={<CreateLocation />} />
                <Route path="/location/edit/:id" element={<EditLocationPage />} />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
