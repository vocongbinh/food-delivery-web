import * as React from 'react';
import { ProductRow } from '../ProductRow/ProductRow';

export interface ProductItem {
    id: string;
    number: string;
    name: string;
    graphSrc: string;
    percentage: number;
    color: 'orange' | 'sky' | 'pink';
  }
export function TopProducts({className}: {className?: string}) {
  const products: ProductItem[] = [
    {
      id: '1',
      number: '01',
      name: 'Home Decore Range',
      graphSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b5b461bc50596a047e0798dfb1f58de03cdf41e1bdec14061cd8a6bb3c222f32?placeholderIfAbsent=true&apiKey=b709cdafa65c4470aad420a0d8703606',
      percentage: 46,
      color: 'orange'
    },
    {
      id: '2',
      number: '03',
      name: 'Bathroom Essentials',
      graphSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9cf213dae0852da6aecf24f927789b2a3bfd9786f8063a2f32a59bf8b4802a23?placeholderIfAbsent=true&apiKey=b709cdafa65c4470aad420a0d8703606',
      percentage: 19,
      color: 'sky'
    },
    {
      id: '3',
      number: '04',
      name: 'Apple Smartwatch',
      graphSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/18d706a1649c7d7b8342e694520fa187da9bad9e723343ae6c8b908ec4ae0edb?placeholderIfAbsent=true&apiKey=b709cdafa65c4470aad420a0d8703606',
      percentage: 29,
      color: 'pink'
    }
  ];

  return (
    <section className={`flex flex-col rounded-none ${className}`} aria-labelledby="top-products-heading">
      <div className="flex flex-col pt-3.5 pb-2 w-full rounded-xl h-full dark:bg-zinc-800 max-md:max-w-full bg-neutral-100 px-5">
        <div className="flex gap-5 justify-between items-end self-center w-full max-md:max-w-full">
          <div className="flex flex-col self-stretch">
            <h2 id="top-products-heading" className="text-base font-semibold dark:text-white text-black max-md:mr-2.5">
              Top Products
            </h2>
            <div className="flex gap-5 justify-between mt-5 text-sm font-medium whitespace-nowrap text-zinc-500">
              <div>#</div>
              <div>Name</div>
            </div>
          </div>
          <div className="mt-9 text-sm font-medium text-zinc-500">Popularity</div>
          <div className="mt-9 text-sm font-medium text-zinc-500">Sales</div>
        </div>
        <div className="mt-2.5 w-full min-h-0 border border-solid border-white border-opacity-10 max-md:max-w-full" />
        
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <ProductRow {...product} />
            <div className="mt-2 w-full min-h-0 border border-solid border-white border-opacity-10 max-md:max-w-full" />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}