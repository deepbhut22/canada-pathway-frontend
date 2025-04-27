import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsItem } from '../../types';
import { formatDate } from '../../utils/helpers';
import NewsCard from './NewsCard';

interface NewsSectionProps {
  title: string;
  subtitle?: string;
  news: NewsItem[];
  viewAllLink?: string;
}

export default function NewsSection({ title, subtitle, news, viewAllLink }: NewsSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">{title}</h2>
            {subtitle && <p className="mt-2 text-secondary-600">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
}