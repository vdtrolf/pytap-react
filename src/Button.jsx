import React from "react";
import clsx from "clsx";

export default function Button(props) {
  const { children, className, onClickHandler, ...attribs } = props;
  const classes = clsx("ui-button", className);

  return (
    <button className={classes} {...attribs} onClick={onClickHandler}>
      {children}
    </button>
  );
}
