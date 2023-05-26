import React from "react";
import { primary45 } from "../utils/colors";
import useHover from "../hooks/useHover";

export function BigButton({
  title,
  onClick,
  inverted,
  fullWidth,
  customFillColor,
  customWhiteColor,
  style,
  noHover,
  id,
  small,
  disabled,
  marginRight,
  initialBgColor,
  hoverTextColor
}) {
  const [hoverRef, isHovered] = useHover();
  
  let fillColor = customFillColor || primary45;
  const whiteColor = customWhiteColor || "#FFF";

  let initialBg = initialBgColor || null;
  let hoverBg = fillColor;

  let initialColor = fillColor;
  let hoverColor = hoverTextColor || whiteColor;

  if (inverted) {
    initialBg = fillColor;
    hoverBg = null;
    initialColor = whiteColor;
    hoverColor = fillColor;
  }

  if (disabled) {
    initialBg = "#ddd";
    hoverBg = "#ddd";
    fillColor = "#ddd";
  }

  const styles = {
    container: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: fullWidth ? "100%" : null,
      backgroundColor: isHovered && !noHover ? hoverBg : initialBg,
      color:
        isHovered && !noHover && !disabled
          ? hoverColor
          : disabled
          ? "#999"
          : initialColor,
      borderRadius: 4,
      padding: small ? "2px 4px" : "6px 8px",
      fontSize: small ? 14 : null,
      border: `1px solid ${fillColor}`,
      cursor: !disabled ? "pointer" : null,
      userSelect: "none",
      boxSizing: "border-box",
      marginRight,
    },
  };

  return (
    <div
      id={id}
      ref={hoverRef}
      style={{ ...styles.container, ...style,border:`${initialBg} solid  1px` }}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      {title}
    </div>
  );
}
