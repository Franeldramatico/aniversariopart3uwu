'use client';

import React, { useState } from 'react';

const memories = [
  { id: 1, title: 'Nuestro inicio', emoji: '💘', color: '#f72585' },
  { id: 2, title: 'Primera cita', emoji: '☕', color: '#ff7f9f' },
  { id: 3, title: 'Viajes juntos', emoji: '✈️', color: '#b388ff' },
  { id: 4, title: 'Risas y abrazos', emoji: '🤗', color: '#8a5fcc' },
  { id: 5, title: 'Momentos únicos', emoji: '✨', color: '#ff9fbf' },
  { id: 6, title: 'Para siempre', emoji: '♾️', color: '#f72585' }
];

export default function MemoryGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  return (
    <>
       {/* Botón flotante para abrir galería */}
       <button
         onClick={() => setIsOpen(true)}
         className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-rose/20 to-lilac/20 border border-rose/30 hover:border-rose/50 backdrop-blur-md flex items-center justify-center text-2xl hover:scale-110 transition-all duration-300 pointer-events-auto shadow-lg group"
         style={{ boxShadow: '0 0 30px rgba(247, 37, 133, 0.2)' }}
         aria-label="Abrir galería de recuerdos"
       >
         📸
         {/* Tooltip */}
         <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-wider uppercase text-rose/60 bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           Galería
         </span>
       </button>

      {/* Modal de galería */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(5, 9, 21, 0.92)', backdropFilter: 'blur(20px)' }}
          onClick={() => { setIsOpen(false); setSelectedMemory(null); }}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#1a0b2e] to-[#0a0519] border border-rose/20 rounded-2xl p-8 shadow-2xl"
            style={{ boxShadow: '0 0 120px rgba(247, 37, 133, 0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => { setIsOpen(false); setSelectedMemory(null); }}
              className="absolute top-4 right-4 text-rose/40 hover:text-rose/80 transition-colors text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-10">
              <div className="text-4xl mb-4">📸</div>
              <h2 className="font-cinzel text-3xl text-rose/80 tracking-wider mb-2">
                Nuestros Recuerdos
              </h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose/50 to-transparent mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => setSelectedMemory(memory.id)}
                  className="group relative aspect-square rounded-xl border border-rose/10 hover:border-rose/30 cursor-pointer transition-all duration-500 overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${memory.color}15, ${memory.color}05)`,
                    boxShadow: selectedMemory === memory.id ? `0 0 40px ${memory.color}30` : 'none'
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <span className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-500">
                      {memory.emoji}
                    </span>
                    <span className="text-rose/60 text-sm tracking-wider font-light group-hover:text-rose/80 transition-colors">
                      {memory.title}
                    </span>
                  </div>
                  <div 
                    className="absolute inset-0 border border-rose/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 0 30px ${memory.color}20` }}
                  ></div>
                </div>
              ))}
            </div>

            {selectedMemory && (
              <div className="mt-8 p-6 rounded-xl bg-rose/5 border border-rose/20 text-center">
                <p className="text-moon/70 font-serif text-lg italic">
                  "{memories.find(m => m.id === selectedMemory)?.title}: Un momento que guardamos en nuestro corazón ✨"
                </p>
              </div>
            )}

            <div className="text-center mt-8 pt-6 border-t border-rose/10">
              <p className="text-rose/30 font-cinzel text-xs tracking-[0.4em] uppercase">
                Cada recuerdo es un tesoro
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
