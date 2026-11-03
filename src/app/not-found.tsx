"use client";

import NextError from "next/error";

// O layout raiz não renderiza <html> (ele mora em [locale]/layout.tsx). Este 404 cobre as
// rotas que não passam pelo [locale], como /arquivo-inexistente.txt, e por isso traz o próprio <html>.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
