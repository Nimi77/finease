import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard h-screen flex">
      <Sidebar/>

      <div className="flex-1">
        <Header/>
        <main className="px-6 pt-4">
          <h2>....</h2>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;