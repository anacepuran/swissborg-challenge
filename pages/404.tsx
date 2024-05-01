import Link from "next/link";

export default function Page() {
  return (
    <div
      className="flex flex-col gap-8 text-white items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #191e29, #364053)",
        minHeight: "100vh",
      }}>
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-2xl">
        Oops! You have wandered into unknown territory.
      </p>
      <Link href="/" style={{ textDecoration: "underline" }}>
        Return to safety
      </Link>
    </div>
  );
}
