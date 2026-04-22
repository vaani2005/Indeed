import Bottom from "../components/Bottom";
import { Dashboard } from "../components/Dashboard";
import { Hero } from "../components/Hero";
import { ManageHiring } from "../components/ManageHiring";
import { Navbarr } from "../components/Navbarr";
import { PostJob } from "../components/PostJob";
import { Review } from "../components/Review";
import { VisitUs } from "../components/VisitUs";

function Home() {
  return (
    <div>
      <Navbarr />
      <Hero />
      <ManageHiring />
      <Dashboard />
      <Review />
      <PostJob />
      <VisitUs />
      <Bottom />
    </div>
  );
}

export default Home;
