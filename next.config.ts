import type { NextConfig } from 'next';

/**
 * Fijamos explícitamente la raíz de Turbopack para este proyecto.
 * Esto evita que Next.js tome `/Users/lucaswaisten` como root cuando
 * detecta varios `package-lock.json` y así se asegure de servir
 * los archivos estáticos desde `./public`.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
