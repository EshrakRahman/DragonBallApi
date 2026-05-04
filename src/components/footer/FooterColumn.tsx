import type { ReactNode } from "react";

type FooterColumnProps = {
  title: string;
  children: ReactNode;
};

export default function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-lg text-black">{title}</h3>
      <ul className="flex flex-col gap-3 text-sm text-black/60">
        {children}
      </ul>
    </div>
  );
}
