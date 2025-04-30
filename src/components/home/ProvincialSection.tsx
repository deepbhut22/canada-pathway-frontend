import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsItem } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import {HorizontalSlider} from '../ui/HorizontalSlider';
import { ProvinceLinksDialog } from '../ProvinceLinksDialogs';
import { provinceLink } from '../../utils/dummyData';

interface ProvincialSectionProps {
  provincialNews: NewsItem[];
}

export default function ProvincialSection({ provincialNews }: ProvincialSectionProps) {
  const provinces = [
    { code: 'ON', name: 'Ontario', flag: '🇨🇦' },
    { code: 'BC', name: 'British Columbia', flag: '🇨🇦' },
    { code: 'AB', name: 'Alberta', flag: '🇨🇦' },
    { code: 'QC', name: 'Quebec', flag: '🇨🇦' },
    { code: 'NS', name: 'Nova Scotia', flag: '🇨🇦' },
    { code: 'MB', name: 'Manitoba', flag: '🇨🇦' },
    { code: 'SK', name: 'Saskatchewan', flag: '🇨🇦' },
    { code: 'NB', name: 'New Brunswick', flag: '🇨🇦' },
    { code: 'NL', name: 'Newfoundland and Labrador', flag: '🇨🇦' },
    { code: 'PE', name: 'Prince Edward Island', flag: '🇨🇦' }
  ];

  interface ProvinceLinksOption {
    title: String;
    link: String;
  }

  const [showLinksDialog, setShowLinksDialog] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [options, setOptions] = useState<ProvinceLinksOption[]>([]);

  return (
    <section className="py-12 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">Provincial Immigration Programs</h2>
          <p className="mt-4 text-lg text-secondary-600 max-w-3xl mx-auto">
            Explore immigration opportunities specific to each province and territory
          </p>
        </div>

        <HorizontalSlider
          items={provinces}
          itemsPerSlide={4}
          renderItem={(province: any) => (
            <Card key={province.code} className="text-center hover:shadow-md transition-shadow mx-2 my-1" 
              onClick={() => {
                setSelectedProvince(province.code);
                setShowLinksDialog(true);
                console.log(provinceLink[province.code as keyof typeof provinceLink]);
                setOptions(provinceLink[province.code as keyof typeof provinceLink]);
              }}
              interactive
            >

              <CardContent className="py-6">
                <span className="text-2xl block mb-2">{province.flag}</span>
                <h3 className="font-medium text-secondary-900">{province.name}</h3>
                <p className="text-xs text-secondary-500 mt-1">PNP Program</p>
              </CardContent>
            </Card>
          )}
        />

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {provinces.map((province) => (
            <Card key={province.code} className="text-center hover:shadow-md transition-shadow" interactive>
              <CardContent className="py-6">
                <span className="text-2xl block mb-2">{province.flag}</span>
                <h3 className="font-medium text-secondary-900">{province.name}</h3>
                <p className="text-xs text-secondary-500 mt-1">PNP Program</p>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-secondary-900 mb-6">Latest Provincial Updates</h3>
          
          <HorizontalSlider
            items={provincialNews}
            itemsPerSlide={2}
            renderItem={(news: any) => (
              <Card key={news.id} className="flex overflow-hidden mx-2 my-1 min-h-56 max-h-56" interactive>
                <div
                  className="hidden sm:block w-1/3 bg-cover bg-center"
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
                    <CardTitle className="text-lg w-full h-max">{news.title}</CardTitle>
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