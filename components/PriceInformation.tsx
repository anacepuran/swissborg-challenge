import Image from "next/image";
import { Price } from "../utils/types";
import { getPriceColor } from "../utils/utils";

interface PriceInformationProps {
  priceInformation: Record<string, Price> | undefined;
}

export default function PriceInformation({
  priceInformation,
}: PriceInformationProps) {
  if (!priceInformation) return <div className="loader" />;
  return (
    <>
      <div className="flex gap-3">
        <Image
          src={"icons/usd-to-borg.svg"}
          alt={"usd-to-borg"}
          width={32}
          height={32}
          style={{ width: "4rem", height: "auto" }}
          priority
          unoptimized
        />
        <div className="text-left">
          <p>USD {priceInformation["usd"].price?.toFixed(3)}</p>
          <p
            className="text-sm"
            style={{
              color: getPriceColor(priceInformation["usd"].change24h),
            }}>
            {priceInformation["usd"].change24h}%{" "}
            <span className="text-primary">24 Hours</span>
          </p>
        </div>
      </div>
    </>
  );
}
