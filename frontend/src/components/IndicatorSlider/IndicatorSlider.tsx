import { Flex, Slider, Text } from "@gravity-ui/uikit";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

interface IndicatorProps {
  indicator: {
    id: number;
    name: string;
  };
  employeeScore?: number;
  managerScore?: number;
  agreedScore?: number;
  setScores: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

const Indicator = ({
  indicator,
  employeeScore = 0,
  managerScore = 0,
  agreedScore = 0,
  setScores
}: IndicatorProps) => {
  // console.log(indicator.name, agreedScore);
  const [value, setValue] = useState(agreedScore);

  useEffect(() => {
    console.log(agreedScore)
    setValue(agreedScore ?? 0);
  }, [agreedScore]);

 useEffect(() => {
  // console.log(indicator.id, value)
  setScores((prev) => ({
    ...prev,
    [indicator.id]: value
  }));
}, [value, setScores, indicator.id]);

  return (
    <Flex direction="column" gap={2} className={styles.indicatorContainer}>
      <Text variant="body-2" className={styles.indicatorName}>
        {indicator.name}
      </Text>
      <Flex direction="column" gap={2}>
        {/* <Flex alignItems="center" gap={3}>
          <Text className={styles.label}>Сотрудник:</Text>
          <Slider
            min={0}
            max={5}
            step={1}
            value={employeeScore}
            className={styles.slider}
          />
          <Text className={styles.scoreValue}>{employeeScore}</Text>
        </Flex>
        <Flex alignItems="center" gap={3}>
          <Text className={styles.label}>Руководитель:</Text>
          <Slider
            min={0}
            max={5}
            step={1}
            value={managerScore}
            className={styles.slider}
          />
          <Text className={styles.scoreValue}>{managerScore}</Text>
        </Flex> */}
        <Flex alignItems="center" gap={3}>
          <Text className={styles.label}>Согласовано:</Text>
          <Slider
            min={0}
            max={5}
            step={1}
            value={value}
            onUpdate={setValue}
            className={styles.slider}
            marks={[0, 1, 2, 3, 4, 5]}
          />
          <div className={styles.numberInput}>
            <button
              type="button"
              onClick={() => setValue(value - 1)}
              disabled={value <= 0}
            >
              -
            </button>

            <input
              className={styles.scoreValue}
              type="number"
              min={0}
              max={5}
              step={1}
              value={value}
              onChange={(ev) => setValue(+ev.currentTarget.value)}
            />

            <button
              type="button"
              onClick={() => setValue(value + 1)}
              disabled={value >= 5}
            >
              +
            </button>
          </div>
      </Flex>
      </Flex>
    </Flex>
  );
};

export default Indicator;
