import { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";

import { TextProps } from "./Text.type";

import styles from "Field/Field.module.scss";

const Text: FunctionComponent<TextProps> = ({
  name,
  label,
  rules,
  shouldUnregister,
  defaultValue,
  required,
  ...props
}) => {
  const { control } = useFormContext();

  const {
    field: { name: registeredName, value, onBlur, onChange, ref },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  return (
    <div className={`${styles.field} ${styles.text} ${error ? styles.hasError : ""}`}>
      {label && (
        <div className={styles.label}>
          {label} {required ? <span className={styles.star}>*</span> : ""}
        </div>
      )}
      <input
        type={"text"}
        className={styles.input}
        name={registeredName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
      {error && isTouched && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default Text;
