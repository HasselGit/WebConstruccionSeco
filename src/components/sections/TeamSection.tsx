import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TEAM = [
  {
    name: "Ing. Julián Martí",
    role: "Director Técnico",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7PP-SY7U5EIf1dnG7aMt7KC-z6ms0BcMkg4Zd5cZHQL__cxLx-IWeSSdXi-I7aPakdxTsTybi9qYGh4d2d-3nkmaIOBh-hRYTTfEsatl-6Zxa6L8OH2LclX-aXChUFbEze-YBfm4Qv7DR_lmC9LYJrxRgw_Da1RcB7YZJJguKWKETthutlKuSNrvjt5hzVZBYXFCjcDxBZu0s7z1KzfIuH5x6t2XrPtPhYoBlFjr48sTXPICJLEub6_yioKCM5pfCuqG7VgJG160"
  },
  {
    name: "Arq. Elena Rossi",
    role: "Diseño & Sustentabilidad",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEPF8d3akTM4T6OdF7i5OYxiXGncT9BT4gPFSvFwv9nbLfVAZgdN9Svs1plXrNVZntWOXko9hqwJK9lrryLIxjJGuoumE0gQCiW8t6XTjtw2CO-sjN4L6tS6vq_3pDTqcE43wilzaSBcebM5e37aWCBMQEQz6MIod-9JDN4RZwrmYqhkI1WKFoFzOOHuO1JNhPY62TUHLJTxxGGyPYV2R16gNqXakyMj39bCeDeU29PDy6esFKGIIHEgnYfVox9fEsqqJcqYcHmgY"
  },
  {
    name: "Marcos Valenzuela",
    role: "Jefe de Obra",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-E17aHmQMyl7ZsJfFGA6gHhq255pK5ypFJh88lA1RqT9eZcEQ2e46S847S0y1oOaoZb4-zLpmRQfZEfWdEi9vN69pZAyzGm41v05-lQf2_9sf_HoKsjJbcC7SemXEQzhbqL168-flWXB-hy-X7iIYlhWTcmIh1ZzQmmSPLUs7gJFD80taGgADtEA-Lxmywb0G6t8UofYpDbmLHqVYNCfPBIn7eqoReZuR8fQ_KJlvcYq65NLWs9S7P7CrshcEFBuUBizIL7UoF1U"
  }
];

export function TeamSection() {
  return (
    <>
      <section className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 items-end mb-16">
          <div className="max-w-xl">
            <h2 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-4">
              El Equipo Detrás del Sueño
            </h2>
            <p className="font-sans text-lg text-foreground/80">
              Personas reales apasionadas por la construcción de calidad. Profesionales que escuchan antes de diseñar y cuidan cada detalle antes de construir.
            </p>
          </div>
          <div className="md:ml-auto">
            <Link 
              href="/nosotros" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              Conocer al equipo completo
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {TEAM.map((member, idx) => (
            <div key={idx} className="space-y-6 group cursor-pointer">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/40 sunlight-shadow grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div>
                <h4 className="font-heading text-2xl text-primary font-bold">
                  {member.name}
                </h4>
                <p className="text-secondary font-sans font-semibold tracking-wide uppercase text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final Envolvente */}
      <section className="py-24 px-6 md:px-16 lg:px-24 w-full">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-12 md:p-20 lg:p-24 text-center relative overflow-hidden sunlight-shadow">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8 leading-tight">
              ¿Listo para construir su próximo capítulo?
            </h2>
            <p className="font-sans text-lg md:text-xl text-white/80 mb-12 leading-relaxed">
              Permítanos guiarlo a través del proceso Stewardship. Una forma de construir donde su tranquilidad y la seguridad de su familia son nuestro cimiento principal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contacto" 
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-secondary text-white px-10 py-5 rounded-full font-sans font-bold hover:bg-secondary/90 transition-all shadow-xl hover:scale-105"
              >
                Agendar Asesoría Gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/catalogo" 
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-transparent border border-white/30 text-white px-10 py-5 rounded-full font-sans font-semibold hover:bg-white/10 transition-all"
              >
                Ver Catálogo de Viviendas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
