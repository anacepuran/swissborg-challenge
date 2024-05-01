import Link from "next/link";

export default function Page() {
  return (
    <div className="banner" style={{ minHeight: "100vh" }}>
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
