# TODO: Add Required Field Validation to RegistrationPage Inner Components

## Overview
Add or enhance validation for all required fields in all inner components included in RegistrationPage to ensure all fields are validated as required.

## Steps
1. **Update Tab1CompanyLegal.tsx**: Extend yup validation schema to include all required fields (companyClassification, commercialRegistryNumber, unifiedCommercialRegistryNumber, taxRegistryNumber, etc.).
2. **Update Tab2ContactInfo.tsx**: Add yup validation schema for all required fields (fullName, contact_jobtitle, contact_mobilephone, contact_mail, contact_ldv_nationalid, contact_ldv_nidissuedfrom, contact_ldv_nidissuedate, and representative fields if applicable).
3. **Update CompanyHeadInformation.tsx**: Add validation for required fields (governorate, city, district, street, and all company heads fields: name, position, mobile, nationalId, email).
4. **Update Tab3CompanyBranches.tsx**: Add validation if any required fields (currently optional, but ensure if hasBranches, branch fields are validated).
5. **Update Tab4ActivitiesAttachments.tsx**: Add validation for at least one activity selected, and required attachments (commercialRegister, taxCard).
6. **Update FinancialInformation.tsx**: Add validation for required fields (auditedBalanceSheet, fiscalCapital, domesticSalesDetails, export, ownershipNationality, etc.).
7. **Update RegistrationPage.tsx**: Enhance isTabValid and isSidebarTabComplete functions to check all required fields across components, and disable submit button if validation fails.

## Dependent Files
- src/pages/RegistrationPage.tsx
- src/components/registration/CompanyHeadInformation.tsx
- src/components/registration/registrationCompany/Tab1CompanyLegal.tsx
- src/components/registration/registrationCompany/Tab2ContactInfo.tsx
- src/components/registration/registrationCompany/Tab3CompanyBranches.tsx
- src/components/registration/registrationCompany/Tab4ActivitiesAttachments.tsx
- src/components/registration/FinancialInformation.tsx

## Followup Steps
- Test form validation on all tabs and fields.
- Ensure error messages are displayed correctly.
- Verify form submission is disabled when validation fails.
