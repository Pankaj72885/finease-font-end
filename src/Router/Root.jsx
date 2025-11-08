import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="font-inter flex flex-col h-screen">
      <header>This is header</header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer>This is footer</footer>
    </div>
  );
};

export default Root;
