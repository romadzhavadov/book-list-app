import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEditBook from "./pages/AddEditBook";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard  />} />
      <Route path="/add" element={<AddEditBook />} />
      <Route path="/edit/:id" element={<AddEditBook />} />
    </Routes>
  );
};

export default AppRouter;
