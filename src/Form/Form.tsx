import { FunctionComponent, ReactNode } from "react";
import { useForm, FormProvider, FieldValues, DefaultValues, UseFormReturn, SubmitHandler } from "react-hook-form";

import styles from "./Form.module.scss";

type FormProps = {
  className: string;
  defaultValues?: DefaultValues<FieldValues> | { [x: string]: object | undefined };
  onSubmit?: SubmitHandler<FieldValues>;
  useFormMethods?: UseFormReturn<FieldValues>;
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
