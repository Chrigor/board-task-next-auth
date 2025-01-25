import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className="w-full resize-none rounded px-2 py-1 outline-none"
      rows={5}
      placeholder="Digite..."
      {...props}
    ></textarea>
  );
}
