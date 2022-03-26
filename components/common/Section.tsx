import React from "react";
import classes from "../../styles/components/common/Section.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  innerClassName?: string;
}

export default function Section({
  children,
  className,
  innerClassName,
  ...props
}: Props) {
  return (
    <div {...props} className={[className, classes.container].join(" ")}>
      <div className={[innerClassName, classes.innerContainer].join(" ")}>
        {children}
      </div>
    </div>
  );
}
