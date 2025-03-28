import { News } from './components/News';

const performances = [
  {
    date: "22",
    day: "SAT",
    shows: [
      { time: "11:00", title: "The Gold Duck / St Mary's Church, Warsaw Legends" },
    ]
  },
  {
    date: "23",
    day: "SUN",
    shows: [
      { time: "11:00", title: "Imagination" },
    ]
  },
  {
    date: "25",
    day: "TUE",
    shows: [
      { time: "09:30", title: "Imagination" },
    ]
  },
  {
    date: "26",
    day: "WED",
    shows: [
      { time: "09:30", title: "Imagination" }
    ]
  }
];

function App() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white px-8 py-6 flex justify-between items-center">
        <h1 className="text-[#0000FF] text-2xl font-bold tracking-wider leading-7">
          БАВКА<br />
        </h1>
        <a href="#" className="text-[#0000FF] text-lg font-bold uppercase tracking-wider hover:underline">
          MENU
        </a>
      </header>

      {/* Hero Section with Diagonal Layers */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-[#F5F5F5] diagonal-section"></div>
        <div className="absolute inset-0 bg-[#FF8B8B] diagonal-section-2"></div>
        <div className="absolute inset-0 bg-[#0000FF] diagonal-section-3"></div>

        {/* Floating Puppets */}
        <div className="relative h-full">
          {/* Drummer Character */}
          <div className="puppet absolute left-[5%] top-[40%]">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-400 rounded-t-full"></div>
              <div className="w-12 h-16 bg-red-500 mx-auto"></div>
              <div className="w-8 h-8 bg-[#FFD700] rounded-full absolute -right-4 bottom-2"></div>
            </div>
            <div className="w-[1px] h-40 bg-black mx-auto"></div>
          </div>

          {/* Pink Horse */}
          <div className="puppet absolute left-[15%] top-[30%]">
            <div className="relative">
              <div className="w-40 h-32">
                <div className="absolute w-32 h-32 bg-[#FF69B4]">
                  <div className="absolute top-0 left-0 w-full h-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-12 bg-[#FF69B4] origin-bottom"
                        style={{
                          transform: `rotate(${i * 45}deg)`,
                          left: '50%',
                          top: '-20px'
                        }}
                      ></div>
                    ))}
                  </div>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-black rounded-full"
                      style={{
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 80}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[1px] h-40 bg-black mx-auto"></div>
          </div>

          {/* Umbrella Character */}
          <div className="puppet absolute left-[35%] top-[35%]">
            <div className="relative">
              <div className="w-32 h-32">
                <div className="w-32 h-16 bg-[#000080] rounded-t-full"></div>
                <div className="w-12 h-20 bg-white mx-auto relative">
                  <div className="absolute w-4 h-4 bg-black rounded-full top-4 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-40 bg-black mx-auto"></div>
          </div>

          {/* Yellow Tall Character */}
          <div className="puppet absolute left-[50%] top-[25%]">
            <div className="relative">
              <div className="w-24 h-48 bg-[#FFD700]">
                <div className="absolute w-24 h-24 bg-black rounded-full top-0">
                  <div className="absolute w-20 h-20 bg-white rounded-full top-2 left-2">
                    <div className="absolute w-4 h-4 bg-black rounded-full top-4 left-4"></div>
                    <div className="absolute w-4 h-4 bg-black rounded-full top-4 right-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-40 bg-black mx-auto"></div>
          </div>

          {/* Red Triangle */}
          <div className="puppet absolute left-[70%] top-[35%]">
            <div className="relative">
              <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[80px] border-[#FF0000]">
                <div className="absolute w-8 h-2 bg-black -left-16 top-20"></div>
                <div className="absolute w-8 h-2 bg-black -right-16 top-20"></div>
                <div className="absolute w-4 h-4 bg-black rounded-full -left-2 top-10"></div>
              </div>
            </div>
            <div className="w-[1px] h-40 bg-black mx-auto"></div>
          </div>

          {/* Christmas Tree Character */}
          <div className="puppet absolute left-[85%] top-[30%]">
            <div className="relative">
              <div className="w-24 h-32">
                <div className="w-4 h-4 bg-[#228B22] mx-auto"></div>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[16px] border-[#FF0000] mx-auto"
                    style={{ marginTop: `-${i * 4}px` }}
                  ></div>
                ))}
                <div className="w-16 h-16 bg-[#228B22] mx-auto mt-2">
                  <div className="absolute w-8 h-8 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-2 bg-white absolute top-2 left-1"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-40 bg-black mx-auto"></div>
          </div>
        </div>

        {/* Repertoire Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#000080] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 mt-6">РЕПЕРТУАР</h2>
            <div className="flex justify-between items-start pb-6 overflow-x-auto">
              {performances.map((day) => (
                <div key={day.date} className="flex-none px-3 border-l border-white/20 min-w-[200px]">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold">{day.date}</span>
                    <span className="text-lg uppercase">{day.day}</span>
                  </div>
                  <div className="space-y-2">
                    {day.shows.map((show, showIndex) => (
                      <div key={showIndex} className="text-xs">
                        <div className="text-base">{show.time}</div>
                        <div className="font-light">{show.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets Box */}
        <div className="tickets-box fixed bottom-8 right-8 bg-yellow-400 text-black px-6 py-3 font-bold cursor-pointer hover:bg-yellow-300 transition-colors transform rotate-3">
          КВИТКИ
        </div>
      </div>

      {/* News Section */}
      <News />
    </div>
  );
}

export default App;