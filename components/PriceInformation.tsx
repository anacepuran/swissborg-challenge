import Image from "next/image";
import { Price } from "../utils/types";
import { getPriceColor } from "../utils/utils";

interface PriceInformationProps {
  priceInformation: Record<string, Price>;
}

export default function PriceInformation({
  priceInformation,
}: PriceInformationProps) {
  return (
    <>
      <div className="historical-chart-header flex gap-3">
        <Image
          src={"icons/usd-to-borg.svg"}
          alt={"usd-to-borg"}
          width={32}
          height={32}
          style={{ width: "4rem", height: "auto" }}
          priority
        />
        {priceInformation && (
          <div className="font-light text-left">
            <p>
              USD{" "}
              {priceInformation["usd"].price?.toFixed(3) ?? (
                <div className="loader" />
              )}
            </p>
            {priceInformation["usd"].change24h && (
              <p
                className="text-primary text-sm"
                style={{
                  color: getPriceColor(priceInformation["usd"].change24h),
                }}>
                {priceInformation["usd"].change24h}%{" "}
                <span className="text-primary">24 Hours</span>
              </p>
            )}
          </div>
        )}
      </div>
      <div className="separator" />
    </>
  );
}
