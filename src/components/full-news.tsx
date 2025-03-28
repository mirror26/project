import { NewsItem } from './News';
import { GallerySlider } from './ui/gallery-slider';
import { ShortStorySlider } from './ui/short-story-slider';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FullNewsProps {
  news: NewsItem;
  onClose: () => void;
}

export function FullNews({ news, onClose }: FullNewsProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [processedContent, setProcessedContent] = useState('');
  const [processedShortStory, setProcessedShortStory] = useState('');
  const [processedDescr, setProcessedDescr] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [shortStoryImages, setShortStoryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Функція для конвертації HTML-сутностей в емодзі
  const convertHtmlEntities = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  useEffect(() => {
    // Витягуємо URL зображень з HTML
    const extractImages = (html: string): string[] => {
      const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/gi;
      const extractedImages: string[] = [];
      let match;
      
      while ((match = imgRegex.exec(html)) !== null) {
        extractedImages.push(match[1]);
      }
      
      return extractedImages;
    };

    // Обробляємо контент
    const processContent = (html: string) => {
      // Спочатку конвертуємо HTML-сутності
      let processed = convertHtmlEntities(html);

      // Замінюємо <br> на новий рядок
      processed = processed.replace(/<br\s*\/?>/gi, '\n');

      // Замінюємо img теги на версію з класами та обробниками подій
      let imageIndex = 0;
      processed = processed.replace(
        /<img[^>]+src="([^">]+)"[^>]*>/gi,
        (_match, src) => {
          const currentIndex = imageIndex++;
          return `<img src="${src}" class="w-full max-h-[500px] object-cover rounded-lg mb-6 cursor-pointer" onclick="window.openGallery(${currentIndex})" />`;
        }
      );

      return processed;
    };

    // Додаємо функцію відкриття галереї в window
    const openGallery = (index: number) => {
      setCurrentImageIndex(index);
      setShowGallery(true);
    };
    window.openGallery = openGallery;

    // Витягуємо зображення з різних частин контенту
    const fullStoryImages = extractImages(news.full_story);
    const shortStoryImgs = extractImages(news.short_story);
    
    setImages(fullStoryImages);
    setShortStoryImages(shortStoryImgs);

    // Обробляємо контент без зображень для short_story
    const processedShortStoryText = news.short_story.replace(/<img[^>]+>/g, '');
    
    setProcessedContent(processContent(news.full_story));
    setProcessedShortStory(processContent(processedShortStoryText));
    setProcessedDescr(processContent(news.descr || ''));

    // Прибираємо функцію при розмонтуванні
    return () => {
      window.openGallery = undefined;
    };
  }, [news.full_story, news.short_story, news.descr]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto scrollbar-hide">
      <div className="w-full min-h-full">
        <div className="container mx-auto px-4 py-8">
          {/* Кнопка закриття */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            aria-label="Закрити"
          >
            <X size={24} />
          </button>

          <div>
            <div>
              {/* Заголовок */}
              <h1 className="text-3xl font-bold mb-6">{convertHtmlEntities(news.title)}</h1>

              {/* Дата */}
              <time className="text-gray-500 mb-4 block">
                {new Date(news.date).toLocaleDateString('uk-UA')}
              </time>

              {/* Короткий опис */}
              {processedShortStory && (
                <div 
                  className="text-lg text-gray-700 mb-6 font-medium"
                  dangerouslySetInnerHTML={{ __html: processedShortStory }}
                />
              )}

              {/* Опис */}
              {processedDescr && (
                <div 
                  className="text-gray-600 mb-8 italic"
                  dangerouslySetInnerHTML={{ __html: processedDescr }}
                />
              )}
            </div>

            {/* Контент новини */}
            <article
              className="prose prose-lg max-w-none prose-img:rounded-lg prose-headings:text-gray-900 prose-p:text-gray-700 mb-12"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Слайдер зображень */}
            {(shortStoryImages.length > 0 || images.length > 0) && (
              <div>
                <ShortStorySlider
                  images={[...shortStoryImages, ...images]}
                  onImageClick={(index) => {
                    setCurrentImageIndex(index);
                    setShowGallery(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Галерея в порталі */}
      {showGallery && createPortal(
        <GallerySlider
          images={[...shortStoryImages, ...images]}
          initialIndex={currentImageIndex}
          onClose={() => setShowGallery(false)}
        />,
        document.body
      )}
    </div>
  );
}

// Додаємо типи для window
declare global {
  interface Window {
    openGallery?: (index: number) => void;
  }
} 