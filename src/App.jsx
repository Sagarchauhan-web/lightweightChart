 

  // import Dashboard from "./pages/Dashboard/Dashboard"; // Importing Dashboard component
 
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LightWeightTradeRiskCalculator from "./pages/LightWeightTradeRiskCalculator/LightWeightTradeRiskCalculator";
import { Auth } from "./components/Auth/Auth";

// A simple component to handle authentication logic
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <main className="App">
        <Routes>
          {/* Default route opens the LightWeightTradeRiskCalculator */}
          <Route path="/" element={<LightWeightTradeRiskCalculator />} />
          
          {/* Authentication route */}
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard is protected by authentication */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";

// const App = () => {
//   return (
//     <Router>
//       <main className="App">
//         <Routes>
//           {/* Dashboard route accessible without authentication */}
//           <Route path="/dashboard/home" element={<Dashboard />} />
          
//           {/* Redirect to Dashboard by default */}
//           <Route path="*" element={<Navigate to="/dashboard/home" />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;
