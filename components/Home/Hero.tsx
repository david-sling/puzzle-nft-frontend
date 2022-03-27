import { Polygon, RoundArrow } from "assets/images";
import Section from "components/common/Section";
import { MINT_PRICE, OPENSEA_MARKETPLACE } from "config/constants";
import { useWallet } from "context/wallet";
import { FC } from "react";
import classes from "styles/Home/Hero.module.scss";

const Hero: FC = () => {
  const { mintToken, minting } = useWallet();

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
        <button
          className={[minting ? "disabled" : "", classes.button1].join(" ")}
          onClick={mintToken}
        >
          <div className={classes.ps}>
            <p className={classes.p1}>
              Mint{minting ? "ing" : ""} a random piece for
            </p>
            <div className={classes.polygon}>
              <Polygon />
              <p className={classes.p2}>{MINT_PRICE}</p>
            </div>
          </div>
          <div className={classes.arrow}>
            <RoundArrow />
          </div>
        </button>
        <a href={OPENSEA_MARKETPLACE} target="_blank" rel="noopener noreferrer">
          <button className={classes.button2}>
            <div className={classes.ps}>
              <p className={classes.p1}>Go to Ennefti&apos;s</p>
              <p className={classes.p2}>Marketplace</p>
            </div>
            <div className={classes.arrow}>
              <RoundArrow />
            </div>
          </button>
        </a>
      </div>
    </Section>
  );
};

export default Hero;
