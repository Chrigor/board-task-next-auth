"use client";
import { FiShare2 } from "react-icons/fi";

interface ShareButtonProps {
  taskId: string;
}

export function ShareButton({ taskId }: ShareButtonProps) {
  const onShare = async (taskId: string) => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${taskId}`
    );
    alert("Url copiada com sucesso");
  };
  return (
    <div className="flex gap-2">
      <label className="uppercase bg-cyan-600 text-slate-200 px-2 rounded">
        Publico
      </label>
      <button className="">
        <FiShare2 className="fill-cyan-600" onClick={() => onShare(taskId)} />
      </button>
    </div>
  );
}
