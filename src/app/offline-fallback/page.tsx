export default function OfflineFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Sin Conexión</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Parece que has perdido la conexión a internet. Sin embargo, gracias a nuestra PWA, puedes seguir consultando los manuales cacheados en tu dispositivo.
      </p>
      <button 
        onClick={() => window.history.back()} 
        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Volver atrás
      </button>
    </div>
  );
}
