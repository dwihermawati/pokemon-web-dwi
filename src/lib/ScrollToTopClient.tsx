'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTopClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}
