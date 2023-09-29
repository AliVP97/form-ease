import { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";

import { CheckboxProps } from "./Checkbox.type";

import styles from "Field/Field.module.scss";

const Checkbox: FunctionComponent<CheckboxProps> = ({
  name,
  label,
  rules,
  shouldUnregister,
  defaultValue = false,
  required,
  ...props
}) => {
  const { control } = useFormContext();

  const {
    field: { name: registeredName, value, onBlur, onChange, ref },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  return (
    <div className={`${styles.field} ${styles.checkbox} ${error ? styles.hasError : ""}`}>
      <input
        id={`custom-input-${registeredName}`}
        type={"checkbox"}
        className={styles.input}
        name={registeredName}
        checked={value}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
      {label && (
        <label className={styles.label} htmlFor={`custom-input-${registeredName}`}>
          {label} {required ? <span className={styles.star}>*</span> : ""}
        </label>
      )}
      {error && isTouched && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default Checkbox;
