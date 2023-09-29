import { SelectHTMLAttributes } from "react";
import { UseControllerProps } from "react-hook-form";

export type SelectProps = {
  label?: string | number | readonly string[] | undefined;
  data:
    | {
        label: string | number | readonly string[] | undefined;
        value: string | number | readonly string[] | undefined;
      }[]
    | Promise<
        {
          label: string | number | readonly string[] | undefined;
          value: string | number | readonly string[] | undefined;
        }[]
      >
    | undefined;
  required?: boolean;
} & Omit<UseControllerProps, "control"> &
  SelectHTMLAttributes<HTMLSelectElement>;
