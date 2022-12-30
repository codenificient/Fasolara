import styles from "@css/Navigation.module.scss"
import React, { useEffect, useState } from "react"

interface Props
{
  visible?: boolean
}

const Visitor: React.FC<Props> = ( { visible } ) =>
{
  const [count, setCount] = useState()

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      const data = await fetch(
        "https://visitorcounter.vercel.app/api/new/fasolaraadmin"
      )
      const visitors = await data.json()
      setCount( visitors.count )
    }
    fetchData()
  }, [] )

  if ( !count ) return

  return (
    <div className={styles.Visitor}>{visible && `Visitors: ${count}`}</div>
  )
}

export default Visitor
