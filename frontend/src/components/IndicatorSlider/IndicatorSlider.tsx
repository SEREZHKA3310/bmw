import { useContext } from "react";
import { Button, Card, Flex, Slider, Text } from "@gravity-ui/uikit";

import { ScoresContext } from "~common/providers";

import styles from "./styles.module.css";
import { Minus, Plus } from "@gravity-ui/icons";

interface IndicatorProps {
  indicator: {
    id: number;
    name: string;
  }
}

const Indicator = ({
    indicator,
  }: IndicatorProps) => {
  const { scores, setScore } = useContext(ScoresContext);
  const value = scores[indicator.id] ?? 0;

  const editScore = (id: number, score: number) => {
    if (score >= 5) {
      setScore(id, 5)
    }
    else if (score <= 0) {
      setScore(id, 0)
    }
    else {
      setScore(id, score)
    }
  }

  return (
    <Card view="raised" className={styles.container}>
      <Text variant="body-2" className={styles.indicatorName}>
        {indicator.name}
      </Text>
      <Flex direction="column" gap={2}>
        <Flex alignItems="center" gap={3}>
          <Text className={styles.label}>Согласовано:</Text>
          <Slider
            min={0}
            max={5}
            step={1}
            value={value}
            onUpdate={(score) => setScore(indicator.id, score)}
            className={styles.slider}
            marks={[0, 1, 2, 3, 4, 5]}
          />
          <div className={styles.editScore}>
            <Button view="outlined" pin="round-clear">
              <Button.Icon>
                <Minus onClick={() => value <= 0 ? 0 : setScore(indicator.id, value - 1)} />
              </Button.Icon>
            </Button>
            <input className={styles.scoreValue} type="number" min={0} max={5} step={1} value={value} onChange={(ev) => editScore(indicator.id, +ev.currentTarget.value)} />
            <Button view="outlined" pin="clear-round">
              <Button.Icon>
                <Plus onClick={() => value >= 5 ? 5 : setScore(indicator.id, value + 1)}/>
              </Button.Icon>
            </Button>
          </div>
      </Flex>
      </Flex>
    </Card>
  );
};

export default Indicator;
