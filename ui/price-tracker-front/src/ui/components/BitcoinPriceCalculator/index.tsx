"use client";

import React, { useMemo, useState } from "react";

import { NumberFormatValues, NumericFormat } from "react-number-format";
import useGetBtcPrices from "@/hooks/useGetBtcPrices";
import { useLineChartDialog } from "../LineChart";

const fetchLastTenPrices = async () => {
  const res = await fetch("http://localhost:4001/api/v1/bitcoin/prices");
  return res.json();
};

const BitcoinPriceCalculator: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<number>(0);

  const { prices, currentPrice } = useGetBtcPrices();
  const { popup, openPopup } = useLineChartDialog(prices);

  const stopModalPropagation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const btcAmount = useMemo(() => {
    const currentAmount = usdAmount / currentPrice;

    return (isNaN(currentAmount) ? 0 : currentAmount).toFixed(2);
  }, [usdAmount, currentPrice]);

  const handleOnChange = ({ value }: NumberFormatValues) => {
    setUsdAmount(Number(value));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full text-center"
        onClick={openPopup}
      >
        <h2 className="text-lg font-semibold mb-4 text-black">
          Live price ($) :{" "}
          {currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
        <NumericFormat
          onClick={stopModalPropagation}
          thousandSeparator={true}
          fixedDecimalScale
          decimalScale={2}
          value={usdAmount}
          displayType={"input"}
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          placeholder="Enter USD amount"
          onValueChange={handleOnChange}
        />

        <p className="text-sm text-gray-500">{btcAmount} Bitcoin</p>
      </div>
      {prices.length > 0 && popup}
    </div>
  );
};

export default BitcoinPriceCalculator;
