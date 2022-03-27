import { FC, SVGProps } from "react";

// Import SVG files
import logo from "./logo.svg";
import footerBg from "./footerBg.svg";
import roundArrow from "./roundArrow.svg";
import polygon from "./polygon.svg";

const makeSvgComponent = (Svg: any, initialProps?: SVGProps<SVGSVGElement>) =>
  ((props) => (
    <Svg
      viewBox={
        initialProps?.width && initialProps?.height
          ? `0 0 ${initialProps.width} ${initialProps.height}`
          : undefined
      }
      {...initialProps}
      {...props}
    />
  )) as FC<SVGProps<SVGSVGElement>>;

// Export SVG files
export const Logo = makeSvgComponent(logo, { height: 23, width: 28 });
export const FooterBg = makeSvgComponent(footerBg);
export const RoundArrow = makeSvgComponent(roundArrow);
export const Polygon = makeSvgComponent(polygon);
