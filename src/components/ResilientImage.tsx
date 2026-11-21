import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#EFECE6] border border-stone-200 p-8 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 text-[#1E3A5F] mb-3" aria-hidden="true" />
        <p className="font-serif text-lg font-medium text-stone-900">{fallbackTitle}</p>
        {fallbackSubtitle ? (
          <p className="text-xs text-stone-600 mt-1 max-w-xs">{fallbackSubtitle}</p>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
