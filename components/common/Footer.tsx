import { FC } from "react";
import Section from "./Section";
import classes from "styles/common/Footer.module.scss";
import { FooterBg, Logo } from "assets/images";

const Footer: FC = () => {
  return (
    <Section className={classes.container}>
      <div className={classes.logo}>
        <Logo height={38} width={47} />
        <h3>Ennefti</h3>
      </div>
      <p className={classes.tagline}>
        World&apos;s <span>First and Only</span> NFT puzzle
      </p>
      <FooterBg className={classes.bg} />
    </Section>
  );
};

export default Footer;
