import Section from "components/common/Section";
import { Puzzle } from "config/ethereum";
import { FC, useEffect, useState } from "react";
import classes from "styles/Home/Hero.module.scss";

const Hero: FC = () => {
  useEffect(() => {
    Puzzle.getTotalMinted()
      .then((total) => console.log({ total: parseInt(total.toString()) }))
      .catch((err) => console.log({ err }));
    Puzzle.owner().then((owner) => console.log({ owner }));
  }, []);
  return (
    <Section
      className={classes.container}
      innerClassName={classes.innerContainer}
    >
      <div className={classes.left}>
        <h1>
          World&apos;s <span>First and Only</span> NFT puzzle
        </h1>
      </div>
      <div className={classes.right}>
        <iframe src="/matter.html"></iframe>
      </div>
    </Section>
  );
};

export default Hero;
