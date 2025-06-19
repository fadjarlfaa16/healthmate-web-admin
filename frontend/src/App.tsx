import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./screens/Users";
import Appointment from "./screens/Appointment";
import Doctors from "./screens/Doctors";
import Article from "./screens/News";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4 overflow-auto">
          <SidebarTrigger />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/article" element={<Article />} />
          </Routes>
        </main>
      </SidebarProvider>
    </Router>
  );
};

export default App;
