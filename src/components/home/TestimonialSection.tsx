import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      content: "I was completely overwhelmed by conflicting IRCC guides, provincial websites, and forum advice—until PathPR’s all‑in‑one AI dashboard gave me instant clarity. It pinpointed Ontario’s tech‑stream for me,  and mapped out every next step.",
      author: "Raj",
      origin: "Toronto",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 2,
      content: "“The detailed profile assessment saved me time and money. Instead of applying for programs where I had little chance, PathPR.ca directed me straight to the Atlantic Immigration Pilot—where I qualified easily.”",
      author: "Raj",
      origin: "Toronto",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 3,
      content: "We were frustrated by conflicting IRCC info and didn’t know if our IT role qualified.PathPR instantly showed that updating to ‘Software Engineer(2173)’ made us STEM- eligible—exactly the clarity we’d been searching for.",
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
              className="flex flex-col bg-white rounded-lg shadow-md p-6 justify-between relative"
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