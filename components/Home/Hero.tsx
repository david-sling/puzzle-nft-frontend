import Section from "components/common/Section";
import { FC } from "react";
import classes from "styles/Home/Hero.module.scss";

const Hero: FC = () => {
  return (
    <Section className={classes.container}>
      <div className={classes.left}>
        <h1>
          World&apos;s <span>First and Only</span> NFT puzzle
        </h1>
      </div>
    </Section>
  );
};

export default Hero;
