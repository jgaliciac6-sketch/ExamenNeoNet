"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Gamepad2, Lock, User } from "lucide-react";

import heroImage from "@/assets/login-hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Login } from "@/actions/auth/login-action";
import { initialActionState } from "@/actions/action-state";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(Login, initialActionState);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Lado visual */}
      <section className="relative hidden overflow-hidden lg:block">
        <Image
          src={heroImage}
          alt="Setup gaming moderno con iluminación ambiental violeta"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.2_287/0.35),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <span className="brand-gradient-bg mb-6 flex size-12 items-center justify-center rounded-2xl shadow-lg">
            <Gamepad2 className="size-6 text-primary-foreground" />
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">Nexus Games</h1>
          <p className="mt-2 text-lg text-primary/90">Administración de ventas</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Gestiona productos, clientes y ventas desde un solo lugar.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <section className="flex items-center justify-center px-5 py-12">
        <Card className="surface-panel w-full max-w-md gap-0 border-0 p-8 shadow-[var(--shadow-elevated)]">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="brand-gradient-bg flex size-10 items-center justify-center rounded-xl">
              <Gamepad2 className="size-5 text-primary-foreground" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Nexus Games</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">Bienvenido</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Inicia sesión para acceder al sistema
          </p>

          <form action={formAction} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="usrId">ID de usuario</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="usrId"
                  name="usrId"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usrPassword">Contraseña</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="usrPassword"
                  name="usrPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 px-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Recordarme
              </Label>
            </div>

            {state.errors.length > 0 && (
              <div className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
                {state.errors.map((error) => (
                  <p key={error} className="text-xs text-destructive">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <Button
              type="submit"
              className="h-11 w-full rounded-xl text-sm font-medium"
              disabled={isPending}
            >
              {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            ¿Problemas para acceder?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Contacta al administrador
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
}
