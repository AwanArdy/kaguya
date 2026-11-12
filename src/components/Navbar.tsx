import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-neutral-300 bg-[#f4f3ef] px-6 py-6 lg:px-12">
      <div className="text-lg font-extrabold tracking-widest text-neutral-900">
        NORDIC // STUDIO
      </div>

      <nav className='hidden gap-8 text-sm font-medium text-neutral-500 md:flex'>
        <a href="#catalog" className='transition-colors hover:text-neutral-900'>
          Katalog
        </a>
        <a href="#custom" className='transition-colors hover:text-neutral-900'>
          Custom 3D
        </a>
        <a href="#about" className='transition-colors hover:text-neutral-900'>
          Tentang
        </a>  
      </nav>

      <button className='text-neutral-900 px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-neutral-900 hover:text-white'>
        Keranjang (0)
      </button>
    </header>
  );
};
