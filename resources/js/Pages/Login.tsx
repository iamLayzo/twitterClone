import { useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { username, password },
        {
          withCredentials: true, // Enviar cookies con la solicitud
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      window.location.href = "/home";
    } catch (err: any) {
      setError(err.response?.data?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex items-center justify-center p-8">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-96 h-96 text-white"
          >
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
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-12 h-12 text-white"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </g>
              </svg>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold mb-3">
                Lo que está pasando ahora
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold">Únete Hoy</h2>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  as="input"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </form>

            <div className="my-6">
              <Link href="/register" className="block w-full">
                <Button variant="outline" className="w-full">
                  Crear cuenta
                </Button>
              </Link>
            </div>



            <div className="text-center text-sm text-gray-500 mt-4">
              Al registrarte, aceptas los{" "}
              <Link href="" className="text-blue-500 hover:underline">
                Términos de servicio
              </Link>{" "}
              y la{" "}
              <Link href="" className="text-blue-500 hover:underline">
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
