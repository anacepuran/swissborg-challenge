import Link from "next/link";

export default function Page() {
  return (
    <main style={{ fontFamily: "TT Commons, sans-serif" }}>
      <div
        className="w-full flex flex-col gap-8 p-20 text-white items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #191e29, #364053)",
          minHeight: "100vh",
        }}>
        <h1 className="text-8xl font-bold" style={{ opacity: 0.7 }}>
          404
        </h1>
        <p className="text-2xl font-light">
          Oops! You have wandered into unknown territory.
        </p>
        <Link href="/" style={{ textDecoration: "underline" }}>
          {"<"} Return to safety
        </Link>
      </div>
    </main>
  );
}
