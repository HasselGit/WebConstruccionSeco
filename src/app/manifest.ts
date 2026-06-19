import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Construcción en Seco PWA',
    short_name: 'Construccion',
    description: 'PWA Corporativa para Construcción en Seco',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#000000',
  };
}
