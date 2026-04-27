import type { FC } from 'react'
import { Button } from '@gravity-ui/uikit'
import styles from "./styles.module.css";

interface VerfictItemProps {
  href: string;
  name: string
}

const VerdictItem: FC<VerfictItemProps> = ({ href, name }) => {
  return (
    <div>
      <Button href={href} className={styles.verdictButton}>{name}</Button>
    </div>
  )
}

export default VerdictItem