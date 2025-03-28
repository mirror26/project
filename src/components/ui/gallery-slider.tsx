import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySliderProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function GallerySlider({ images, initialIndex = 0, onClose }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Обробка клавіш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-[#1b4d46] bg-opacity-95 flex items-center justify-center z-50">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl z-50 hover:opacity-75"
        >
          ×
        </button>

        {/* Головний слайд */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Слайд ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[80vw] object-contain"
          />
        </div>

        {/* Навігаційні кнопки */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 text-white p-2 rounded-full hover:bg-white/10"
              aria-label="Попереднє зображення"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 text-white p-2 rounded-full hover:bg-white/10"
              aria-label="Наступне зображення"
            >
              <ChevronRight size={40} />
            </button>

            {/* Індикатори */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Перейти до слайду ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 