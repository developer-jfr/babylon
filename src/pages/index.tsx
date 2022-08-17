import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { PrizesModule } from "../modules";
import AreaPage from "./area";
import AuthPersonalAreaPage from "./auth/personal-area";
import RegisterEndPage from "./auth/register-end";
import SignInPage from "./auth/sign-in";
import HomePage from "./home";
import InformationPage from "./information";
import PersonalAreaPage from "./personal-area";
import SignUpPage from "./auth/sign-up";
import StatisticsPage from "./statistics";
import StrategyPage from "./strategy";
import WorkersPage from "./workers";

const MainPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/personal-area" element={<AuthPersonalAreaPage />} />
        <Route path="/auth/register-end" element={<RegisterEndPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/area" element={<AreaPage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/personal-area" element={<PersonalAreaPage />} />
        <Route path="/strategy" element={<StrategyPage />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/prizes"  element={<PrizesModule />} />
      </Routes>
    </Router>
  );
};

export default MainPage;
