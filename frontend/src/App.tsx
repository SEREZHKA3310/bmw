import { Card } from "@gravity-ui/uikit";
import IndicatorSlider from "./components/IndicatorSlider/IndicatorSlider";

import styles from "./styles.module.css";
import Form from "./components/Form";
import { competences, indicators } from './consts/index'

const App = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.title}><h1>BMW. Система методических рекомендаций</h1></Card>
      <div className={styles.competences}>
        {competences.map((competence, i) => (
          <Card key={i} view="outlined" className={styles.competenceCard}>
            <h2 className={styles.title}>{competence.name}</h2>
            <div className={styles.indicators}>
              {competence.indicator_ids.map((id) => {
                return indicators
                  .filter((indicator) => indicator.id === id)
                  .map((indicator) => (
                    <IndicatorSlider
                      key={indicator.id}
                      indicator={indicator}
                    />
                  )
                );
              })}
            </div>
          </Card>
        ))}
      </div>
      <Form />
    </div>
  );
};

export default App;

