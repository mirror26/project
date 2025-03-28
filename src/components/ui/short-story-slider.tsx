import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShortStorySliderProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export function ShortStorySlider({ images, onImageClick }: ShortStorySliderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = images.length > 1 ? 3 : 1;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Автоматична прокрутка тільки якщо більше 3 зображень
  useEffect(() => {
    if (images.length <= 3) return;

    const timer = setInterval(nextPage, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const currentImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <div className="relative w-full bg-[#1b4d46] aspect-[16/9] mb-12">
      {/* Навігаційні кнопки */}
      {images.length > imagesPerPage && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
            aria-label="Попередні зображення"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
            aria-label="Наступні зображення"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Слайдер */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 flex items-center justify-center ${
              images.length > 1 ? 'gap-4 px-4' : ''
            }`}
          >
            {currentImages.map((image, index) => (
              <div
                key={`${currentPage}-${index}`}
                className={`relative ${
                  images.length > 1 
                    ? 'flex-1 aspect-[16/9]' 
                    : 'w-full h-full'
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => onImageClick(currentPage * imagesPerPage + index)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Індикатори */}
      {totalPages > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage 
                  ? 'bg-[#e6b89c]' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Перейти до сторінки ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 