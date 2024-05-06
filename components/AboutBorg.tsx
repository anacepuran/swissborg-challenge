import Image from "next/image";

const ABOUT_BORG = {
  title: "What is BORG ?",
  description:
    "The native token of the SwissBorg ecosystem, that provides utility, governance, and reward mechanisms to encourage community engagement.",
  keyFeatures: [
    {
      name: "Utility Token",
      description:
        "As a utility token, BORG has several functions within the SwissBorg ecosystem, such as participating in referendums, earning rewards, and accessing premium features.",
    },
    {
      name: "Governance",
      description:
        "BORG holders have governance rights within the SwissBorg ecosystem. This includes voting on referendums, which can influence the development and direction of the platform.",
    },
    {
      name: "Reward Mechanism",
      description:
        "BORG holders can earn rewards for various activities such as staking, referring new users, or participating in referendums.",
    },
    {
      name: "Staking",
      description:
        "BORG holders can stake their tokens to earn rewards and contribute to the security and stability of the network.",
    },
    {
      name: "Migration to DeFi",
      description:
        "The migration of CHSB (SwissBorg's previous token) to BORG brings new opportunities and functionalities to BORG holders within the decentralized finance ecosystem.",
    },
    {
      name: "Community Engagement",
      description:
        "SwissBorg emphasizes community involvement and engagement, with initiatives like the Guardians of the Borg program, which rewards active community members.",
    },
  ],
};

export default function AboutBorg() {
  return (
    <div className="banner">
      <h1 className="text-4xl font-bold">What is BORG ?</h1>
      <Image
        src={"icons/swissborg.svg"}
        alt={"usd-to-borg"}
        width={4}
        height={4}
        style={{ width: "4rem", height: "auto" }}
        priority
        unoptimized
      />
      <p>{ABOUT_BORG.description}</p>
      <div className="separator" />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12">
        {ABOUT_BORG.keyFeatures.map((item) => (
          <div key={item.name}>
            <div className="flex md:flex-col lg:flex-col gap-2 items-center w-full">
              <Image
                src={"icons/borg.svg"}
                alt={"usd-to-borg"}
                width={12}
                height={12}
                style={{ width: "2rem", height: "auto" }}
                priority
                unoptimized
              />
              <h2 className="text-xl font-bold">{item.name}</h2>
            </div>
            <p className="text-justify mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
