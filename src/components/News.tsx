import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { ArrowUp } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FullNews } from './full-news';

export interface NewsItem {
  id: number;
  title: string;
  short_story: string;
  full_story: string;
  date: string;
  keywords: string;
  alt_name: string;
  descr: string;
}

// Функція для конвертації HTML-сутностей в емодзі
const convertHtmlEntities = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Функція для обробки HTML-тегів
const processHtml = (html: string) => {
  let processed = html.replace(/<br\s*\/?>/gi, '\n');
  processed = processed.replace(
    /<img[^>]+src="([^">]+)"[^>]*>/gi,
    (_match, src) => `<img src="${src}" class="w-full h-48 object-cover mb-4" />`
  );
  processed = convertHtmlEntities(processed);
  return processed;
};

export function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://mirrortesting.pp.ua/api/news.php', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit'
        });
        
        if (!response.ok) {
          throw new Error(`Помилка завантаження новин: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        
        setNews(data);
      } catch (err) {
        console.error('Помилка:', err);
        setError(err instanceof Error ? err.message : 'Сталася помилка при завантаженні новин');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Відслідковування прокрутки для кнопки "вгору"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-8">Завантаження новин...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const currentNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Функція для створення масиву номерів сторінок з трьома крапками
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const delta = 1; // Кількість сторінок з кожного боку від поточної
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Новини</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentNews.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow h-fit">
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-4">
                  {convertHtmlEntities(item.title)}
                </h3>
                <div 
                  className="text-gray-600 mb-6 line-clamp-5 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: processHtml(item.short_story) }}
                />
                <div className="flex justify-between items-center">
                  <time className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('uk-UA')}
                  </time>
                  <button 
                    onClick={() => setSelectedNews(item)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Читати далі
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Пагінація */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            aria-label="Попередня сторінка"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {getPageNumbers(currentPage, totalPages).map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
              className={`w-10 h-10 flex items-center justify-center rounded ${
                currentPage === page
                  ? 'bg-teal-700 text-white'
                  : typeof page === 'number'
                  ? 'border border-gray-300 hover:bg-gray-100'
                  : 'border-none'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            aria-label="Наступна сторінка"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Кнопка "вгору" */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Прокрутити вгору"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Повноекранна новина */}
      {selectedNews && (
        <FullNews
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </section>
  );
} 