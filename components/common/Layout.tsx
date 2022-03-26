import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";
import classes from "styles/common/Layout.module.scss";

const Layout: FC = ({ children }) => (
  <div className={classes.container}>
    <Header />
    <main className={classes.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
