import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <>
      <MainNavigation />
      <main className="main-content">{props.children}</main>
      <footer className="bg-dark text-center text-white">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright: Filip Mlýnek
        </div>
      </footer>
    </>
  );
};

export default Layout;
