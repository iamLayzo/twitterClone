import { SetStateAction, useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // Nuevo estado para confirmación
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que las contraseñas sean iguales
    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          name,
          username,
          email,
          password,
          password_confirmation: passwordConfirmation, // Se envía la confirmación
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex items-center justify-center p-8">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-96 h-96 text-white">
            <g>
              <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </g>
          </svg>
        </div>

        <div className="p-8 flex items-center lg:items-start lg:pt-20">
          <div className="max-w-[380px] w-full">
            <div className="mb-8 lg:hidden flex justify-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-12 h-12 text-white">
                <g>
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </g>
              </svg>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold mb-3">Crea tu cuenta</h1>
              <h2 className="text-2xl lg:text-3xl font-bold">Únete ahora</h2>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  as="input"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  as="input"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  as="input"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  as="input"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                <Input
                  as="input"
                  id="password_confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500 mt-4">
              Al registrarte, aceptas los{" "}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Términos de servicio
              </Link>{" "}
              y la{" "}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Política de privacidad
              </Link>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
