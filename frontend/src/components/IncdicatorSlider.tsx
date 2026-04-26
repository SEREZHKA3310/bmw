import { Flex, Slider, Text } from "@gravity-ui/uikit";
import styles from "./styles.module.css";
import { useState } from "react";

interface IndicatorProps {
  indicator: {
    id: number;
    name: string;
  };
  employeeScore?: number;
  managerScore?: number;
  agreedScore?: number;
}

const Indicator = ({
  indicator,
  employeeScore = 0,
  managerScore = 0,
  agreedScore = 0,
}: IndicatorProps) => {
  console.log(indicator.name, agreedScore);
  const [value, setValue] = useState(agreedScore);

  // console.log(value);

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
          />
          <Text className={styles.scoreValue}>{value}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Indicator;
