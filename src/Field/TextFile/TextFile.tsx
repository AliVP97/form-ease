import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { TextFileProps } from "./TextFile.type";

import styles from "Field/Field.module.scss";

const TextFile: FunctionComponent<TextFileProps> = ({
  name,
  label,
  rules,
  shouldUnregister,
  defaultValue,
  required,
  ...props
}) => {
  const [title, setTitle] = useState<string>();
  const { control, setValue } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    field: { name: registeredName, onBlur },
    fieldState: { isTouched, error },
  } = useController({ name, rules, control, shouldUnregister, defaultValue });

  const onChange = (
    e: ChangeEvent<HTMLInputElement> & {
      target: EventTarget & { files: FileList };
    },
  ) => {
    const FR = new FileReader();

    FR.onload = function () {
      const string = FR.result as string;

      setTitle(e.target.files[0].name);
      setValue(name, string?.split("\r\n").filter((x) => x));
    };

    FR.readAsText(e.target.files[0]);
  };

  return (
    <div className={`${styles.field} ${styles.file} ${error ? styles.hasError : ""}`}>
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
      {error && isTouched && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default TextFile;
