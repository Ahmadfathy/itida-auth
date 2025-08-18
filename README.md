# ITIDA Authentication Landing Page

A modern, responsive landing page for the Information Technology Industry Development Agency (ITIDA) built with React, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Bilingual Support**: English (LTR) and Arabic (RTL) language support
- 🔐 **Login Form**: Modern authentication form with 3 user role types
- 📱 **Responsive Design**: Mobile-first approach with modern UI/UX
- 🎨 **Modern Design**: Clean, professional design with animations and gradients
- ⚡ **Fast Performance**: Built with Vite for optimal development experience
- 🎯 **Accessibility**: WCAG compliant with proper semantic HTML

## User Roles

The login form includes three distinct user types:

1. **Individual** 👤 - For personal users and freelancers
2. **Company** 🏢 - For business entities and corporations  
3. **Government** 🏛️ - For government agencies and institutions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Language Support**: Context API for internationalization
- **Animations**: CSS animations and Tailwind utilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd itida-auth
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── LoginForm.tsx   # Authentication form
│   ├── Features.tsx    # Features section
│   └── Footer.tsx      # Footer component
├── contexts/            # React contexts
│   └── LanguageContext.tsx  # Language management
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Language Support

The application supports two languages:

- **English (LTR)**: Default language with left-to-right text direction
- **Arabic (RTL)**: Right-to-left text direction with proper font support

### Switching Languages

Click the language toggle button in the header to switch between English and Arabic. The entire interface will automatically adjust for RTL layout and display appropriate translations.

## Customization

### Colors

Custom colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'itida-blue': '#1e40af',
  'itida-dark': '#0f172a',
  'itida-light': '#3b82f6',
}
```

### Animations

Custom animations are available:

- `animate-glow`: Pulsing glow effect
- `animate-float`: Floating animation for elements

### Adding New Languages

To add a new language:

1. Add the language code to the `Language` type in `LanguageContext.tsx`
2. Add translations to the `translations` object
3. Update the language toggle logic in `App.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the ITIDA development team.

---

**Built with ❤️ for ITIDA - Empowering Egypt's Digital Future** 
