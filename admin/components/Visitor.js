import React, { useEffect, useState } from "react";
import styles from "../styles/components/Navigation.module.scss";

const Visitor = ({ visible }) => {
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://visitorcounter.vercel.app/api/new/fasolaraadmin"
      );
      const visitors = await data.json();
      setCount(visitors.count);
    };
    fetchData();
  }, []);

  if (!count) return;

  return (
    <div className={styles.Visitor}>{visible && `Visitors: ${count}`}</div>
  );
};

export default Visitor;
