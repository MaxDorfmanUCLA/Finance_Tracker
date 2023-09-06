import './App.css';
import React from 'react';
import { Link, Route, Routes, Router, IndexRoute } from 'react-router';
// import Nav from 'Nav';
// import Nav from './nav';
import { useNavigate } from "react-router-dom";
// import Header from 'Header'
// COMPONENTS
import Dashboard from './dashboard';
import Login from './login';
import Signup from './signup';

//   <Route exact path="/" element={<Home/>}/>
//   <Route exact path="/signup" element={<Signup/>}/>
// function App() {
//   // const navigate = useNavigate();
//   return (
//     <div className="App">
//       <Login></Login>
//       <Nav/>
//         <Routes>
//           <Route exact path="/" element={<Signup/>}/>
//           <Route exact path="/login" element={<Login/>}/>
//           <Route exact path="/dashboard" element={<Dashboard/>}/>
//         </Routes>
//     </div>
//   );
// }

// const NavRoute = ({exact, path, component: Component}) => (
//   <Route exact={exact} path={path} render={(props) => (
//     <div>
//       <h1>FinTracker</h1>
//       <Component {...props}/>
//     </div>
//   )}/>
// )

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

// export default class App extends React.Component {
//   render() {    
//     return (
//       <div className="App">
//         <Router>
//             <Routes>
//               <Route exactly component={Login} pattern="/" />
//               <Route exactly component={Signup} pattern="/signup" />
//               <Route exactly component={Dashboard} pattern="/dashboard" />
//             </Routes>
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;
