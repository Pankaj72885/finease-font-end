import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="font-inter flex flex-col h-screen">
      <Header></Header>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
