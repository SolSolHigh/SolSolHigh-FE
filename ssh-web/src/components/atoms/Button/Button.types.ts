import React from "react";

export type TButtonTypes = "button" | "submit" | "reset";
export type TColors = "blue" | "gray";
export type TSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: TButtonTypes;
  color?: TColors;
  size?: TSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  classNameStyles?: string;
}
