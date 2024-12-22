"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="p-6 bg-slate-800">
      <nav className="flex items-center justify-between gap-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h1 className="text-slate-200 text-2xl font-bold">
              Tarefas
              <span className="text-red-800">+</span>
            </h1>
          </Link>
          {session?.user && (
            <Link href="/dashboard" className="text-slate-200 hover:underline">
              Meu painel
            </Link>
          )}
        </div>

        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <button
            className="text-base text-slate-200 border border-slate-200 px-4 py-2 rounded-2xl hover:border-slate-400 transition-all"
            onClick={() => signOut()}
          >
            {session.user?.name}
          </button>
        ) : (
          <button
            className="text-base text-slate-200 border border-slate-200 px-4 py-2 rounded-2xl hover:border-slate-400 transition-all"
            onClick={() => signIn("google")}
          >
            Acessar
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
