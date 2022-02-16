import React from "react";
import { Logo } from "../../assets";
import classes from "../../styles/components/common/Header.module.scss";
import Section from "./Section";

export default function Header() {
  return (
    <Section className={classes.container}>
      <Logo />
    </Section>
  );
}
