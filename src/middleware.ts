import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // opengraph-image fica de fora: a URL da imagem já sai com o idioma (/en/...) e o
  // middleware respondia 307 para a versão sem prefixo. Rede social que não segue
  // redirecionamento ficava sem imagem.
  matcher: ["/", "/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
};
