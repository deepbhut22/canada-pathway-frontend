import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      content: "CanadaPath made my immigration journey so much easier! Their pathway recommendation was spot on, and I successfully got my PR through the Express Entry program.",
      author: "Maria Rodriguez",
      origin: "Mexico",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 2,
      content: "I was overwhelmed by all the different immigration options until I found CanadaPath. Their assessment tool identified the Alberta PNP as my best option, which I wouldn't have considered otherwise.",
      author: "Raj Patel",
      origin: "India",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 3,
      content: "The detailed profile assessment saved me time and money. Instead of applying for programs where I had little chance, CanadaPath directed me to the Atlantic Immigration Program where I qualified easily.",
      author: "Sarah Kim",
      origin: "South Korea",
      rating: 4,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">Success Stories</h2>
          <p className="mt-4 text-lg text-secondary-600 max-w-3xl mx-auto">
            Hear from immigrants who found their path to Canada with our guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              <div className="absolute -top-5 left-6">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex items-center mt-4 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-secondary-300'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-secondary-700 mb-4 italic">"{testimonial.content}"</p>
              
              <div className="border-t border-secondary-200 pt-3 mt-3">
                <div className="font-medium text-secondary-900">{testimonial.author}</div>
                <div className="text-sm text-secondary-500">From {testimonial.origin}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}