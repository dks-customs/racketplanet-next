import { MetadataRoute } from "next";
import { CANONICAL_BASE } from "../constants/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  // ---- POJEDYNCZE ----
  // lastModified ustawić w momencie wrzucania strony na nexta
  //RACKET MAPA
  //WYDARZENIA
  //POLITYKA PRYWATNOSCI
  //REGULAMIN
  //O NAS
  //KONTAKT
  //REDAKCJA

  //ARTYKUŁY
  // lastModified jako moment wrzucenia strony na nexta lub jeśli data publikacji artykułu późniejsza, jako data publikacji artykułu
  // ID/SLUG

  //SPORT/HISTORIA
  //SPORT/ZASADY
  //SPORT/W POLSCE
  //last Modified jako moment wrzucenia strony na nexta

  //STRONY Z PAGINACJA

  // ---- WIECEJ ----
  //DYSCYPLINY
  //TAGI
  //
  return [
    {
      url: CANONICAL_BASE,
      lastModified: new Date(),
    },
  ];
}
