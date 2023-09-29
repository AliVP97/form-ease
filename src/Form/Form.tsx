import { FormHTMLAttributes, FunctionComponent, ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

import styles from "./Form.module.scss";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  defaultValues?: any;
  onSubmit?: (data: any[]) => void;
  useFormMethods?: any;
  children: ReactNode;
};

const Form: FunctionComponent<FormProps> = ({
  className,
  defaultValues,
  onSubmit,
  useFormMethods,
  children,
  ...props
}) => {
  const methods = useFormMethods || useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form
        className={`${styles.form} ${className ? className : ""}`}
        onSubmit={onSubmit && methods.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
