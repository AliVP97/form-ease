import { FunctionComponent } from "react";
import { useController, useFormContext } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

import { DateProps } from "./Date.type";

import styles from "Field/Field.module.scss";

const Date: FunctionComponent<DateProps> = ({
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
    field: { name: registeredName, value, onChange },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  const onChangeHandler = (data: { toDate: () => unknown }) => {
    onChange({ target: { value: data?.toDate() } });
  };

  return (
    <div className={`${styles.field} ${styles.date} ${error ? styles.hasError : ""}`}>
      {label && (
        <div className={styles.label}>
          {label} {required ? <span className={styles.star}>*</span> : ""}
        </div>
      )}
      <DatePicker
        inputClass={styles.input}
        name={registeredName}
        value={value}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={onChangeHandler as any}
        // range
        {...props}
      />
      {error && isTouched && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default Date;
