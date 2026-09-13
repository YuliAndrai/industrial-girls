/**
 * @file apps/web/src/lib/infrastructure/seo-schema.test.ts
 * @description Layer 4 / Tests: Unit and regression test suite for Schema.org JSON-LD structured data.
 * Verifies graph structure, entity definitions (MusicGroup, MusicPlatform), authority Wikipedia entities,
 * genre spectrum, and layout.tsx integration invariants.
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { ROOT_JSON_LD_SCHEMA } from './seo-schema';

describe('Schema.org JSON-LD Root Infrastructure Invariants', () => {
  it('declares valid https://schema.org context and two graph entities', () => {
    // Step 1: Assert context URI
    expect(ROOT_JSON_LD_SCHEMA['@context']).toBe('https://schema.org');

    // Step 2: Assert graph exists and contains exactly 2 entities
    expect(Array.isArray(ROOT_JSON_LD_SCHEMA['@graph'])).toBe(true);
    expect(ROOT_JSON_LD_SCHEMA['@graph']).toHaveLength(2);
  });

  describe('MusicGroup Organization Entity', () => {
    const musicGroup = ROOT_JSON_LD_SCHEMA['@graph'][0];

    it('has valid MusicGroup identification, names, and canonical URL', () => {
      // Step 1: Verify entity type and canonical ID
      expect(musicGroup['@type']).toBe('MusicGroup');
      expect(musicGroup['@id']).toBe('https://industrialgirls.com/#organization');

      // Step 2: Verify primary and alternate monikers
      expect(musicGroup.name).toBe('Industrial Girls');
      expect(musicGroup.alternateName).toEqual([
        'Industrial Girls Music',
        'Industrial Girls Records',
      ]);

      // Step 3: Verify canonical URL and descriptive claim
      expect(musicGroup.url).toBe('https://industrialgirls.com');
      expect(musicGroup.description).toContain('Plataforma cultural');
      expect(musicGroup.description).toContain('sello discográfico');
      expect(musicGroup.description).toContain('mujeres en la música electrónica');
    });

    it('contains all 7 underground electronic music genres', () => {
      // Step 1: Verify genre spectrum integrity
      const expectedGenres = [
        'Techno',
        'Industrial Techno',
        'Hard Techno',
        'Acid Techno',
        'EBM',
        'Groove Techno',
        'Trance',
      ];
      expect(musicGroup.genre).toEqual(expectedGenres);
    });

    it('declares complete knowsAbout array with conceptual tags and Wikipedia authority URLs', () => {
      // Step 1: Verify conceptual and cultural topic entities
      const expectedConcepts = [
        'Women in Electronic Music',
        'Female DJs',
        'Techno Culture',
        'Gender Diversity in Electronic Music',
        'Underground Electronic Music',
        'Electronic Music Label',
        'Artist Development',
      ];
      expectedConcepts.forEach((concept) => {
        expect(musicGroup.knowsAbout).toContain(concept);
      });

      // Step 2: Verify Wikipedia global authority entity links
      const expectedWikipediaLinks = [
        'https://en.wikipedia.org/wiki/Charlotte_de_Witte',
        'https://en.wikipedia.org/wiki/Amelie_Lens',
        'https://en.wikipedia.org/wiki/Nina_Kraviz',
        'https://en.wikipedia.org/wiki/Peggy_Gou',
        'https://en.wikipedia.org/wiki/Sara_Landry',
        'https://en.wikipedia.org/wiki/Awakenings',
        'https://en.wikipedia.org/wiki/MUTEK',
      ];
      expectedWikipediaLinks.forEach((wikiUrl) => {
        expect(musicGroup.knowsAbout).toContain(wikiUrl);
      });

      // Step 3: Verify total knowsAbout count
      expect(musicGroup.knowsAbout).toHaveLength(14);
    });

    it('serves 4 distinct geographical administrative areas', () => {
      // Step 1: Verify area served structure
      const expectedAreas = [
        { '@type': 'AdministrativeArea', name: 'Global' },
        { '@type': 'AdministrativeArea', name: 'Colombia' },
        { '@type': 'AdministrativeArea', name: 'Europe' },
        { '@type': 'AdministrativeArea', name: 'Asia' },
      ];
      expect(musicGroup.areaServed).toEqual(expectedAreas);
    });
  });

  describe('MusicPlatform Label Entity', () => {
    const musicPlatform = ROOT_JSON_LD_SCHEMA['@graph'][1];

    it('has valid MusicPlatform identification and parentOrganization reference', () => {
      // Step 1: Verify entity type and canonical ID
      expect(musicPlatform['@type']).toBe('MusicPlatform');
      expect(musicPlatform['@id']).toBe('https://industrialgirls.com/#label');

      // Step 2: Verify label name
      expect(musicPlatform.name).toBe('Industrial Girls Record Label');

      // Step 3: Verify parentOrganization linkage to organization ID
      expect(musicPlatform.parentOrganization).toEqual({
        '@id': 'https://industrialgirls.com/#organization',
      });
    });
  });

  describe('Root Layout Static Integration Invariants', () => {
    it('verifies apps/web/src/app/layout.tsx imports and renders application/ld+json script', () => {
      // Step 1: Read layout.tsx source
      const layoutPath = path.resolve(__dirname, '../../app/layout.tsx');
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');

      // Step 2: Verify import of ROOT_JSON_LD_SCHEMA
      expect(layoutContent).toContain('ROOT_JSON_LD_SCHEMA');

      // Step 3: Verify script tag with application/ld+json
      expect(layoutContent).toContain('type="application/ld+json"');
      expect(layoutContent).toContain('dangerouslySetInnerHTML');
    });
  });
});

