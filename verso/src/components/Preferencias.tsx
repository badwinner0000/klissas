'use client';
import { useEffect } from 'react';
/** Aplica tema (claro/escuro) e tamanho de letra salvos, em qualquer tela. */
export default function Preferencias() {
  useEffect(() => {
    try {
      const f = Number(localStorage.getItem('verso:fs'));
      if (f >= 14 && f <= 28) document.documentElement.style.setProperty('--fs', `${f}px`);
      document.documentElement.dataset.tema = localStorage.getItem('verso:tema') === 'claro' ? 'claro' : 'escuro';
    } catch { /* usa o padrão */ }
  }, []);
  return null;
}
