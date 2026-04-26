import { Button, Card, Text, Flex } from "@gravity-ui/uikit";
import styles from "./styles.module.css";
import type { FC } from "react";

interface FormProps {
  action: (data: any) => void;
}

const Form: FC<FormProps> = ({ action }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const response = await fetch("http://localhost:3000/api/v1/xlsx/parse", {
      method: "POST",
      body: data,
    });

    const json = await response.json();
    action(json);
  };

  return (
    <Card className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Flex direction="column" gap={4}>
          <Text variant="header-2">Загрузка файла оценки</Text>
          <Flex gap={3} alignItems="center" className={styles.formContent}>
            <label htmlFor="file-upload" className={styles.fileLabel}>
              <input
                type="file"
                name="file"
                id="file-upload"
                accept=".xlsx,.xls"
                className={styles.fileInput}
              />
              <span className={styles.fileLabelText}>Выберите файл</span>
            </label>
            <Button type="submit" view="action" size="l">
              Загрузить и обработать
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default Form;
