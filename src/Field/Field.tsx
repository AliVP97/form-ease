import * as React from "react";
import {
  FunctionComponent,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import DatePicker from "react-multi-date-picker";

import styles from "./Field.module.scss";

export type TextProps = {
  label?: string | number | readonly string[] | undefined;
  required?: boolean;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLInputElement>;

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
    <div
      className={`${styles.field} ${styles.text} ${
        error ? styles.hasError : ""
      }`}
    >
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
      {error && isTouched && (
        <div className={styles.error}>{error.message}</div>
      )}
    </div>
  );
};

export type TextAreaProps = {
  label?: string | number | readonly string[] | undefined;
  resize?: boolean;
  rows?: number;
  required?: boolean;
  containerClassName?: string;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLTextAreaElement>;

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
    <div
      className={`${styles.field} ${styles.text} ${containerClassName} ${
        error ? styles.hasError : ""
      }`}
    >
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
      {error && isTouched && (
        <div className={styles.error}>{error.message}</div>
      )}
    </div>
  );
};

export type CheckboxProps = {
  label?: string | number | readonly string[] | undefined;
  required?: boolean;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLInputElement>;

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
    <div
      className={`${styles.field} ${styles.checkbox} ${
        error ? styles.hasError : ""
      }`}
    >
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
        <label
          className={styles.label}
          htmlFor={`custom-input-${registeredName}`}
        >
          {label} {required ? <span className={styles.star}>*</span> : ""}
        </label>
      )}
      {error && isTouched && (
        <div className={styles.error}>{error.message}</div>
      )}
    </div>
  );
};

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
  const [data, setData] = useState(
    Array.isArray(dataFunc) ? dataFunc : undefined
  );
  const { control } = useFormContext();

  const {
    field: { name: registeredName, value, onBlur, onChange, ref },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  useEffect(() => {
    !Array.isArray(dataFunc) &&
      dataFunc?.then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <div
      className={`${styles.field} ${styles.select} ${
        error ? styles.hasError : ""
      }`}
    >
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
      {error && isTouched && (
        <div className={styles.error}>{error.message}</div>
      )}
    </div>
  );
};

export type TextFileProps = {
  label?: string | number | readonly string[] | undefined;
  required?: boolean;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLInputElement>;

const TextFile: FunctionComponent<TextFileProps> = ({
  name,
  label,
  rules,
  shouldUnregister,
  defaultValue,
  required,
  ...props
}) => {
  const [title, setTitle] = useState();
  const { control, setValue } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    field: { name: registeredName, onBlur },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  const onChange = (e: any) => {
    const FR = new FileReader();

    FR.onload = function () {
      const string = FR.result as string;
      setTitle(e.target.files[0].name);
      setValue(
        name,
        string?.split("\r\n").filter((x) => x)
      );
    };

    FR.readAsText(e.target.files[0]);
  };

  return (
    <div
      className={`${styles.field} ${styles.file} ${
        error ? styles.hasError : ""
      }`}
    >
      <div className={styles.label}>
        {label} {required ? <span className={styles.star}>*</span> : ""}
      </div>
      <div className={styles.inputContainer}>
        <div
          onClick={() => {
            inputRef?.current?.click();
          }}
        >
          {title || "Upload"}
        </div>
        <input
          type={"file"}
          className={styles.input}
          name={registeredName}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          {...props}
        />
      </div>
      {error && isTouched && (
        <div className={styles.error}>{error.message}</div>
      )}
    </div>
  );
};

export type DateProps = {
  label?: string | number | readonly string[] | undefined;
  required?: boolean;
} & Omit<UseControllerProps, "control"> &
  InputHTMLAttributes<HTMLInputElement>;

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
    field: { name: registeredName, value, onBlur, onChange, ref },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  const onChangeHandler = (data: any) => {
    onChange({ target: { value: data.toDate() } });
  };

  return (
    <div
      className={`${styles.field} ${styles.date} ${
        error ? styles.hasError : ""
      }`}
    >
      {label && (
        <div className={styles.label}>
          {label} {required ? <span className={styles.star}>*</span> : ""}
        </div>
      )}
      <DatePicker
        inputClass={styles.input}
        name={registeredName}
        value={value}
        onChange={onChangeHandler as any}
        // range
        {...props}
      />
      {error && isTouched && (
        <div className={styles.error}>{error.message}</div>
      )}
    </div>
  );
};

const Field = { Text, TextArea, Checkbox, Select, TextFile, Date };

export default Field;
