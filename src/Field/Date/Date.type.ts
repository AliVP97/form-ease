import { InputHTMLAttributes } from "react";
import { UseControllerProps } from "react-hook-form";

export type DateProps = {
  label?: string | number | readonly string[] | undefined;
  required?: boolean;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLInputElement>;
