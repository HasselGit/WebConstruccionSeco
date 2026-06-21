"use client";

import { useState, useEffect, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, seedDatabase } from "@/lib/idb";
import { Settings, Flame, Leaf, Ear, Plus, Search, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

export function CatalogClient() {
  useEffect(() => {
    seedDatabase();
  }, []);

  const [wizardStep, setWizardStep] = useState(1);
  const [wizardSelections, setWizardSelections] = useState({ perfil: '', placa: '' });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const products = useLiveQuery(() => db.products.toArray());

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (wizardSelections.perfil === '70mm' && !p.name.includes('70')) return false;
      if (wizardSelections.perfil === '92mm' && !p.name.includes('92')) return false;
      return true;
    });
  }, [products, searchQuery, selectedCategories, wizardSelections]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-64px)]">
      {/* SideNavBar (Filtering Sidebar) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 py-6 overflow-y-auto bg-white sticky top-[65px] h-[calc(100vh-65px)]">
        <div className="px-6 mb-8">
          <h3 className="text-xs font-bold tracking-widest text-slate-500 mb-4 uppercase">FILTROS DE SISTEMA</h3>
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold block mb-2 text-slate-800">Categoría</span>
              <div className="space-y-2">
                {['Sistema de Muro', 'Estructura', 'Aislamiento'].map((cat, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-gray-300 text-corporate focus:ring-corporate w-4 h-4" 
                    />
                    <span className="text-sm text-slate-600 group-hover:text-corporate transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold block mb-2 text-slate-800">Tipo de Material</span>
              <div className="space-y-2">
                {['Acero Galvanizado', 'Núcleo de Yeso', 'Fibra Mineral'].map((cat, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-corporate focus:ring-corporate w-4 h-4" />
                    <span className="text-sm text-slate-600 group-hover:text-corporate transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold block mb-2 text-slate-800">Calificación de Rendimiento</span>
              <div className="space-y-2">
                {['Resistente al Fuego (FR)', 'Clasificación Acústica (STC)', 'Resistente a Impactos'].map((cat, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-corporate focus:ring-corporate w-4 h-4" />
                    <span className="text-sm text-slate-600 group-hover:text-corporate transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto px-4 py-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 bg-corporate text-white rounded-lg py-2 text-xs font-bold tracking-widest hover:opacity-90 transition-all uppercase">
            <Settings className="w-4 h-4" />
            CONFIGURAR PREDETERMINADOS
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-x-hidden bg-steel-silver/20">
        
        <section className="mb-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-corporate">Asistente de Selección de Sistema</h2>
              <p className="text-sm text-slate-500">Configure su sistema de muro estructural eligiendo las capas.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-widest text-corporate uppercase">Paso {wizardStep} de 2: {wizardStep === 1 ? 'Estructura' : 'Tipo de Placa'}</span>
              <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`bg-corporate h-full transition-all duration-500 ${wizardStep === 1 ? 'w-1/2' : 'w-full'}`}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Technical Illustration */}
            <div className="relative bg-steel-silver rounded-lg p-8 border border-gray-200 overflow-hidden group min-h-[320px] flex items-center justify-center">
              <div className="relative w-full aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-64 h-48 border rounded transform -skew-x-12 translate-x-10 shadow-lg flex items-end p-4 transition-all duration-500 ${wizardStep === 2 && wizardSelections.placa ? 'bg-corporate text-white border-corporate' : 'bg-white border-gray-300'}`}>
                    <span className="text-[10px] font-bold tracking-widest opacity-80">{wizardSelections.placa || 'CAPA DE YESO'}</span>
                  </div>
                  <div className={`w-64 h-48 transform -skew-x-12 shadow-md flex items-end p-4 transition-all duration-500 ${wizardStep === 1 && wizardSelections.perfil ? 'bg-slate-300 border-slate-400' : 'bg-slate-100 border-slate-300'}`}>
                    <span className="text-[10px] font-bold tracking-widest text-slate-600">{wizardSelections.perfil ? `PERFIL ${wizardSelections.perfil}` : 'NÚCLEO DE ACERO'}</span>
                  </div>
                  <div className="w-64 h-48 bg-slate-800 border border-slate-900 transform -skew-x-12 -translate-x-10 shadow-sm flex items-end p-4 opacity-50">
                    <span className="text-[10px] font-bold tracking-widest text-white">AISLAMIENTO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {wizardStep === 1 && (
                <>
                  <h4 className="text-xl font-semibold text-slate-800">Estructura Base</h4>
                  <p className="text-sm text-slate-600">Seleccione el grosor del perfil de acero. Esto determinará la resistencia estructural del muro.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setWizardSelections(s => ({ ...s, perfil: '70mm' }))} className={`border-2 p-4 rounded-lg text-left transition-all ${wizardSelections.perfil === '70mm' ? 'border-corporate bg-slate-50' : 'border-gray-200 hover:border-corporate'}`}>
                      <div className={`text-xs font-bold tracking-widest mb-1 ${wizardSelections.perfil === '70mm' ? 'text-corporate' : 'text-slate-600'}`}>PERFIL C 70mm</div>
                      <div className="text-sm font-medium text-slate-600">Interior Estándar</div>
                    </button>
                    <button onClick={() => setWizardSelections(s => ({ ...s, perfil: '92mm' }))} className={`border-2 p-4 rounded-lg text-left transition-all ${wizardSelections.perfil === '92mm' ? 'border-corporate bg-slate-50' : 'border-gray-200 hover:border-corporate'}`}>
                      <div className={`text-xs font-bold tracking-widest mb-1 ${wizardSelections.perfil === '92mm' ? 'text-corporate' : 'text-slate-600'}`}>PERFIL C 92mm</div>
                      <div className="text-sm font-medium text-slate-600">Carga Pesada / Acústico</div>
                    </button>
                  </div>
                </>
              )}

              {wizardStep === 2 && (
                <>
                  <h4 className="text-xl font-semibold text-slate-800">Placa de Revestimiento</h4>
                  <p className="text-sm text-slate-600">Seleccione el tipo de placa de yeso para cubrir la estructura.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setWizardSelections(s => ({ ...s, placa: 'Estándar' }))} className={`border-2 p-4 rounded-lg text-left transition-all ${wizardSelections.placa === 'Estándar' ? 'border-corporate bg-slate-50' : 'border-gray-200 hover:border-corporate'}`}>
                      <div className={`text-xs font-bold tracking-widest mb-1 ${wizardSelections.placa === 'Estándar' ? 'text-corporate' : 'text-slate-600'}`}>YESO ESTÁNDAR</div>
                      <div className="text-sm font-medium text-slate-600">12.5mm Básico</div>
                    </button>
                    <button onClick={() => setWizardSelections(s => ({ ...s, placa: 'Resistente' }))} className={`border-2 p-4 rounded-lg text-left transition-all ${wizardSelections.placa === 'Resistente' ? 'border-corporate bg-slate-50' : 'border-gray-200 hover:border-corporate'}`}>
                      <div className={`text-xs font-bold tracking-widest mb-1 ${wizardSelections.placa === 'Resistente' ? 'text-corporate' : 'text-slate-600'}`}>PLACA RESISTENTE</div>
                      <div className="text-sm font-medium text-slate-600">Fuego y Humedad</div>
                    </button>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setWizardStep(1)}
                  disabled={wizardStep === 1}
                  className={`text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors ${wizardStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-slate-600 hover:text-corporate'}`}
                >
                  <ChevronLeft className="w-4 h-4" /> ATRÁS
                </button>
                {wizardStep === 1 ? (
                  <button 
                    onClick={() => setWizardStep(2)}
                    disabled={!wizardSelections.perfil}
                    className={`px-8 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${!wizardSelections.perfil ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-corporate text-white hover:opacity-90'}`}
                  >
                    SIGUIENTE <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                       // En un caso real se añadiría al presupuesto, aquí filtramos la lista.
                       const search = wizardSelections.placa === 'Resistente' ? 'RF' : 'Yeso';
                       setSearchQuery(search);
                    }}
                    disabled={!wizardSelections.placa}
                    className={`px-8 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${!wizardSelections.placa ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> APLICAR FILTRO
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-800">Catálogo de Sistemas</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o ID..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate focus:border-transparent w-full md:w-64 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              No se encontraron sistemas que coincidan con los filtros.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm group hover:border-corporate transition-all flex flex-col">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.techSpecs.fireRating && (
                    <span className="bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-gray-200 flex items-center gap-1 text-red-600">
                      <Flame className="w-3 h-3" /> {product.techSpecs.fireRating}
                    </span>
                  )}
                  {product.techSpecs.eco && (
                    <span className="bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-gray-200 flex items-center gap-1 text-green-600">
                      <Leaf className="w-3 h-3" /> ECO
                    </span>
                  )}
                  {product.techSpecs.nrc && (
                    <span className="bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-gray-200 flex items-center gap-1 text-indigo-600">
                      <Ear className="w-3 h-3" /> {product.techSpecs.nrc}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-corporate">{product.name}</h3>
                  <span className="text-sm font-medium text-slate-500">{product.techSpecs.thickness}</span>
                </div>
                <p className="text-sm text-slate-600 mb-6 line-clamp-2 flex-1">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-corporate font-bold">${product.price.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ unidad</span></div>
                  <button className="bg-corporate text-white px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" /> AÑADIR
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Technical Specs Table */}
        <section className="mt-12 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold tracking-widest uppercase text-corporate">MÉTRICAS DE RENDIMIENTO DETALLADAS</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">DISPONIBLE SIN CONEXIÓN</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold tracking-widest uppercase text-slate-500">ID de Componente</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-widest uppercase text-slate-500">Resistencia al Fuego</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-widest uppercase text-slate-500">STC Acústico</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-widest uppercase text-slate-500">Capacidad de Carga</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-widest uppercase text-slate-500">Valor R Térmico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts?.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-corporate">{p.id}</td>
                    <td className="px-6 py-4 text-slate-700">{p.techSpecs.fireRating || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{p.techSpecs.stc || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-500">{p.techSpecs.load || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-700">{p.techSpecs.rValue || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
