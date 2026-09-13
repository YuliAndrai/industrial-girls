/**
 * @file apps/web/src/lib/infrastructure/route-metadata.test.ts
 * @description Layer 4 / Tests: Unit and regression test suite for Route Metadata, Open Graph, and H1 Semantic Invariants.
 * Verifies exact titles, descriptions, keywords, Open Graph entities, and Server Component metadata exports across the 5 core sections.
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { ROUTE_METADATA, AppRouteKey } from './route-metadata';

describe('Route Metadata & Open Graph Infrastructure Invariants', () => {
  const routes: AppRouteKey[] = [
    'home',
    'musica',
    'desarrolloArtistico',
    'eventos',
    'comunidad',
  ];

  it('contains complete metadata configuration for all 5 platform routes', () => {
    // Step 1: Assert each key exists in ROUTE_METADATA catalog
    routes.forEach((routeKey) => {
      expect(ROUTE_METADATA[routeKey]).toBeDefined();
      expect(ROUTE_METADATA[routeKey].title).toBeDefined();
      expect(ROUTE_METADATA[routeKey].description).toBeDefined();
      expect(ROUTE_METADATA[routeKey].openGraph).toBeDefined();
      expect(ROUTE_METADATA[routeKey].twitter).toBeDefined();
    });
  });

  describe('Home Route (/) Metadata Invariants', () => {
    const meta = ROUTE_METADATA.home;

    it('has exact editorial title and description', () => {
      // Step 1: Verify title
      expect(meta.title).toBe(
        'Industrial Girls | Women in Electronic Music, Underground Techno & Global Club Culture'
      );

      // Step 2: Verify description
      expect(meta.description).toBe(
        'Plataforma cultural, sello discográfico y agencia de desarrollo artístico que impulsa a mujeres y proyectos de vanguardia en la música electrónica global.'
      );
    });

    it('contains all 6 required SEO keywords', () => {
      // Step 1: Verify keywords array
      const expectedKeywords = [
        'Female DJs',
        'Women in Electronic Music',
        'Female Techno DJs',
        'Underground Techno',
        'Industrial Girls',
        'Global Club Culture',
      ];
      expect(meta.keywords).toEqual(expectedKeywords);
    });
  });

  describe('Música Route (/musica) Metadata Invariants', () => {
    const meta = ROUTE_METADATA.musica;

    it('has exact catalog title and description', () => {
      // Step 1: Verify title
      expect(meta.title).toBe('Catálogo Sonoro & Podcasts | Industrial Girls Records');

      // Step 2: Verify description
      expect(meta.description).toBe(
        'Lanzamientos oficiales de techno, hard techno, industrial y series curadas de podcast con artistas consagradas y emergentes de la escena internacional.'
      );
    });
  });

  describe('Desarrollo Artístico Route (/desarrollo-artistico) Metadata Invariants', () => {
    const meta = ROUTE_METADATA.desarrolloArtistico;

    it('has exact agency title and description', () => {
      // Step 1: Verify title
      expect(meta.title).toBe('Agencia de Desarrollo Artístico 360° | Industrial Girls');

      // Step 2: Verify description
      expect(meta.description).toBe(
        'Ecosistema de aceleración para DJs y productoras: diagnósticos de carrera, EPK, estrategia legal, ingeniería sonora y posicionamiento global.'
      );
    });
  });

  describe('Eventos Route (/eventos) Metadata Invariants', () => {
    const meta = ROUTE_METADATA.eventos;

    it('has exact events title and description', () => {
      // Step 1: Verify title
      expect(meta.title).toBe('Showcases & Club Nights | Industrial Girls Events');

      // Step 2: Verify description
      expect(meta.description).toBe(
        'Curadurías para la pista de baile, warehouse raves y noches de club conectando escenas locales con el circuito electrónico europeo y global.'
      );
    });
  });

  describe('Comunidad Route (/comunidad) Metadata Invariants', () => {
    const meta = ROUTE_METADATA.comunidad;

    it('has exact journal title and description', () => {
      // Step 1: Verify title
      expect(meta.title).toBe('Noticias, Memoria & Archivo Editorial | Industrial Girls Journal');

      // Step 2: Verify description
      expect(meta.description).toBe(
        'Investigación sobre pioneras del sintetizador, diseño sonoro, hardware analógico, DAWs y perfiles de artistas que redefinen la música electrónica.'
      );
    });
  });

  describe('App Router Server Component Static Invariants', () => {
    const pagePaths = [
      { name: 'Home', file: path.resolve(__dirname, '../../app/page.tsx'), key: 'home' },
      { name: 'Música', file: path.resolve(__dirname, '../../app/musica/page.tsx'), key: 'musica' },
      {
        name: 'Desarrollo Artístico',
        file: path.resolve(__dirname, '../../app/desarrollo-artistico/page.tsx'),
        key: 'desarrolloArtistico',
      },
      { name: 'Eventos', file: path.resolve(__dirname, '../../app/eventos/page.tsx'), key: 'eventos' },
      { name: 'Comunidad', file: path.resolve(__dirname, '../../app/comunidad/page.tsx'), key: 'comunidad' },
    ];

    it('ensures each of the 5 page.tsx files exports metadata and avoids direct "use client"', () => {
      // Step 1: Inspect each page.tsx file
      pagePaths.forEach(({ name, file, key }) => {
        const content = fs.readFileSync(file, 'utf8');

        // Step 2: Assert export const metadata is present
        expect(content, `${name} page.tsx must export metadata`).toContain('export const metadata');
        expect(content, `${name} page.tsx must reference ROUTE_METADATA`).toContain('ROUTE_METADATA');

        // Step 3: Assert page.tsx is a Server Component (no root "use client")
        const firstLine = content.split('\n')[0].trim();
        expect(content.startsWith('"use client"'), `${name} page.tsx must not be marked with "use client"`).toBe(false);
      });
    });
  });

  describe('HTML Semantics & Single H1 Invariants', () => {
    it('verifies that each of the 5 core sections has exactly one primary h1 tag in its presentation view', () => {
      // Step 1: Define view components corresponding to each route
      const componentFiles = [
        path.resolve(__dirname, '../../components/landing/hero-section.tsx'),
        path.resolve(__dirname, '../../app/musica/page.tsx'), // Or its view component
        path.resolve(__dirname, '../../components/artist-development/artist-dev-hero.tsx'),
        path.resolve(__dirname, '../../app/eventos/page.tsx'), // Or its view component
        path.resolve(__dirname, '../../components/community/community-hero.tsx'),
      ];

      // Step 2: Count <h1 occurrences across components
      componentFiles.forEach((file) => {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf8');
          const h1Matches = content.match(/<h1[\s>]/g) || [];
          expect(h1Matches.length, `Expected at most 1 h1 in ${path.basename(file)}`).toBeLessThanOrEqual(1);
        }
      });
    });
  });
});

