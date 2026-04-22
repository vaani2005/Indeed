// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Job from "./pages/Job";
// import JobSearchPage from "./pages/JobSearchPage";
// import LoginSignupPage from "./pages/LoginSignupPage";
// import "./index.css";
// import "./Home.css";
// import "./JobSearch.css";
// import "./login.css";
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/Home" element={<Home />} />
//         <Route path="/" element={<JobSearchPage />} />
//         <Route path="/jobs" element={<Job />} />
//         <Route path="/loginsignup" element={<LoginSignupPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Job from "./pages/Job";
import JobSearchPage from "./pages/JobSearchPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import AddJob from "./components/AddJob";
import EmployerLoginPage from "./pages/EmployerLoginPage";
import EmployerInfoPage from "./pages/EmployerInfoPage";
import EmployerDashboardPage from "./pages/EmployerDashboardPage";
import CompanyReviewPage from "./pages/CompanyReviewPage";
import ContactInfoPage from "./pages/ContactInfoPage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import ResumeSelectionPage from "./pages/ResumeSelectionPage";
import "./index.css";
import "./Home.css";
import "./JobSearch.css";
import "./login.css";
import "./AddJob.css";
import "./EmployerInfo.css";

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/employer-login" element={<EmployerLoginPage />} />
      <Route path="/employer-info" element={<EmployerInfoPage />} />
      <Route path="/employer-dashboard" element={<EmployerDashboardPage />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/" element={<JobSearchPage />} />
      <Route path="/loginsignup" element={<LoginSignupPage />} />
      <Route path="/jobs" element={<Job />} />
      <Route path="/company-review" element={<CompanyReviewPage />} />

      {/* Application Flow Routes */}
      <Route path="/application/contact" element={<ContactInfoPage />} />
      <Route path="/application/location" element={<LocationDetailsPage />} />
      <Route path="/application/resume" element={<ResumeSelectionPage />} />
    </Routes>
  );
}

// employee
// JobSearchPage ----LoginSignupPage-----Job

// employer
// home-----EmployerLoginPage----EmployerInfoPage(employee database----dashboard of each employee(employee database)---add-job----jobs
