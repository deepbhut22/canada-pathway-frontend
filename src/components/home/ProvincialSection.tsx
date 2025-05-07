import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsItem } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardImage } from '../ui/Card';
import {HorizontalSlider} from '../ui/HorizontalSlider';
import { ProvinceLinksDialog } from '../ProvinceLinksDialogs';
import { provinceLink } from '../../utils/dummyData';

interface ProvincialSectionProps {
  provincialNews: NewsItem[];
}

export default function ProvincialSection({ provincialNews }: ProvincialSectionProps) {
  const provinces = [
    { code: 'ON', name: 'Ontario', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Ontario.svg/500px-Flag_of_Ontario.svg.png' },
    { code: 'BC', name: 'British Columbia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_British_Columbia.svg/500px-Flag_of_British_Columbia.svg.png' },
    { code: 'AB', name: 'Alberta', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Alberta.svg/500px-Flag_of_Alberta.svg.png' },
    { code: 'QC', name: 'Quebec', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/500px-Flag_of_Quebec.svg.png' },
    { code: 'NS', name: 'Nova Scotia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Nova_Scotia.svg/500px-Flag_of_Nova_Scotia.svg.png' },
    { code: 'MB', name: 'Manitoba', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Manitoba.svg/500px-Flag_of_Manitoba.svg.png' },
    { code: 'SK', name: 'Saskatchewan', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_Saskatchewan.svg/500px-Flag_of_Saskatchewan.svg.png' },
    { code: 'NB', name: 'New Brunswick', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_New_Brunswick.svg/500px-Flag_of_New_Brunswick.svg.png' },
    { code: 'NL', name: 'Newfoundland and Labrador', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Newfoundland_and_Labrador.svg/500px-Flag_of_Newfoundland_and_Labrador.svg.png' },
    { code: 'PE', name: 'Prince Edward Island', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Flag_of_Prince_Edward_Island.svg/500px-Flag_of_Prince_Edward_Island.svg.png' }
  ];

  interface ProvinceLinksOption {
    title: String;
    link: String;
  }

  const [showLinksDialog, setShowLinksDialog] = useState<boolean>(false);
  const [options, setOptions] = useState<ProvinceLinksOption[]>([]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">Provincial Immigration Programs</h2>
          <p className="mt-4 text-lg text-secondary-600 max-w-3xl mx-auto">
            Explore immigration opportunities specific to each province and territory
          </p>
        </div>

        <HorizontalSlider
          className="hidden sm:block"
          items={provinces}
          itemsPerSlide={4}
          renderItem={(province: any) => (
            <Card key={province.code} className="flex flex-col justify-between items-center text-center hover:shadow-md transition-shadow mx-2 my-1 max-h-48 min-h-48" 
              onClick={() => {
                setShowLinksDialog(true);
                // console.log(provinceLink[province.code as keyof typeof provinceLink]);
                setOptions(provinceLink[province.code as keyof typeof provinceLink]);
              }}
              interactive
            >
              <img src={province.flag} alt={province.name} className="w-full min-h-24 max-h-24  object-cover mt-2 rounded-t-md transition-transform duration-300 hover:scale-105" />
              <CardContent className="py-6 flex flex-col items-center"> 
                <h2 className="text-sm mt-2 sm:text-bold sm:text-lg text-secondary-900">{province.name}</h2>
                <p className="text-xs text-secondary-500 mt-1">PNP Program</p>
              </CardContent>
            </Card>
          )}
        />
        {/* Mobile */}
        <HorizontalSlider
          className="block sm:hidden"
          items={provinces}
          itemsPerSlide={2}
          renderItem={(province: any) => (
            <Card key={province.code} className="flex flex-col justify-between items-center text-center hover:shadow-md transition-shadow mx-2 my-1 max-h-40 min-h-40"
              onClick={() => {
                setShowLinksDialog(true);
                setOptions(provinceLink[province.code as keyof typeof provinceLink]);
              }}
              interactive
            >
              <img src={province.flag} alt={province.name} className="w-full h-24 min-h-16 max-h-16  object-cover mt-2 rounded-t-md transition-transform duration-300 hover:scale-105" />
              <CardContent className="py-6 flex flex-col items-center">
                <h2 className="text-sm mt-2 sm:text-bold sm:text-lg text-secondary-900 text-wrap">{province.name}</h2>
                <p className="text-xs text-secondary-500 mt-1">PNP Program</p>
              </CardContent>
            </Card>
          )}
        />

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-secondary-900 mb-6">Latest Provincial Updates</h3>
          
          <HorizontalSlider
            className="hidden sm:block"
            items={provincialNews}
            itemsPerSlide={2}
            renderItem={(news: any) => (
              <Card key={news.id} className="flex overflow-hidden mx-2 my-1 min-h-56 max-h-56" interactive>
                <div
                  className="hidden sm:block w-1/3 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${news.imageUrl})` }}
                ></div>
                <div className="w-full sm:w-2/3 flex flex-col justify-between">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-100 text-accent-800">
                        {news.province}
                      </span>
                      <span className="text-xs text-secondary-500">{news.date}</span>
                    </div>
                    <CardTitle className="text-lg w-full h-max">{news.title.length > 70 ? news.title.substring(0, 70) + '...' : news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-secondary-600 line-clamp-2">{news.summary.length > 100 ? news.summary.substring(0, 100) + '...' : news.summary}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <a
                      href={news.content}
                      target='_blank'
                      className="text-sm font-medium text-secondary-700 hover:underline flex items-center">
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </CardFooter>
                </div>
              </Card>
            )}
          />

          {/* Mobile */}

          <HorizontalSlider
            className="block sm:hidden"
            items={provincialNews}
            itemsPerSlide={1}
            renderItem={(news: any) => (
              <Card key={news.id} className="flex flex-col justify-around rounded-md overflow-hidden mx-2 my-1 min-h-96 max-h-96" interactive>
                <div
                  className="w-full min-h-36 max-h-36 bg-cover bg-center rounded-t-md transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${news.imageUrl})` }}
                ></div>
                <div className="w-full sm:w-2/3 flex flex-col justify-between">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-100 text-accent-800">
                        {news.province}
                      </span>
                      <span className="text-xs text-secondary-500">{news.date}</span>
                    </div>
                    <CardTitle className="text-lg w-full h-min">{news.title.length > 70 ? news.title.substring(0, 70) + '...' : news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-secondary-600 line-clamp-2">{news.summary.length > 100 ? news.summary.substring(0, 100) + '...' : news.summary}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <a 
                      href={news.content}
                      target='_blank'
                      className="text-sm font-medium text-secondary-700 hover:underline flex items-center">
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </CardFooter>
                </div>
              </Card>
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* {provincialNews.map((news) => (
              <Card key={news.id} className="flex overflow-hidden" interactive>
                <div 
                  className="hidden sm:block w-1/3 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${news.imageUrl})` }}
                ></div>
                <div className="w-full sm:w-2/3 flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-100 text-accent-800">
                        {news.province}
                      </span>
                      <span className="text-xs text-secondary-500">{news.date}</span>
                    </div>
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-secondary-600 line-clamp-2">{news.summary}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </CardFooter>
                </div>
              </Card>
            ))} */}
          </div>
        </div>
      </div>
      <ProvinceLinksDialog
        isOpen={showLinksDialog}
        onClose={() => setShowLinksDialog(false)}
        options={options || []}
        onOptionSelect={() => {}}
      />
    </section>
  );
}