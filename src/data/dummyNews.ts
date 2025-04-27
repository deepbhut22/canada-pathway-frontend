import { NewsItem } from '../types';

export const dummyNews: NewsItem[] = [
  {
    id: '1',
    title: 'Canada Introduces New Express Entry Draw System',
    summary: 'IRCC has announced changes to the Express Entry draw system, now featuring category-based selections.',
    content: 'Immigration, Refugees and Citizenship Canada (IRCC) has introduced a new approach to Express Entry draws. The updated system now includes category-based selections that target candidates with specific skills, work experience, or language abilities that align with Canada\'s economic priorities. This change aims to better address labor market needs and support economic recovery.',
    date: '2025-04-25',
    imageUrl: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'IRCC Official Press Release',
    category: 'general',
  },
  {
    id: '2',
    title: 'CRS Score Threshold Drops in Latest Express Entry Draw',
    summary: 'The minimum CRS score requirement has dropped to 475 points in the most recent Express Entry draw.',
    content: 'In the latest Express Entry draw conducted on April 20, 2025, the minimum Comprehensive Ranking System (CRS) score requirement dropped to 475 points, down from 503 in the previous draw. IRCC issued 3,500 Invitations to Apply (ITAs) to candidates in the Federal Skilled Worker Program, Canadian Experience Class, and Federal Skilled Trades Program. This drop in the CRS threshold may indicate a trend toward more inclusive selection criteria.',
    date: '2025-04-22',
    imageUrl: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'IRCC Draw Results',
    category: 'general',
  },
  {
    id: '3',
    title: 'New Pathway for International Students Announced',
    summary: 'Canada unveils new permanent residency pathway for international graduates from Canadian institutions.',
    content: 'The Canadian government has announced a new permanent residency pathway specifically designed for international students who have graduated from Canadian educational institutions. This initiative aims to retain skilled talent and address workforce shortages across various sectors. Eligible candidates must have completed a qualifying program and demonstrate specified language proficiency levels.',
    date: '2025-04-18',
    imageUrl: 'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'Immigration Canada',
    category: 'general',
  },
  {
    id: '4',
    title: 'Ontario PNP Targets Tech Workers',
    summary: 'Ontario\'s Provincial Nominee Program announces tech-focused stream with lower CRS requirements.',
    content: 'The Ontario Immigrant Nominee Program (OINP) has launched a specialized stream targeting technology workers. This initiative comes with lower Comprehensive Ranking System (CRS) score requirements for eligible candidates. The program aims to attract skilled professionals in high-demand tech occupations to address the province\'s growing need for qualified personnel in the technology sector.',
    date: '2025-04-16',
    imageUrl: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'Ontario Provincial Government',
    category: 'provincial',
    province: 'Ontario',
  },
  {
    id: '5',
    title: 'British Columbia Expands Entrepreneur Immigration Program',
    summary: 'BC introduces new pathways for entrepreneurs looking to establish businesses in the province.',
    content: 'British Columbia has expanded its Entrepreneur Immigration Program, offering new pathways for business owners and managers seeking to establish enterprises in the province. The expanded program includes targeted tracks for rural businesses, tech startups, and strategic sectors identified as crucial for regional economic development. Successful applicants can obtain provincial nomination leading to permanent residency.',
    date: '2025-04-15',
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'BC Provincial Nominee Program',
    category: 'provincial',
    province: 'British Columbia',
  },
  {
    id: '6',
    title: 'Alberta Advantage Immigration Program Quarterly Results',
    summary: 'Alberta releases latest selection results from its provincial nominee streams.',
    content: 'The Alberta Advantage Immigration Program has published its quarterly selection results, revealing the number of candidates invited through various provincial streams. The report indicates increased nomination allocations for skilled workers in healthcare, agriculture, and energy sectors. The province also introduced expedited processing for candidates willing to work in designated rural communities facing critical workforce shortages.',
    date: '2025-04-12',
    imageUrl: 'https://images.pexels.com/photos/3876634/pexels-photo-3876634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'Alberta Provincial Government',
    category: 'provincial',
    province: 'Alberta',
  },
  {
    id: '7',
    title: 'Canada Increases Immigration Targets for 2026-2028',
    summary: 'Federal government announces higher immigration levels plan for the next three years.',
    content: 'Canada has announced an ambitious increase in its immigration targets for the 2026-2028 period. The new Immigration Levels Plan aims to welcome approximately 500,000 new permanent residents annually by 2028, representing a significant increase from current levels. The expanded targets prioritize economic immigration programs while maintaining commitments to family reunification and humanitarian initiatives.',
    date: '2025-04-10',
    imageUrl: 'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'Department of Immigration',
    category: 'general',
  },
  {
    id: '8',
    title: 'Changes to Family Sponsorship Income Requirements',
    summary: 'IRCC updates minimum necessary income levels for family sponsorship applications.',
    content: 'Immigration, Refugees and Citizenship Canada has updated the minimum necessary income (MNI) requirements for family sponsorship applications. The revised income thresholds reflect changes to the low-income cut-offs (LICOs) as determined by Statistics Canada. Sponsors must demonstrate income levels at or above these thresholds for the three consecutive taxation years immediately preceding their sponsorship application.',
    date: '2025-04-08',
    imageUrl: 'https://images.pexels.com/photos/7048043/pexels-photo-7048043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    source: 'IRCC Updates',
    category: 'general',
  }
];

// Provincial News Filter Function
export const getProvincialNews = () => {
  return dummyNews.filter(news => news.category === 'provincial');
};

// General News Filter Function
export const getGeneralNews = () => {
  return dummyNews.filter(news => news.category === 'general');
};