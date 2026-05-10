import { type Indicator, type responce_example, competences, indicators } from "../../consts";

export const mapIndicatorNameToId = (name: string): number => {
  const indicator = indicators.find((indicator) => name.includes(indicator.name));

  if (!indicator) {
    throw new Error(`Indicator with name ${name} not found`);
  }

  return indicator.id;
};

export const getIndicatorsData = (
  responce: responce_example,
): Record<number, number> => 
  responce.competency_details.flatMap((competency) => competency.indicators).reduce((acc, { name, agreed_score}) => ({
      ...acc, [mapIndicatorNameToId(name)]: agreed_score,
  }), {});
    

export const groupIndicatorsByCompetence = (
  indicators: Indicator[],
): Record<string, Indicator[]> => {
  return indicators.reduce((acc, indicator) => {
    const competence = competences.find((competence) => competence.indicator_ids.includes(indicator.id));

    if (!competence) {
      throw new Error(`Competence for indicator ${indicator.name} not found`);
    }

    return { ...acc, [competence.name]: [...(acc[competence.name] || []), indicator]};
  }, {} as Record<string, Indicator[]>);
};