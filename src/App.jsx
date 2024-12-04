// // import React from "react";
// // import {
// //   BrowserRouter as Router,
// //   Route,
// //   Routes,
// //   Navigate,
// // } from "react-router-dom";
// // import Dashboard from "./pages/Dashboard/Dashboard";
// // import LightWeightTradeRiskCalculator from "./pages/LightWeightTradeRiskCalculator/LightWeightTradeRiskCalculator";
// // import { Auth } from "./components/Auth/Auth";

// // import { OrderTable } from "./pages/OrderTable/OrderTable";

// // // A simple component to handle authentication logic
// // const PrivateRoute = ({ children }) => {
// //   const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated
// //   return isAuthenticated ? children : <Navigate to="/auth" />;
// // };

// // const App = () => {
// //   return (
// //     <Router>
// //       <main className="App">
// //         <Routes>
// //           {/* Default route opens the LightWeightTradeRiskCalculator */}
// //           <Route path="/" element={<LightWeightTradeRiskCalculator />} />

// //           {/* Authentication route */}
// //           <Route path="/auth" element={<Auth />} />

// //           {/* Dashboard is protected by authentication */}
// //           <Route
// //             path="/dashboard"
// //             element={
// //               <PrivateRoute>
// //                 <Dashboard />
// //               </PrivateRoute>
// //             }
// //           />
          
// //         </Routes>
        
// //       </main>
// //     </Router>
// //   );
// // };

// // export default App;
// import React from 'react';
// import {
//   HashRouter,
//   Routes,
//   Route,
// } from 'react-router-dom';
// import DashboardLayout from './DashboardLayout/DashboardLayout';
 

// function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<DashboardLayout />}>
           
          
//          </Route>
//       </Routes>
//     </HashRouter>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import { OrderTable } from './pages/OrderTable/OrderTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Add other routes that are part of the DashboardLayout here */}
        </Route>
        {/* Independent route for the Order Table */}
        <Route path="/order-table" element={<OrderTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
