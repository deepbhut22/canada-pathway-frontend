import { Calendar, ExternalLink } from 'lucide-react';
import { NewsItem } from '../../types';
import { formatDate } from '../../utils/helpers';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardImage } from '../ui/Card';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const { title, summary, date, imageUrl, source, category, province } = news;

  return (
    <Card interactive className="h-full flex flex-col">
      <CardImage src={imageUrl} alt={title} />
      
      <CardHeader>
        <div className="flex items-center mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            category === 'general' 
              ? 'bg-primary-100 text-primary-800' 
              : 'bg-accent-100 text-accent-800'
          }`}>
            {category}
          </span>
          <div className="flex items-center text-xs text-secondary-500 ml-auto">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(date)}
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-secondary-600 text-sm">{summary}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center bg-secondary-50">
        <span className="text-xs text-secondary-500">Source: {source}</span>
        <a href={news.content} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-secondary-800 hover:text-secondary-950 hover:underline">
          Read more
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
}