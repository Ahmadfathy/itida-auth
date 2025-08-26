# ITIDA UDB Web App

Production-grade bilingual web app for company registration, login, CRM profile management via Dynamics 365 (on-prem), and dashboard.

## Quick Start (Local Dev)

1) Start SQL Server and API (Docker):

```bash
docker compose up --build -d
```

2) Frontend dev server:

```bash
cd webapp
cp .env.example .env
npm install
npm run dev
```

API: http://localhost:8080
Web: http://localhost:5173

## User Roles

The login form includes three distinct user types:

1. **Individual** 👤 - For personal users and freelancers
2. **Company** 🏢 - For business entities and corporations  
3. **Government** 🏛️ - For government agencies and institutions

## Tech Stack

- Backend: .NET 8, ASP.NET Core (BFF), Identity, EF Core SQL Server, Serilog, FluentValidation
- Frontend: React (Vite + TS), i18next, React Router, TailwindCSS

## Environment Variables

See `src/Api/.env.example` and `webapp/.env.example`.

## Project Structure

```
/src
  /Api
  /Application
  /Domain
  /Infrastructure
  /Localization
/webapp
  /src
    /i18n
```

## CI/CD

Add GitHub Actions to build, test, and dockerize on PRs.

## Language Support

This app supports English (en-US) and Arabic (ar-EG) with dynamic LTR/RTL switching.

## Customization

Adjust Tailwind and i18n locales as needed.

### Adding New Languages

Add a new namespace JSON to `webapp/src/i18n` and include the culture code.

## Browser Support

Modern evergreen browsers.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Internal use.

## Contact

For questions or support, please contact the ITIDA development team.

---

**Built with ❤️ for ITIDA - Empowering Egypt's Digital Future** 
