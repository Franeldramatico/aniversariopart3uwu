'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function UIControls() {
  const [showHelp, setShowHelp] = useState(true);
  const [dateStr, setDateStr] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [letterOpacity, setLetterOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowHelp(false), 6000);
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    setDateStr(`${day} · ${month} · ${year}`);
    return () => clearTimeout(timer);
  }, []);

  const openLetter = () => {
    setShowLetter(true);
    setTimeout(() => setLetterOpacity(1), 50);
  };

  const closeLetter = () => {
    setLetterOpacity(0);
    setTimeout(() => setShowLetter(false), 500);
  };

  return (
    <>
      {/* Fecha sutil arriba a la izquierda */}
      <div className="fixed top-6 left-6 z-40 pointer-events-none">
        <span className="text-rose/40 text-xs tracking-[0.2em] font-light">
          {dateStr}
        </span>
      </div>

      {/* Título como atmósfera, no como objeto dominante */}
      <div className="hero-copy fixed inset-x-0 top-[12vh] z-30 flex flex-col items-center pointer-events-none select-none px-4">
        <div className="relative mb-3">
          <h1 
           className="font-cinzel text-[clamp(1.7rem,5vw,4.3rem)] leading-none text-transparent bg-clip-text bg-gradient-to-b from-rose/62 via-lilac/44 to-transparent text-center"
             style={{ letterSpacing: '0.08em', textShadow: '0 0 44px rgba(247, 37, 133, 0.18)' }}
           >
            Aranxita
          </h1>
          <div className="flex items-center justify-center my-1.5">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-rose/35"></div>
            <span className="mx-3 text-rose/52 text-xl">&</span>
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-rose/35"></div>
          </div>
          <h1 
           className="font-cinzel text-[clamp(1.7rem,5vw,4.3rem)] leading-none text-transparent bg-clip-text bg-gradient-to-t from-rose/62 via-lilac/44 to-transparent text-center"
             style={{ letterSpacing: '0.08em', textShadow: '0 0 44px rgba(247, 37, 133, 0.18)' }}
           >
            Fran
          </h1>
        </div>
        <p 
           className="font-serif text-moon/58 text-[0.7rem] md:text-sm uppercase font-light mt-3"
          style={{ letterSpacing: '0.26em' }}
        >
          Amor Eterno
        </p>
        
        <div className="mt-5 flex items-center gap-3 opacity-45">
          <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent to-rose/50"></div>
          <span className="text-rose/60 text-xs">✦</span>
          <div className="w-16 h-[0.5px] bg-gradient-to-l from-transparent to-rose/50"></div>
        </div>
      </div>

      {/* Botón de carta emocional - Call to Action claro */}
      <div className="hero-cta fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
          <button 
            onClick={openLetter}
            className="group relative min-w-[160px] px-7 py-3 bg-rose/15 hover:bg-rose/25 border border-rose/30 hover:border-rose/50 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-auto hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_24px_rgba(247,37,133,0.2)] hover:shadow-[0_0_36px_rgba(247,37,133,0.35)]"
          >
            <span className="relative z-10 text-rose/80 group-hover:text-white text-xs md:text-sm uppercase font-medium tracking-wider">
              Abrir Carta
            </span>
           <div className="absolute inset-0 rounded-full bg-rose/10 blur-xl group-hover:bg-rose/20 group-hover:blur-2xl transition-all duration-300"></div>
         </button>
        
        <div className={`transition-all duration-1000 ${showHelp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 text-moon/36 text-[10px] uppercase bg-black/28 px-5 py-2 rounded-full backdrop-blur-sm" style={{ letterSpacing: '0.12em' }}>
            <span>14 Feb 2024</span>
            <span className="w-1 h-1 bg-rose/30 rounded-full"></span>
            <span>Hoy</span>
            <span className="w-1 h-1 bg-rose/30 rounded-full"></span>
            <span>Siempre</span>
          </div>
        </div>
      </div>

      {/* Footer sutil */}
        <div className="fixed bottom-4 left-0 w-full text-center text-rose/10 text-[9px] font-cinzel tracking-[0.4em] z-30">
          SOLO TÚ Y YO
        </div>

      {/* Modal de carta emocional */}
      {showLetter && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
          style={{ backgroundColor: 'rgba(5, 9, 21, 0.85)', backdropFilter: 'blur(10px)' }}
          onClick={closeLetter}
        >
          <div 
            className="relative max-w-lg w-full bg-gradient-to-b from-[#1a0b2e] to-[#0a0519] border border-rose/15 rounded-2xl p-8 md:p-10"
            style={{ 
              opacity: letterOpacity,
              transition: 'opacity 0.5s ease',
              boxShadow: '0 0 60px rgba(247, 37, 133, 0.1), inset 0 0 30px rgba(247, 37, 133, 0.05)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeLetter}
              className="absolute top-4 right-4 text-rose/40 hover:text-rose/80 transition-colors text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div className="text-rose/60 text-4xl mb-3">💌</div>
              <h2 className="font-cinzel text-2xl md:text-3xl text-rose/70 tracking-wider mb-2">
                Para ti
              </h2>
              <div className="w-16 h-[1px] bg-rose/30 mx-auto"></div>
            </div>
            
            <div className="text-moon/70 font-serif text-base leading-relaxed space-y-4">
              <p className="italic text-rose/60 text-center mb-6">
                "Cada estrella en el cielo guarda un recuerdo nuestro..."
              </p>
              <p>
                Hoy celebramos nuestro amor, esa conexión única que nació entre una gótica soñadora y un chico especial.
              </p>
              <p>
                No es solo una fecha más en el calendario. Es el recordatorio de que decidimos caminar juntos, construyendo nuestra propia historia.
              </p>
              <p className="text-rose/80 font-cinzel text-sm tracking-wider text-center mt-6 pt-4 border-t border-rose/20">
                Te amo, hoy y siempre ✨
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
