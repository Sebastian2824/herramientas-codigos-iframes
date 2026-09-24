import { defineConfig } from 'vite';
import { resolve } from 'path';
import { cpSync, existsSync } from 'fs';

export default defineConfig({
  base: '/herramientas-codigos-iframes/',
  root: './',
  server: {
    port: 5173,
    open: '/index.html'
  },
  plugins: [
    {
      name: 'copiar-carpetas-estaticas',
      closeBundle() {
        const carpetas = ['JS', 'Config'];
        carpetas.forEach(carpeta => {
          const src = resolve(__dirname, carpeta);
          const dest = resolve(__dirname, 'dist', carpeta);
          if (existsSync(src)) {
            cpSync(src, dest, { recursive: true });
            console.log(`✅ Copiada carpeta: ${carpeta} → dist/${carpeta}`);
          } else {
            console.warn(`⚠️ No existe: ${carpeta}`);
          }
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'Views/Menu-Principal.html'),
        // Añade aquí las rutas de tus interfaces críticas para que Vite las procese al compilar:
        convertirTxtExcel: resolve(__dirname, 'Views/Contenido/Convertir TXT a Excel y Viceversa.html'),
        extractorEnlacesDrive: resolve(__dirname, 'Views/Contenido/Extractor de Enlaces de Archivos Drive.html'),
        extractorIdDailymotion: resolve(__dirname, 'Views/Contenido/Extractor de ID de Dailymotion.html'),
        extractorIdOkru: resolve(__dirname, 'Views/Contenido/Extractor de ID de OKru.html'),
        extractorIdsDriveMega: resolve(__dirname, 'Views/Contenido/Extractor de IDs de Google Drive o Mega.html'),
        generadorEnlacesDescargaDrive: resolve(__dirname, 'Views/Contenido/Generador de Enlaces de Descarga de Drive.html'),
        generadorIframeAbyss: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Abyss a partir de su Enlace.html'),
        generadorIframeBitChute: resolve(__dirname, 'Views/Contenido/Generador de Iframes de BitChute a partir de su Enlace.html'),
        generadorIframeByse: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Byse.html'),
        generadorIframeDailymotion: resolve(__dirname, 'Views/Contenido/Generador de iframes de Dailymotion a partir de la ID.html'),
        generadorIframeDriveMega: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Drive y Mega a Partir de la ID.html'),
        generadorIframeDTube: resolve(__dirname, 'Views/Contenido/Generador de Iframes de DTube.html'),
        generadorIframeJumpshare: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Jumpshare.html'),
        generadorIframeJumpshareV2: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Jumpsharev2.html'),
        generadorIframeOkru: resolve(__dirname, 'Views/Contenido/Generador de Iframes de OKru a partir de la ID.html'),
        generadorIframeRumble: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Rumble a partir de su Enlace.html'),
        generadorIframeTokioVideo: resolve(__dirname, 'Views/Contenido/Generador de Iframes de TokioVideo.html'),
        generadorIframeVidm4: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Vidm4.html'),
        generadorIframeVidm4v2: resolve(__dirname, 'Views/Contenido/Generador de Iframes de Vidm4v2.html'),
        generadorReproductorVideo: resolve(__dirname, 'Views/Contenido/Generador de Reproductor de Video.html'),
        generadorSeparadorEpisodio: resolve(__dirname, 'Views/Contenido/Generador de Separador de Contenido del Video Por Episodio.html'),
        generadorSeparadorTemporada: resolve(__dirname, 'Views/Contenido/Generador de Separador de Contenido del Video Por Temporada.html'),
        generadorSeparadorSwitch: resolve(__dirname, 'Views/Contenido/Generador de Separador de Swicth.html'),
        generadorAgruparEnlacesDescarga: resolve(__dirname, 'Views/Contenido/Generador para Agrupar los Enlaces de Descarga.html'),
        generadorAgruparSwitch: resolve(__dirname, 'Views/Contenido/Generador para Agrupar los Swicth de Incrustación.html'),
        modificacionEnlacesDailymotion: resolve(__dirname, 'Views/Contenido/Modificación de Enlaces de Dailymotion.html'),
        modificacionEnlacesDrive: resolve(__dirname, 'Views/Contenido/Modificación de Enlaces de Drive.html')
      }
    }
  }
});