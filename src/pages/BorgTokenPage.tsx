import Breakdown from "@/components/Breakdown";
import Metrics from "../components/Metrics";

// const inter = Inter({ subsets: ["latin"] });

// export const getStaticProps: GetStaticProps = async (context) => {
//   console.log("GETTING PROPS");
//   const res = await fetchData("/borg-stats");
//   const borgStats: BorgStats = await res.json();
//   console.log("borgStats");
//   console.log(borgStats);
//   return { props: { borgStats } };
// };

export default function BorgTokenPage() {
  return (
    <main className="flex flex-col gap-8 min-h-screen items-center bg-white w-full">
      <Metrics />
      <Breakdown />
    </main>
  );
}
// export default function BorgTokenPage({
//   borgStats,
// }: InferGetStaticPropsType<typeof getStaticProps>) {

//   return (
//     <main className="flex flex-col gap-8 min-h-screen items-center bg-white w-full">
//       <Metrics />
//       <Breakdown stats={borgStats} />
//     </main>
//   );
// }
