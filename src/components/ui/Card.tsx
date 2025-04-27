import React from 'react';
import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
}

export function Card({ className, children, interactive = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -5 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-lg bg-white shadow-card overflow-hidden',
        interactive && 'cursor-pointer hover:shadow-card-hover',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn('p-6 pb-2', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-semibold leading-7 text-secondary-900', className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm leading-6 text-secondary-600 mt-1', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn('px-6 py-4 bg-secondary-50 border-t border-secondary-200', className)}>
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div className={cn('w-full h-48 overflow-hidden', className)}>
      <img 
        src={src}   
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}