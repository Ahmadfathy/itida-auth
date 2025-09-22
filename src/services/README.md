# Fake API Service for Registration Form

This directory contains a comprehensive fake API service that provides mock data and endpoints for all registration form functionality. The service is designed to simulate a real backend API while providing realistic data and responses.

## Features

- ✅ **Complete TypeScript Support** - Full type definitions for all data structures
- ✅ **Realistic Mock Data** - Generated sample data for all form fields
- ✅ **Validation Endpoints** - Real-time validation for form fields
- ✅ **Lookup Services** - Dropdown data for countries, governorates, etc.
- ✅ **File Upload Simulation** - Mock file upload with validation
- ✅ **Form State Management** - Auto-save, draft loading, and form persistence
- ✅ **Error Handling** - Comprehensive error responses and validation
- ✅ **Network Simulation** - Realistic delays and loading states

## File Structure

```
src/services/
├── api.ts                 # Main API service with all endpoints
├── README.md             # This documentation file
└── types.ts              # TypeScript type definitions (if separated)

src/hooks/
├── useApi.ts             # React hooks for API integration
└── useTranslation.ts     # Translation hook (existing)

src/components/
├── ApiDemo.tsx           # Demo component showing API usage
└── registration/         # Existing registration components

src/pages/
├── RegistrationPage.tsx           # Original registration page
└── RegistrationPageWithApi.tsx    # Enhanced version with API integration
```

## API Endpoints

### Validation Endpoints

- `validateCompanyName(englishName, arabicName)` - Validates company names
- `validateNationalId(nationalId)` - Validates 14-digit national ID
- `validateEmail(email)` - Validates email format

### Lookup Endpoints

- `getGovernorates()` - Returns list of Egyptian governorates
- `getCountries()` - Returns list of countries
- `getLegalTypes()` - Returns company legal types
- `getCompanyClassifications()` - Returns business classifications
- `getKeyTechnologies()` - Returns technology options
- `getCertificates()` - Returns certification options
- `getMemberships()` - Returns professional memberships
- `getPartnerships()` - Returns partnership options
- `getAffiliations()` - Returns affiliation options
- `getNationalities()` - Returns nationality options

### Registration Endpoints

- `saveDraft(formData)` - Saves form data as draft
- `loadDraft(draftId)` - Loads saved draft
- `submitRegistration(formData)` - Submits complete registration
- `getRegistrationStatus(registrationId)` - Gets registration status
- `getRegistrationHistory()` - Gets user's registration history

### File Upload Endpoints

- `uploadFile(file, fieldName)` - Uploads and validates files

### Utility Endpoints

- `searchCompanies(query)` - Searches for companies
- `getFormSchema()` - Returns form validation schema
- `getRegistrationStats()` - Returns registration statistics

## Usage Examples

### Basic API Usage

```typescript
import { apiService } from '../services/api'

// Validate a company name
const result = await apiService.validateCompanyName('Tech Solutions', 'حلول التكنولوجيا')
if (result.success) {
  console.log('Valid:', result.data.isValid)
}

// Get governorates
const governorates = await apiService.getGovernorates()
if (governorates.success) {
  console.log('Governorates:', governorates.data)
}
```

### Using React Hooks

```typescript
import { useLookups, useValidation, useRegistration } from '../hooks/useApi'

function MyComponent() {
  const { governorates, countries } = useLookups()
  const { validateEmail } = useValidation()
  const { submitRegistration } = useRegistration()

  // Load data on component mount
  useEffect(() => {
    governorates.execute()
    countries.execute()
  }, [])

  // Validate email
  const handleEmailChange = (email) => {
    validateEmail.execute(email)
  }

  // Submit form
  const handleSubmit = async (formData) => {
    await submitRegistration.execute(formData)
  }

  return (
    <div>
      {governorates.loading && <p>Loading governorates...</p>}
      {governorates.data && (
        <select>
          {governorates.data.map(gov => (
            <option key={gov.value} value={gov.value}>
              {gov.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
```

### Using the Registration Form Hook

```typescript
import { useRegistrationForm } from '../hooks/useApi'

function RegistrationForm() {
  const {
    formData,
    isDirty,
    isSubmitting,
    errors,
    updateField,
    submitForm,
    saveDraftManually
  } = useRegistrationForm()

  const handleInputChange = (e) => {
    updateField(e.target.name, e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await submitForm()
      console.log('Registration submitted:', result)
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="ldv_englishname"
        value={formData.ldv_englishname || ''}
        onChange={handleInputChange}
        placeholder="Company Name (English)"
      />
      {errors.ldv_englishname && (
        <p className="error">{errors.ldv_englishname}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {isDirty && (
        <button type="button" onClick={saveDraftManually}>
          Save Draft
        </button>
      )}
    </form>
  )
}
```

## Data Types

### RegistrationFormData

The main form data interface includes all fields from the registration form:

```typescript
interface RegistrationFormData {
  // Company Legal Information
  ldv_englishname: string
  ldv_arabicname: string
  ldv_commercialdenomination: string
  ldv_legaltypecode: string
  emailaddress1: string
  // ... many more fields
}
```

### API Response

All API endpoints return a consistent response format:

```typescript
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}
```

## Mock Data

The service includes realistic mock data for all form fields:

- **Company Information**: Sample company names, legal types, classifications
- **Contact Details**: Realistic names, phone numbers, email addresses
- **Address Data**: Egyptian governorates, cities, districts
- **Financial Data**: Sample revenue, employee counts, export information
- **Technical Data**: Technology stacks, certifications, partnerships

## Error Handling

The service includes comprehensive error handling:

- **Validation Errors**: Field-specific validation messages
- **Network Errors**: Simulated network failures and timeouts
- **File Upload Errors**: Size and type validation
- **Business Logic Errors**: Registration status and requirements

## Customization

### Adding New Endpoints

```typescript
// In api.ts
async newEndpoint(param: string): Promise<ApiResponse<NewDataType>> {
  await this.delayResponse(null)

  // Your logic here
  return {
    success: true,
    data: mockData,
    message: 'Success message'
  }
}
```

### Modifying Mock Data

```typescript
// Update the mock data generators
const generateMockCompanyHead = (): CompanyHead => ({
  name: 'Your Custom Name',
  position: 'Custom Position',
  // ... other fields
})
```

### Changing Response Delays

```typescript
// In the FakeApiService class
private delay = 2000 // Change from 1000ms to 2000ms
```

## Integration with Existing Components

The fake API service is designed to work seamlessly with existing registration components. Simply replace the original `RegistrationPage` with `RegistrationPageWithApi` to get all the API functionality.

### Migration Steps

1. Import the new page component:
   ```typescript
   import RegistrationPageWithApi from './pages/RegistrationPageWithApi'
   ```

2. Replace the old component:
   ```typescript
   <RegistrationPageWithApi onBackToHome={handleBackToHome} />
   ```

3. The API service will automatically provide:
   - Real-time validation
   - Auto-save functionality
   - Lookup data for dropdowns
   - Form state management
   - Error handling

## Testing

The service includes a demo component (`ApiDemo.tsx`) that demonstrates all functionality:

- **Lookups Tab**: Shows all dropdown data
- **Validation Tab**: Tests real-time validation
- **Registration Tab**: Tests form submission

## Future Enhancements

Potential improvements for the fake API service:

- [ ] Add more realistic data generation
- [ ] Implement caching for lookup data
- [ ] Add pagination for large datasets
- [ ] Include more validation rules
- [ ] Add file processing simulation
- [ ] Implement user authentication simulation
- [ ] Add more detailed error messages
- [ ] Include API documentation generation

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all imports are correct and types are properly defined
2. **Hook Dependencies**: Make sure to include all dependencies in useEffect arrays
3. **Form State**: Use the provided hooks for form state management
4. **Validation**: Check that validation functions are properly called

### Debug Mode

Enable debug logging by setting:
```typescript
localStorage.setItem('debug_api', 'true')
```

This will log all API calls and responses to the console.
