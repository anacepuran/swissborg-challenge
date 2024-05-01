import Image from "next/image";
import { useMemo } from "react";
import { useFetchData } from "../api/fetch";
import { Price } from "../utils/types";
import { getPriceColor } from "../utils/utils";

export default function PriceInformation() {
  const {
    data: priceInformation,
    loading: informationLoading,
    error: informationError,
  } = useFetchData<Record<string, Price>>("price");

  const price = useMemo(
    () => (priceInformation ? priceInformation["usd"].price?.toFixed(3) : null),
    [priceInformation]
  );
  const change = useMemo(() => {
    return priceInformation ? priceInformation["usd"].change24h : null;
  }, [priceInformation]);

  return (
    <>
      <div className="historical-chart-header flex gap-3">
        <Image
          src={"icons/usd-to-borg.svg"}
          alt={"usd-to-borg"}
          width={32}
          height={32}
          style={{ width: "4rem", height: "auto" }}
        />
        {priceInformation && (
          <div className="font-light text-left">
            <p>USD {price ? price.toString() : <div className="loader" />}</p>
            {change && (
              <p
                className="text-primary text-sm"
                style={{ color: getPriceColor(change) }}>
                {change}% <span className="text-primary">24 Hours</span>
              </p>
            )}
          </div>
        )}
      </div>
      <div className="separator" />
    </>
  );
}
