import { Button, Card, Text, Flex } from "@gravity-ui/uikit";
import styles from "./styles.module.css";
import type { FC } from "react";
import { useState, useContext } from "react";
import { indicators, type Indicator } from "../../consts";
import VerdictItem from "../VerdictItem";
import { ScoresContext } from "~common/providers";
import { getIndicatorsData, groupIndicatorsByCompetence } from "~common/utils";


const Form: FC = () => {
  const [fileLabel, setFileLabel] = useState("Выберите файл");
  const { scores, setScores } = useContext(ScoresContext);

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
        setScores(getIndicatorsData(json))
      }
      else {
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
      console.log(scores)
      return scores[indicator.id] <= 3 || null
    }))
  };

  return (
    <Card className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.content}>
          <Text variant="header-2">Загрузка файла оценки</Text>
           <div className={styles.resultsArea}>
            { needIndicators && Object.entries(groupIndicatorsByCompetence(needIndicators)).map(([competence, indicators]) => (
              <div key={competence}>
                <span>{competence}</span>
                {indicators.map(indicator => (
                  <VerdictItem key={indicator.id} href={indicator.path} name={indicator.name}/>
                ))}
              </div>
            ))}
           </div>
          <Flex gap={3} alignItems="center" className={styles.formContent}>
              <input
                type="file"
                name="file"
                id="file-upload"
                accept=".xlsx,.xls"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
            <Button className={styles.fileChange} component="label" htmlFor="file-upload" size="l" view="outlined" title={fileLabel}>{fileLabel}</Button>
            <Button
              type="button"
              view="outlined"
              size="l"
              onClick={() => setScores(Object.fromEntries(Object.entries(scores).map(([key]) => [key, 0])))}
            >
              Сбросить
            </Button>
            <Button type="submit" view="action" size="l">
              Обработать
            </Button>
          </Flex>
        </div>
      </form>
    </Card>
  );
};

export default Form;
