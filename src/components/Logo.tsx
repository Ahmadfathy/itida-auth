import React from 'react'

interface LogoProps {
  variant?: 'default' | 'white'
  onClick?: () => void
  className?: string
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', onClick, className = '' }) => {
  const isWhite = variant === 'white'
  
  return (
    <div 
      className={`flex items-center space-x-3 rtl:space-x-reverse ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-300' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Logo Icon */}
      <div className="relative">
          <div className="h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="/images/itida-logo.png" 
              alt="ITIDA Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'text-itida-blue font-bold text-xl';
                fallback.textContent = 'I';
                target.parentNode?.appendChild(fallback);
              }}
            />
        </div>
        {/* Subtle glow effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-green-400 to-blue-500 rounded-xl opacity-20 blur-sm"></div> */}
      </div>
      
      {/* Agency Text Only */}
      {/* <div className="text-left rtl:text-right">
        <p className={`hidden md:block text-xs font-medium tracking-wide ${isWhite ? 'text-gray-300' : 'text-gray-600'}`}>
          IT INDUSTRY DEVELOPMENT AGENCY
        </p>
      </div> */}
    </div>
  )
}

export default Logo
