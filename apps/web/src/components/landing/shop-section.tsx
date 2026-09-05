/**
 * @file apps/web/src/components/landing/shop-section.tsx
 * @description Layer 1: Presentation - Official Merchandise Section.
 * Clones the Exhale Shop block with brutalist cards for the Balaclava, Gothic Hoodie, and Vinyl Boxsets.
 */

import React from "react";
import Image from "next/image";
import { getMerchProducts } from "@/lib/infrastructure/label-catalog";
import { TactileButton } from "@/components/ui/tactile-button";

/**
 * Merchandise section showcasing official label gear and vinyl artifacts.
 *
 * @returns {React.ReactElement} The rendered shop block.
 */
export function ShopSection(): React.ReactElement {
  const products = getMerchProducts();

  return (
    <section id="shop" className="w-full border-b border-raveBorder bg-panel/70 py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-raveRed pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-raveRed">
              {"// OFFICIAL LABEL ARTIFACTS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              OFFICIAL <br className="hidden sm:inline" />
              <span className="text-raveRed">MERCHANDISE</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-raveTextMuted">
            WORLDWIDE SHIPPING &bull; LIMITED WAREHOUSE DROPS
          </span>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col border border-raveBorder bg-black p-5 transition-all duration-300 hover:border-raveRed hover:shadow-rave"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-raveBorder/60 bg-neutral-950 flex items-center justify-center">
                {product.category === "accessories" ? (
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-raveRed shadow-raveGlow">
                    <Image
                      src="/assets/images/industrial-girls-badge-mask.jpg"
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="relative h-28 w-44 overflow-hidden border border-raveRed/40 bg-black">
                    <Image
                      src="/assets/images/industrial-girls-logo-grid.png"
                      alt={product.name}
                      fill
                      sizes="176px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Stock Tag */}
                <div className="absolute top-2 right-2 border border-raveRed bg-black/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-raveRed">
                  {product.inStock ? "IN STOCK" : "PRE-ORDER"}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-raveTextMuted">
                    <span>CAT: {product.category.toUpperCase()}</span>
                    <span className="font-bold text-white text-sm">
                      &euro; {product.price.toFixed(2)} {product.currency}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-black uppercase tracking-tight text-white group-hover:text-raveRed transition-colors">
                    {product.name}
                  </h3>
                  {product.sizes && (
                    <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
                      <span>SIZING:</span>
                      {product.sizes.map((s) => (
                        <span key={s} className="border border-raveBorder px-1.5 py-0.5 text-neutral-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buy Button Trigger */}
                <div className="mt-6 pt-3 border-t border-raveBorder">
                  <TactileButton variant="primary" size="sm" className="w-full">
                    <span className="flex items-center justify-center gap-2">
                      <span>[ PURCHASE ARTIFACT ]</span>
                      <span className="text-xs">&rarr;</span>
                    </span>
                  </TactileButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
