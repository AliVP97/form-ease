import { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";

import { TextAreaProps } from "./TextArea.type";

import styles from "Field/Field.module.scss";

const TextArea: FunctionComponent<TextAreaProps> = ({
  name,
  label,
  rules,
  shouldUnregister,
  defaultValue,
  resize = false,
  rows = 3,
  required,
  containerClassName,
  ...props
}) => {
  const { control } = useFormContext();

  const {
    field: { name: registeredName, value, onBlur, onChange, ref },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  return (
    <div className={`${styles.field} ${styles.text} ${containerClassName} ${error ? styles.hasError : ""}`}>
      <div className={styles.label}>
        {label} {required ? <span className={styles.star}>*</span> : ""}
      </div>
      <textarea
        type={"text"}
        style={{ resize: resize ? "unset" : "none" }}
        className={styles.input}
        name={registeredName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        rows={rows}
        {...props}
      />
      {error && isTouched && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default TextArea;
