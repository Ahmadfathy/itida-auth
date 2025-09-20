import React from 'react'
import { useTranslation } from '../hooks/useTranslation'

interface LogoProps {
  variant?: 'default' | 'white'
  onClick?: () => void
  className?: string
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', onClick, className = '' }) => {
  const t = useTranslation()
  const isWhite = variant === 'white'
  
  return (
    <div 
      className={`flex items-center space-x-3 rtl:space-x-reverse ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-300' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Logo Icon */}
      <div className="relative">
          <div className={`h-14 ${isWhite ? 'bg-transparent' : 'bg-white'} rounded-lg flex items-center justify-center overflow-hidden`}>
            <img 
              src="/images/itida-logo.png" 
              alt={t.itidaLogoAlt} 
              className={`w-full h-full object-contain ${isWhite ? 'brightness-0 invert' : ''}`}
              onError={(e) => {
                // Fallback to text if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = `${isWhite ? 'text-white' : 'text-itida-blue'} font-bold text-xl`;
                fallback.textContent = 'ITIDA';
                target.parentNode?.appendChild(fallback);
              }}
            />
        </div>
      </div>
    </div>
  )
}

export default Logo
