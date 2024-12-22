import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 bg-slate-800 justify-center items-center h-[calc(100vh-90px] w-full">
      <Image
        src="/hero.png"
        alt="Hero logo"
        width={480}
        height={38}
        priority
        objectFit="contain"
      />
      <h1 className="text-4xl text-slate-100 text-center font-bold">
        Sistema feito para você organizar <br /> seus estudos e tarefas
      </h1>
      <div className="flex gap-8 justify-around">
        <section className="bg-slate-100 px-10 py-3 rounded-md hover:bg-slate-300 transition-all cursor-pointer text-center">
          <span>+12 posts</span>
        </section>
        <section className="bg-slate-100 px-10 py-3 rounded-md hover:bg-slate-300 transition-all cursor-pointer text-center">
          <span>+90 comentários</span>
        </section>
      </div>
    </div>
  );
}
