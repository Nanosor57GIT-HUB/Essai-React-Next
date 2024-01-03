"use client"

import { useTheme } from "@/app/context/themecontext";
import React, { useState, useMemo } from "react";

const NumbersListMemo = ({ numbers, multipliers }) => {
  const { theme } = useTheme();

  const [sum, setSum] = useState(0);

  const getSum = (numbers) => {
  //  console.log("Calculating sum...");
    return numbers.reduce((acc, curr) => acc + curr, 0);
  };

  const getProduct = (multipliers) => {
  //  console.log("Calculating product...");
    return multipliers.reduce((acc, curr) => acc * curr, 1);
  };

  const parsedNumbers = useMemo(() => {
    // Vérifier que numbers est bien un tableau et défini avant d'utiliser map
    return Array.isArray(numbers) ? numbers.map(Number) : [];
  }, [numbers]);

  const memoizedSum = useMemo(() => getSum(parsedNumbers), [parsedNumbers]);

  const parsedMultipliers = useMemo(() => {
    // Vérifier que multipliers est bien un tableau et défini avant d'utiliser map
    return Array.isArray(multipliers) ? multipliers.map(Number) : [];
  }, [multipliers]);

  const memoizedProduct = useMemo(
    () => getProduct(parsedMultipliers),
    [parsedMultipliers]
  );

  return (
    <div className="blocknumberusememo" style={{ background: theme.background2 }}><div className="blocknumbers">
      <h2>Numbers:</h2>
      
      <p className="numberlist">Numbers: <span className="numbers">{parsedNumbers.join(" + ")} =</span></p>
      <p className="totalnumberlist">Sum: <span className="total">{memoizedSum}</span></p>
</div>
 <div className="blocknumbers">
      <h2>Multipliers:</h2>
     
      <p className="numberlist">Multipliers: <span className="numbers">{parsedMultipliers.join(" x ")} =</span></p>
      <p className="totalnumberlist">Product: <span className="total">{memoizedProduct}</span></p>
    </div>
    </div>
  );
};

export default NumbersListMemo;
