import { Button, Card, Text, Flex } from "@gravity-ui/uikit";
import styles from "./styles.module.css";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { indicators, type Indicator } from "../../consts";
import VerdictItem from "../VerdictItem";

interface FormProps {
  action: (data: any) => void;
  scores: Record<string, number>
}

const Form: FC<FormProps> = ({ action, scores }) => {
  const [fileLabel, setFileLabel] = useState("Выберите файл");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const data = new FormData(e.currentTarget.form);
      const response = await fetch("http://localhost:3000/api/v1/xlsx/parse", {
        method: "POST",
        body: data,
      })
      if (response.ok) {
        setFileLabel(`Файл выбран: ${file.name}`);
        const json = await response.json()
        action(json)
      }
      else {
        action(null)
        setTimeout(() => {
          setFileLabel('Выберите файл')
        }, 3000)
        setFileLabel('Выбран неправильный файл')
      }
    
    } else {
      setFileLabel("Выберите файл");
    }
  };

  const [needIndicators, setIndicators] = useState<Indicator[] | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIndicators(indicators.filter((indicator) => {
      return scores[indicator.id] <= 3
    }))
  };

  return (
    <Card className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Flex direction="column" gap={4}>
          <Text variant="header-2">Загрузка файла оценки</Text>
           <div className={styles.resultsArea}>
              {needIndicators?.map((needIndicator) => 
                <VerdictItem key={needIndicator.id} href={needIndicator.path} name={needIndicator.name}/>
              )}
           </div>
          <Flex gap={3} alignItems="center" className={styles.formContent}>
            <label htmlFor="file-upload" className={styles.fileLabel}>
              <input
                type="file"
                name="file"
                id="file-upload"
                accept=".xlsx,.xls"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              <span className={styles.fileLabelText}>{fileLabel}</span>
            </label>
            <Button type="submit" view="action" size="m" className={styles.submitButton}>
              Обработать
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default Form;
