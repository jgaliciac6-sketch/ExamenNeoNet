"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Gamepad2, Lock, User } from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/login-hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { login } from "@/lib/api/auth";
import { setSession } from "@/lib/auth-storage";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession({ username: data.nombre, token: data.token });
      router.push("/ventas");
    },
    onError: () => {
      toast.error("No se pudo iniciar sesión", {
        description: "Usuario o contraseña incorrectos.",
      });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ usrNombre: username, usrPassword: password });
  }

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

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button
              type="submit"
              className="h-11 w-full rounded-xl text-sm font-medium"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
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
