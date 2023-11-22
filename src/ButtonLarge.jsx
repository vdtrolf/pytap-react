import React from "react";
import clsx from "clsx";

export default function ButtonLarge(props) {
  const { children, className, onClickHandler, ...attribs } = props;
  const classes = clsx("ui-button-large", className);

  return (
    <button className={classes} {...attribs} onClick={onClickHandler}>
      {children}
    </button>
  );
}