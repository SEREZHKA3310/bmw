import { createContext, useCallback, useMemo, type FC, type ReactNode } from "react";
import { indicators } from "../../consts";
import { useLocalStorage } from "~common/hooks";

interface IScoresContext {
    scores: Record<number, number>;
    setScores: (scores: Record<number, number>) => void;
    setScore: (id: number, score: number) => void;
}

const ScoresContext = createContext<IScoresContext>(null as unknown as IScoresContext)

interface IScoresProvider {
    children: ReactNode;
}

const ScoresProvider: FC<IScoresProvider> = ({ children }) => {
    const [raw, setRaw] = useLocalStorage('scores', JSON.stringify(indicators.reduce((acc, {id}) => ({...acc, [id]: 0 }), {})))

    const scores = useMemo<Record<number, number>>(() => JSON.parse(raw), [raw])

    const setScores = useCallback((scores: Record<number, number>) => {
        setRaw(JSON.stringify(scores));
    }, [setRaw]);

    const setScore = useCallback((id: number, score: number) => {
        setScores({ ...scores, [id]: score });
    }, [scores, setScores]);
    
  return (
    <ScoresContext.Provider value={{ scores, setScores, setScore }}>
        {children}
    </ScoresContext.Provider>
  )
}

export { ScoresContext, ScoresProvider };