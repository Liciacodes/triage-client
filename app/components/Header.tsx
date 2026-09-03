import Link from "next/link";

export default function Header() {
  return (
   <header className="border-b border-zinc-200 bg-white">
  <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-6">
    <Link href="/" className="text-xl font-semibold">
      Triage
    </Link>

    <nav className="flex gap-8">
      <Link href="/">Dashboard</Link>
      <Link href="/transactions">Transactions</Link>
    </nav>
  </div>
</header>
  );
}