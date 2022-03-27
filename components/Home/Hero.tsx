import { Polygon, RoundArrow } from "assets/images";
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
      <div className={classes.top}>
        <div className={classes.text}>
          <h1>
            World&apos;s <span>First and Only</span> NFT puzzle
          </h1>
        </div>
        <div className={classes.canvas}>
          {typeof window !== "undefined" && (
            <iframe src="/matter.html"></iframe>
          )}
        </div>
      </div>
      <div className={classes.ctas}>
        <button>
          <div className={classes.ps}>
            <p className={classes.p1}>Mint a random piece for</p>
            <div className={classes.polygon}>
              <Polygon />
              <p className={classes.p2}>9.0</p>
            </div>
          </div>
          <div className={classes.arrow}>
            <RoundArrow />
          </div>
        </button>
        <button>
          <div className={classes.ps}>
            <p className={classes.p1}>Go to Ennefti&apos;s</p>
            <p className={classes.p2}>Marketplace</p>
          </div>
          <div className={classes.arrow}>
            <RoundArrow />
          </div>
        </button>
      </div>
    </Section>
  );
};

export default Hero;
