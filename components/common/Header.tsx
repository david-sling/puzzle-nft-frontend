import React from "react";
import { Logo } from "assets/images";
import classes from "styles/common/Header.module.scss";
import Section from "./Section";

export default function Header() {
  return (
    <Section
      className={classes.container}
      innerClassName={classes.innerContainer}
    >
      <div className={classes.header}>
        <div className={classes.logo}>
          <Logo viewBox="0 0 28 23" />
          <h1>Ennefti</h1>
        </div>
        <nav className={classes.nav}>
          <p>ABOUT US</p>
          <p>MY PUZZLE</p>
          <p>MARKETPLACE</p>
          <button>MINT</button>
        </nav>
      </div>
    </Section>
  );
}
