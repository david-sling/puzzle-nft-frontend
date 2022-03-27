import React from "react";
import { Logo } from "assets/images";
import classes from "styles/common/Header.module.scss";
import Section from "./Section";
import { useWallet } from "context/wallet";
import { OPENSEA_MARKETPLACE } from "config/constants";
import Link from "next/link";

export default function Header() {
  const { mintToken, minting } = useWallet();
  return (
    <Section
      className={classes.container}
      innerClassName={classes.innerContainer}
    >
      <div className={classes.header}>
        <Link href="/" passHref>
          <div className={classes.logo}>
            <Logo viewBox="0 0 28 23" />
            <h1>Ennefti</h1>
          </div>
        </Link>
        <nav className={classes.nav}>
          <Link passHref href="/about">
            <p>ABOUT US</p>
          </Link>
          <Link passHref href="/my_puzzle">
            <p>MY PUZZLE</p>
          </Link>
          <a
            href={OPENSEA_MARKETPLACE}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>MARKETPLACE</p>
          </a>
          <button className={minting ? "disabled" : ""} onClick={mintToken}>
            MINT{minting ? "ING" : ""}
          </button>
        </nav>
      </div>
    </Section>
  );
}
