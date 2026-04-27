import { Text, Card } from "@gravity-ui/uikit";
import IndicatorSlider from "./components/IndicatorSlider/IndicatorSlider";

import styles from "./styles.module.css";
import Form from "./components/Form";
import { useState } from "react";
import { competences, indicators, type responce_example } from './consts/index'

const App = () => {
  // Функция для поиска данных индикатора из responce_example
  const getIndicatorData = (
    responce: responce_example,
    indicatorName: string,
  ) => {
    for (const competency of responce.competency_details) {
      const indicator = competency.indicators.find(
        (ind) => ind.name === indicatorName + ".",
      );

      // console.log(indicator);
      if (indicator) {
        return {
          employeeScore: indicator.employee_score,
          managerScore: indicator.manager_score,
          agreedScore: indicator.agreed_score,
        };
      }
    }
    return { employeeScore: 0, managerScore: 0, agreedScore: 0 };
  };

  const [resp, setData] = useState<responce_example | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({})

  return (
    <div className={styles.container}>
      <div>
        {competences.map((competence, i) => (
          <Card key={i} className={styles.competenceCard}>
            <Text variant="header-1">{competence.name}</Text>
            <div className={styles.indicatorsWrapper}>
              {competence.indicator_ids.map((id) => {
                return indicators
                  .filter((indicator) => indicator.id === id)
                  .map((indicator) => {

                    const data = resp === null ? null : getIndicatorData(resp, indicator.name)
                    // console.log(indicator.name, data)
                    return (
                      <IndicatorSlider
                        key={indicator.id}
                        indicator={indicator}
                        employeeScore={data?.employeeScore}
                        managerScore={data?.managerScore}
                        agreedScore={data?.agreedScore ?? 0}
                        setScores={setScores}
                      />
                    );
                  });
              })}
            </div>
          </Card>
        ))}
      </div>
      <div>
        <Form action={setData} scores={scores} />
      </div>
    </div>
  );
};

export default App;

