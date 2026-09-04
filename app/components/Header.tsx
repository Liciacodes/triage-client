import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-semibold text-zinc-950"
        >
          Triage
        </Link>

        <nav className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-900 sm:text-base"
          >
            Dashboard
          </Link>

          <Link
            href="/transactions"
            className="text-sm font-medium text-zinc-900 sm:text-base"
          >
            Transactions
          </Link>
        </nav>
      </div>
    </header>
  );
}