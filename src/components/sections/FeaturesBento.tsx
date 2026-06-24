import {
  Wallet,
  Zap,
  Leaf,
  Thermometer,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Flame,
  VolumeX,
  Feather,
  Activity
} from "lucide-react";

const REASONS = [
  {
    icon: Wallet,
    title: "Costos Fijos",
    description: "Presupuestos cerrados sin sorpresas de último momento.",
  },
  {
    icon: Zap,
    title: "Velocidad",
    description: "Tiempos de entrega hasta un 60% más rápidos que el sistema tradicional.",
  },
  {
    icon: Leaf,
    title: "Sostenible",
    description: "Mínimo desperdicio y huella de carbono reducida en obra.",
  },
  {
    icon: Thermometer,
    title: "Aislación Térmica",
    description: "Confort superior y ahorro energético garantizado por diseño.",
  },
  {
    icon: PencilRuler,
    title: "Diseño Flexible",
    description: "Libertad arquitectónica total sin límites estructurales rígidos.",
  },
  {
    icon: ShieldCheck,
    title: "Durabilidad",
    description: "Acero galvanizado de alta resistencia, inalterable al tiempo.",
  },
  {
    icon: Sparkles,
    title: "Obra Limpia",
    description: "Eliminación de escombros y ruidos molestos excesivos.",
  },
  {
    icon: BadgeCheck,
    title: "Garantía Real",
    description: "Respaldo total post-obra por nuestro equipo de expertos.",
  },
  {
    icon: Flame,
    title: "Ignífugo",
    description: "Materiales incombustibles que garantizan máxima seguridad ante incendios.",
  },
  {
    icon: VolumeX,
    title: "Acústica Superior",
    description: "Aislación sonora multicapa que asegura privacidad y descanso.",
  },
  {
    icon: Feather,
    title: "Eficiencia de Carga",
    description: "Estructuras livianas que reducen los costos y volumen de cimentación.",
  },
  {
    icon: Activity,
    title: "Sismorresistente",
    description: "Flexibilidad estructural superior que absorbe energías sísmicas sin colapsar.",
  }
];

export function FeaturesBento() {
  return (
    <section className="py-24 bg-surface px-6 md:px-16 lg:px-24 w-full relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-6">
            12 Razones para elegirnos
          </h2>
          <p className="font-sans text-lg text-foreground/80">
            La eficiencia del Steel Framing combinada con nuestra filosofía de acompañamiento integral y precisión arquitectónica.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {REASONS.map((reason, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 md:p-8 rounded-2xl sunlight-shadow border border-border/40 transition-all duration-300 md:hover:scale-[1.02] md:hover:border-secondary/50 group flex flex-col sticky top-24 md:static z-10"
              style={{ top: `calc(6rem + ${(idx % 12) * 6}px)` }}
            >
              <div className="mb-5 p-3 bg-secondary/5 text-secondary rounded-xl w-fit group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <reason.icon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-xl md:text-xl text-primary font-bold mb-3">
                {reason.title}
              </h3>
              <p className="font-sans text-foreground/70 leading-relaxed text-base md:text-sm flex-1">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-sans text-foreground/60 italic text-sm tracking-wide">
            + Calidad Constructiva, Precisión Milimétrica, Flexibilidad y Compromiso Humano.
          </p>
        </div>
      </div>
    </section>
  );
}
