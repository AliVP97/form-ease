import { FunctionComponent, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { SelectProps } from "./Select.type";

import styles from "Field/Field.module.scss";

const Select: FunctionComponent<SelectProps> = ({
  name,
  label,
  data: dataFunc,
  placeholder = "Select",
  rules,
  shouldUnregister,
  defaultValue,
  required,
  ...props
}) => {
  const [data, setData] = useState(Array.isArray(dataFunc) ? dataFunc : undefined);
  const { control } = useFormContext();

  const {
    field: { name: registeredName, value, onBlur, onChange, ref },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  useEffect(() => {
    !Array.isArray(dataFunc) && dataFunc?.then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <div className={`${styles.field} ${styles.select} ${error ? styles.hasError : ""}`}>
      <div className={styles.label}>
        {label} {required ? <span className={styles.star}>*</span> : ""}
      </div>
      <select
        className={styles.input}
        name={registeredName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      >
        <option value={""} hidden>
          {placeholder}
        </option>
        {Array.isArray(data) &&
          data?.map(({ label, value }) => (
            <option key={`${value}`} value={value}>
              {label}
            </option>
          ))}
      </select>
      {error && isTouched && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default Select;
