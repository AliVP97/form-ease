import { InputHTMLAttributes } from "react";
import { UseControllerProps } from "react-hook-form";

export type TextAreaProps = {
  label?: string | number | readonly string[] | undefined;
  resize?: boolean;
  rows?: number;
  required?: boolean;
  containerClassName?: string;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLTextAreaElement>;
