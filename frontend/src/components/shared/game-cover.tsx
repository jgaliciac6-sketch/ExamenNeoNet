import { Gamepad2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface GameCoverProps {
  gradient: string;
  name: string;
  className?: string;
}

/** Portada placeholder del videojuego (sin imágenes externas). */
export function GameCover({ gradient, name, className }: GameCoverProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br",
        gradient,
        className ?? "size-10",
      )}
      aria-hidden
      title={name}
    >
      <Gamepad2 className="absolute -bottom-1 -right-1 size-5 text-foreground/20" />
      <span className="text-[11px] font-semibold text-foreground/90">{initials}</span>
    </div>
  );
}
