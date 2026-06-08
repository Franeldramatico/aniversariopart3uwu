'use client';

import React, { useState } from 'react';

const timelineEvents = [
  {
    date: '14 Feb 2024',
    title: 'Nuestro inicio',
    description: 'El día en que nuestras miradas se encontraron...',
    icon: '💘'
  },
  {
    date: 'Marzo 2024',
    title: 'Primera cita',
    description: 'Descubriendo que éramos compatibles en todo.',
    icon: '☕'
  },
  {
    date: 'Junio 2024',
    title: 'Primer viaje',
    description: 'Explorando el mundo juntos, creando recuerdos.',
    icon: '✈️'
  },
  {
    date: 'Octubre 2024',
    title: 'Nuestro ritual',
    description: 'Estableciendo nuestras tradiciones únicas.',
    icon: '🕯️'
  },
  {
    date: '14 Feb 2025',
    title: 'Un año juntos',
    description: 'Celebrando nuestro primer aniversario con amor.',
    icon: '🎉'
  },
  {
    date: 'Hoy',
    title: 'Amor eterno',
    description: 'Cada día te amo más que el anterior.',
    icon: '♾️'
  }
];

export default function Timeline() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Botón para abrir timeline */}
       <button
         onClick={() => setIsOpen(true)}
         className="fixed left-6 top-1/2 -translate-y-1/2 z-40 px-4 py-3 bg-rose/10 hover:bg-rose/20 border border-rose/30 hover:border-rose/50 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-auto group hover:scale-105"
         style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
       >
         <span className="text-rose/60 group-hover:text-rose text-xs tracking-[0.3em] uppercase font-light">
           Nuestra Historia ✨
         </span>
       </button>

      {/* Modal de timeline */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(5, 9, 21, 0.9)', backdropFilter: 'blur(15px)' }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-b from-[#1a0b2e] to-[#0a0519] border border-rose/20 rounded-2xl p-8 shadow-2xl"
            style={{ boxShadow: '0 0 100px rgba(247, 37, 133, 0.1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-rose/40 hover:text-rose/80 transition-colors text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="font-cinzel text-3xl text-rose/80 tracking-wider mb-2">
                Nuestra Historia
              </h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose/50 to-transparent mx-auto"></div>
            </div>

            <div className="relative">
              {/* Línea vertical del timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose/50 via-lilac/30 to-rose/50"></div>

              {timelineEvents.map((event, index) => (
                <div 
                  key={index}
                  className={`relative pl-16 pb-8 transition-all duration-500 ${hoveredIndex === index ? 'scale-102' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Punto en la línea de tiempo */}
                  <div 
                    className={`absolute left-4 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      hoveredIndex === index 
                        ? 'border-rose bg-rose/30 scale-125' 
                        : 'border-rose/50 bg-[#0a0519]'
                    }`}
                    style={{ top: '1.25rem' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-sm">
                      {event.icon}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div 
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      hoveredIndex === index 
                        ? 'bg-rose/5 border-rose/20' 
                        : 'bg-transparent'
                    } border border-transparent`}
                  >
                    <div className="text-rose/40 text-xs tracking-wider mb-1">{event.date}</div>
                    <h3 className="font-cinzel text-lg text-rose/70 mb-2">{event.title}</h3>
                    <p className="text-moon/60 font-serif text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 pt-6 border-t border-rose/10">
              <p className="text-rose/40 font-cinzel text-sm tracking-wider italic">
                "Y así, seguimos escribiendo nuestra historia..."
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
