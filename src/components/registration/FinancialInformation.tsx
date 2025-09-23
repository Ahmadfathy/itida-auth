import React, { useRef, useState } from 'react'
import Select, { MultiValue } from 'react-select'

interface OptionType {
  value: string
  label: string
}

interface FinancialInformationProps {
  formData: {
    ownershipNationality: string
    percentageEgyptianOwnership: string
    percentageNonEgyptianOwnership: string
    partnersNationalities: string
    subClassification: string | number | readonly string[] | undefined
    companyClassification: { companyClassification: string; subClassification: string }[]
    fiscalCapital: string
    domesticSalesDetails: { year: string; value: string; totalRevenueYear: string }[]
    domesticSalesValue: string
    totalRevenueYear: string
    annualRevenue: string
    auditedBalanceSheet: File | null
    export: string
    exportInformation: { year: string; marketRegion: string; country: string; valueExported: string; totalAmountExported: number }[]
    totalNoOfEmployees: string
    yearOfEstablishment: string
    companySize: string
    typeOfOwnership: string
    owners: { name: string; mobile: string; telephone: string; email: string }[]
    companyData: string
    products: { name: string; description: string }[]
    services: { name: string; description: string }[]
    customerReferences: { name: string; country: string; projectSize: string; scope: string; industriesSector: string; description: string }[]
    parent: string
    child: string
    grandChild: string
    industrySectors: string
    keyTechnologies: string[]
    certificates: string[]
    affiliation: string[]
    memberships: string[]
    partnerships: string[]
    companyOverview: string
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleFileChange: (file: File | null) => void
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
  t: any
  onSubmit: (e: React.FormEvent) => void
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  formData,
  setFormData,
  handleInputChange,
  handleFileChange,
  handleDynamicInputChange,
  addRow,
  removeRow,
  t,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [customKeyTech, setCustomKeyTech] = useState('')
  const [showCustomKeyTechInput, setShowCustomKeyTechInput] = useState(false)
  const [customAffiliation, setCustomAffiliation] = useState('')
  const [showCustomAffiliationInput, setShowCustomAffiliationInput] = useState(false)
  const [customMemberships, setCustomMemberships] = useState('')
  const [showCustomMembershipsInput, setShowCustomMembershipsInput] = useState(false)
  const [customCertificates, setCustomCertificates] = useState('')
  const [showCustomCertificatesInput, setShowCustomCertificatesInput] = useState(false)
  const [customPartnerships, setCustomPartnerships] = useState('')
  const [showCustomPartnershipsInput, setShowCustomPartnershipsInput] = useState(false)

  const handleFileChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleRadioChange = (name: string, value: string) => {
    handleInputChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleCompanySizeChange = (selectedOption: any) => {
    handleInputChange({ target: { name: 'companySize', value: selectedOption ? selectedOption.value : '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  const companySizeOptions = [
    { value: 'small', label: t.smallEmployees },
    { value: 'medium', label: t.mediumEmployees },
    { value: 'large', label: t.largeEmployees },
    { value: 'enterprise', label: t.enterpriseEmployees }
  ]

  // Options for multi-select fields
  const keyTechnologiesOptions: OptionType[] = [
    { value: 'IBM', label: t.ibm },
    { value: 'Microsoft', label: t.microsoft },
    { value: 'Oracle', label: t.oracle },
    { value: 'SUN', label: t.sun },
    { value: 'Java', label: t.java },
    { value: 'Open Source', label: t.openSource },
    { value: 'SAP', label: t.sap },
    { value: 'Sybase', label: t.sybase },
    { value: 'Others', label: t.others }
  ]

  const affiliationOptions: OptionType[] = [
    { value: 'MENA Innovation 2018', label: t.menaInnovation },
    { value: 'Others', label: t.others }
  ]

  const membershipsOptions: OptionType[] = [
    { value: 'CIT', label: t.cit },
    { value: 'EITISAL', label: t.eitisal },
    { value: 'eLABs', label: t.elabs },
    { value: 'ITI', label: t.iti },
    { value: 'FoCCIT', label: t.foccit },
    { value: 'ITEC', label: t.itec },
    { value: 'Others', label: t.others }
  ]

  const certificatesOptions: OptionType[] = [
    { value: 'BS 15000', label: t.bs15000 },
    { value: 'ISO 20K', label: t.iso20k },
    { value: 'CMMI-DEV', label: t.cmmiDev },
    { value: 'ISO 27001 (BS 7799 merged)', label: t.iso27001 },
    { value: 'CMMI-SVC', label: t.cmmiSvc },
    { value: 'ISO 9001 Quality', label: t.iso9001 },
    { value: 'COBIT', label: t.cobit },
    { value: 'PCMM', label: t.pcmm },
    { value: 'COPC 2000', label: t.copc2000 },
    { value: 'Six Sigma Businesses', label: t.sixSigma },
    { value: 'eSCM Establishing', label: t.escm },
    { value: 'Others', label: t.others }
  ]

  const partnershipsOptions: OptionType[] = [
    { value: 'Microsoft Certified Partner', label: t.microsoftCertifiedPartner },
    { value: 'HP Preferred Partner', label: t.hpPreferredPartner },
    { value: 'Oracle Certified Partner', label: t.oracleCertifiedPartner },
    { value: 'IBM Partner', label: t.ibmPartner },
    { value: 'Intel Certified Partner', label: t.intelCertifiedPartner },
    { value: 'Cisco Partner', label: t.ciscoPartner },
    { value: 'Others', label: t.others }
  ]

  const nationalitiesOptions: OptionType[] = [
    { value: 'Egyptian', label: t.egyptian },
    { value: 'American', label: t.american },
    { value: 'British', label: t.british },
    { value: 'Canadian', label: t.canadian },
    { value: 'French', label: t.french },
    { value: 'German', label: t.german },
    { value: 'Indian', label: t.indian },
    { value: 'Italian', label: t.italian },
    { value: 'Japanese', label: t.japanese },
    { value: 'Mexican', label: t.mexican },
    { value: 'Nigerian', label: t.nigerian },
    { value: 'Russian', label: t.russian },
    { value: 'South African', label: t.southAfrican },
    { value: 'Spanish', label: t.spanish },
    { value: 'Swedish', label: t.swedish },
    { value: 'Turkish', label: t.turkish },
    { value: 'Ukrainian', label: t.ukrainian },
    { value: 'Vietnamese', label: t.vietnamese },
    { value: 'Chinese', label: t.chinese },
    { value: 'Brazilian', label: t.brazilian }
  ]

  const countryOptions: OptionType[] = [
    { value: '', label: t.selectCountryPlaceholder },
    { value: 'Egypt', label: 'Egypt' },
    { value: 'United States', label: 'United States' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'France', label: 'France' },
    { value: 'Germany', label: 'Germany' },
    { value: 'India', label: 'India' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Russia', label: 'Russia' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Turkey', label: 'Turkey' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'China', label: 'China' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'UAE', label: 'UAE' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'Jordan', label: 'Jordan' },
    { value: 'Lebanon', label: 'Lebanon' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Tunisia', label: 'Tunisia' },
    { value: 'Algeria', label: 'Algeria' },
    { value: 'Libya', label: 'Libya' },
    { value: 'Sudan', label: 'Sudan' },
    { value: 'Yemen', label: 'Yemen' },
    { value: 'Syria', label: 'Syria' },
    { value: 'Iraq', label: 'Iraq' },
    { value: 'Iran', label: 'Iran' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'Philippines', label: 'Philippines' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'North Korea', label: 'North Korea' },
    { value: 'Taiwan', label: 'Taiwan' },
    { value: 'Hong Kong', label: 'Hong Kong' },
    { value: 'Macau', label: 'Macau' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Chile', label: 'Chile' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Guyana', label: 'Guyana' },
    { value: 'Suriname', label: 'Suriname' },
    { value: 'French Guiana', label: 'French Guiana' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'Belgium', label: 'Belgium' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'Austria', label: 'Austria' },
    { value: 'Poland', label: 'Poland' },
    { value: 'Czech Republic', label: 'Czech Republic' },
    { value: 'Slovakia', label: 'Slovakia' },
    { value: 'Hungary', label: 'Hungary' },
    { value: 'Romania', label: 'Romania' },
    { value: 'Bulgaria', label: 'Bulgaria' },
    { value: 'Greece', label: 'Greece' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Ireland', label: 'Ireland' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Norway', label: 'Norway' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Iceland', label: 'Iceland' },
    { value: 'Greenland', label: 'Greenland' },
    { value: 'Faroe Islands', label: 'Faroe Islands' },
    { value: 'Estonia', label: 'Estonia' },
    { value: 'Latvia', label: 'Latvia' },
    { value: 'Lithuania', label: 'Lithuania' },
    { value: 'Belarus', label: 'Belarus' },
    { value: 'Moldova', label: 'Moldova' },
    { value: 'Slovenia', label: 'Slovenia' },
    { value: 'Croatia', label: 'Croatia' },
    { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Montenegro', label: 'Montenegro' },
    { value: 'Kosovo', label: 'Kosovo' },
    { value: 'North Macedonia', label: 'North Macedonia' },
    { value: 'Albania', label: 'Albania' },
    { value: 'Malta', label: 'Malta' },
    { value: 'Cyprus', label: 'Cyprus' },
    { value: 'Luxembourg', label: 'Luxembourg' },
    { value: 'Liechtenstein', label: 'Liechtenstein' },
    { value: 'Monaco', label: 'Monaco' },
    { value: 'Andorra', label: 'Andorra' },
    { value: 'San Marino', label: 'San Marino' },
    { value: 'Vatican City', label: 'Vatican City' },
    { value: 'Israel', label: 'Israel' },
    { value: 'Palestine', label: 'Palestine' },
    { value: 'Afghanistan', label: 'Afghanistan' },
    { value: 'Kazakhstan', label: 'Kazakhstan' },
    { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
    { value: 'Tajikistan', label: 'Tajikistan' },
    { value: 'Turkmenistan', label: 'Turkmenistan' },
    { value: 'Uzbekistan', label: 'Uzbekistan' },
    { value: 'Mongolia', label: 'Mongolia' },
    { value: 'Myanmar', label: 'Myanmar' },
    { value: 'Cambodia', label: 'Cambodia' },
    { value: 'Laos', label: 'Laos' },
    { value: 'Sri Lanka', label: 'Sri Lanka' },
    { value: 'Nepal', label: 'Nepal' },
    { value: 'Bhutan', label: 'Bhutan' },
    { value: 'Maldives', label: 'Maldives' },
    { value: 'Brunei', label: 'Brunei' },
    { value: 'East Timor', label: 'East Timor' },
    { value: 'Papua New Guinea', label: 'Papua New Guinea' },
    { value: 'Solomon Islands', label: 'Solomon Islands' },
    { value: 'Vanuatu', label: 'Vanuatu' },
    { value: 'Fiji', label: 'Fiji' },
    { value: 'Samoa', label: 'Samoa' },
    { value: 'Tonga', label: 'Tonga' },
    { value: 'Tuvalu', label: 'Tuvalu' },
    { value: 'Kiribati', label: 'Kiribati' },
    { value: 'Marshall Islands', label: 'Marshall Islands' },
    { value: 'Micronesia', label: 'Micronesia' },
    { value: 'Palau', label: 'Palau' },
    { value: 'Nauru', label: 'Nauru' },
    { value: 'Cook Islands', label: 'Cook Islands' },
    { value: 'Niue', label: 'Niue' },
    { value: 'Tokelau', label: 'Tokelau' },
    { value: 'American Samoa', label: 'American Samoa' },
    { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
    { value: 'Guam', label: 'Guam' },
    { value: 'Puerto Rico', label: 'Puerto Rico' },
    { value: 'U.S. Virgin Islands', label: 'U.S. Virgin Islands' },
    { value: 'British Virgin Islands', label: 'British Virgin Islands' },
    { value: 'Anguilla', label: 'Anguilla' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Turks and Caicos Islands', label: 'Turks and Caicos Islands' },
    { value: 'Cayman Islands', label: 'Cayman Islands' },
    { value: 'Bermuda', label: 'Bermuda' },
    { value: 'Bahamas', label: 'Bahamas' },
    { value: 'Barbados', label: 'Barbados' },
    { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
    { value: 'Jamaica', label: 'Jamaica' },
    { value: 'Haiti', label: 'Haiti' },
    { value: 'Dominican Republic', label: 'Dominican Republic' },
    { value: 'Cuba', label: 'Cuba' },
    { value: 'Belize', label: 'Belize' },
    { value: 'Guatemala', label: 'Guatemala' },
    { value: 'El Salvador', label: 'El Salvador' },
    { value: 'Honduras', label: 'Honduras' },
    { value: 'Nicaragua', label: 'Nicaragua' },
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'Panama', label: 'Panama' },
    { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
    { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
    { value: 'Saint Lucia', label: 'Saint Lucia' },
    { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
    { value: 'Grenada', label: 'Grenada' },
    { value: 'Dominica', label: 'Dominica' },
    { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
    { value: 'Martinique', label: 'Martinique' },
    { value: 'Guadeloupe', label: 'Guadeloupe' },
    { value: 'French Polynesia', label: 'French Polynesia' },
    { value: 'New Caledonia', label: 'New Caledonia' },
    { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
    { value: 'French Southern Territories', label: 'French Southern Territories' },
    { value: 'Mayotte', label: 'Mayotte' },
    { value: 'Réunion', label: 'Réunion' },
    { value: 'Mauritius', label: 'Mauritius' },
    { value: 'Seychelles', label: 'Seychelles' },
    { value: 'Comoros', label: 'Comoros' },
    { value: 'Madagascar', label: 'Madagascar' },
    { value: 'Zimbabwe', label: 'Zimbabwe' },
    { value: 'Zambia', label: 'Zambia' },
    { value: 'Malawi', label: 'Malawi' },
    { value: 'Mozambique', label: 'Mozambique' },
    { value: 'Botswana', label: 'Botswana' },
    { value: 'Namibia', label: 'Namibia' },
    { value: 'Swaziland', label: 'Swaziland' },
    { value: 'Lesotho', label: 'Lesotho' },
    { value: 'Angola', label: 'Angola' },
    { value: 'Congo', label: 'Congo' },
    { value: 'Democratic Republic of the Congo', label: 'Democratic Republic of the Congo' },
    { value: 'Gabon', label: 'Gabon' },
    { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
    { value: 'Cameroon', label: 'Cameroon' },
    { value: 'Central African Republic', label: 'Central African Republic' },
    { value: 'Chad', label: 'Chad' },
    { value: 'Niger', label: 'Niger' },
    { value: 'Mali', label: 'Mali' },
    { value: 'Burkina Faso', label: 'Burkina Faso' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Togo', label: 'Togo' },
    { value: 'Benin', label: 'Benin' },
    { value: 'Cote d\'Ivoire', label: 'Cote d\'Ivoire' },
    { value: 'Liberia', label: 'Liberia' },
    { value: 'Sierra Leone', label: 'Sierra Leone' },
    { value: 'Guinea', label: 'Guinea' },
    { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
    { value: 'Senegal', label: 'Senegal' },
    { value: 'Gambia', label: 'Gambia' },
    { value: 'Cape Verde', label: 'Cape Verde' },
    { value: 'Mauritania', label: 'Mauritania' },
    { value: 'Western Sahara', label: 'Western Sahara' },
    { value: 'Somalia', label: 'Somalia' },
    { value: 'Djibouti', label: 'Djibouti' },
    { value: 'Eritrea', label: 'Eritrea' },
    { value: 'Ethiopia', label: 'Ethiopia' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Rwanda', label: 'Rwanda' },
    { value: 'Burundi', label: 'Burundi' },
    { value: 'South Sudan', label: 'South Sudan' },
    { value: 'Somaliland', label: 'Somaliland' },
    { value: 'Others', label: t.others }
  ]

  // Custom Option component for checkbox in react-select
  const CheckboxOption = (props: any) => {
    const { children, isSelected, innerRef, innerProps } = props
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center space-x-2 rtl:space-x-reverse p-2 hover:bg-gray-100 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null}
          className="form-checkbox h-4 w-4 text-itida-blue"
        />
        <label>{children}</label>
      </div>
    )
  }


  const handlePartnersNationalitiesChange = (selectedOption: OptionType | null) => {
    setFormData((prev: any) => ({
      ...prev,
      partnersNationalities: selectedOption ? selectedOption.value : ''
    }))
  }

  const handleKeyTechChange = (selectedOptions: MultiValue<OptionType>) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : []
    const hasOthers = values.includes('Others')
    setShowCustomKeyTechInput(hasOthers)
    const filteredValues = values.filter(v => v !== 'Others')
    if (!hasOthers) {
      setCustomKeyTech('')
      setFormData((prev: any) => ({ ...prev, keyTechnologies: filteredValues }))
    } else {
      const finalValues = customKeyTech ? [...filteredValues, customKeyTech] : filteredValues
      setFormData((prev: any) => ({ ...prev, keyTechnologies: finalValues }))
    }
  }

  const handleCustomKeyTechChange = (value: string) => {
    setCustomKeyTech(value)
    const currentValues = formData.keyTechnologies.filter(v => v !== customKeyTech && keyTechnologiesOptions.some(option => option.value === v))
    const newValues = value ? [...currentValues, value] : currentValues
    setFormData((prev: any) => ({ ...prev, keyTechnologies: newValues }))
  }

  const handleAffiliationChange = (selectedOptions: MultiValue<OptionType>) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : []
    const hasOthers = values.includes('Others')
    setShowCustomAffiliationInput(hasOthers)
    const filteredValues = values.filter(v => v !== 'Others')
    if (!hasOthers) {
      setCustomAffiliation('')
      setFormData((prev: any) => ({ ...prev, affiliation: filteredValues }))
    } else {
      const finalValues = customAffiliation ? [...filteredValues, customAffiliation] : filteredValues
      setFormData((prev: any) => ({ ...prev, affiliation: finalValues }))
    }
  }

  const handleCustomAffiliationChange = (value: string) => {
    setCustomAffiliation(value)
    const currentValues = formData.affiliation.filter(v => v !== customAffiliation && affiliationOptions.some(option => option.value === v))
    const newValues = value ? [...currentValues, value] : currentValues
    setFormData((prev: any) => ({ ...prev, affiliation: newValues }))
  }

  const handleMembershipsChange = (selectedOptions: MultiValue<OptionType>) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : []
    const hasOthers = values.includes('Others')
    setShowCustomMembershipsInput(hasOthers)
    const filteredValues = values.filter(v => v !== 'Others')
    if (!hasOthers) {
      setCustomMemberships('')
      setFormData((prev: any) => ({ ...prev, memberships: filteredValues }))
    } else {
      const finalValues = customMemberships ? [...filteredValues, customMemberships] : filteredValues
      setFormData((prev: any) => ({ ...prev, memberships: finalValues }))
    }
  }

  const handleCustomMembershipsChange = (value: string) => {
    setCustomMemberships(value)
    const currentValues = formData.memberships.filter(v => v !== customMemberships && membershipsOptions.some(option => option.value === v))
    const newValues = value ? [...currentValues, value] : currentValues
    setFormData((prev: any) => ({ ...prev, memberships: newValues }))
  }

  const handleCertificatesChange = (selectedOptions: MultiValue<OptionType>) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : []
    const hasOthers = values.includes('Others')
    setShowCustomCertificatesInput(hasOthers)
    const filteredValues = values.filter(v => v !== 'Others')
    if (!hasOthers) {
      setCustomCertificates('')
      setFormData((prev: any) => ({ ...prev, certificates: filteredValues }))
    } else {
      const finalValues = customCertificates ? [...filteredValues, customCertificates] : filteredValues
      setFormData((prev: any) => ({ ...prev, certificates: finalValues }))
    }
  }

  const handleCustomCertificatesChange = (value: string) => {
    setCustomCertificates(value)
    const currentValues = formData.certificates.filter(v => v !== customCertificates && certificatesOptions.some(option => option.value === v))
    const newValues = value ? [...currentValues, value] : currentValues
    setFormData((prev: any) => ({ ...prev, certificates: newValues }))
  }

  const handlePartnershipsChange = (selectedOptions: MultiValue<OptionType>) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : []
    const hasOthers = values.includes('Others')
    setShowCustomPartnershipsInput(hasOthers)
    const filteredValues = values.filter(v => v !== 'Others')
    if (!hasOthers) {
      setCustomPartnerships('')
      setFormData((prev: any) => ({ ...prev, partnerships: filteredValues }))
    } else {
      const finalValues = customPartnerships ? [...filteredValues, customPartnerships] : filteredValues
      setFormData((prev: any) => ({ ...prev, partnerships: finalValues }))
    }
  }

  const handleCustomPartnershipsChange = (value: string) => {
    setCustomPartnerships(value)
    const currentValues = formData.partnerships.filter(v => v !== customPartnerships && partnershipsOptions.some(option => option.value === v))
    const newValues = value ? [...currentValues, value] : currentValues
    setFormData((prev: any) => ({ ...prev, partnerships: newValues }))
  }

  const companyClassificationOptions: OptionType[] = [
    { value: 'Technology', label: t.technology },
    { value: 'Manufacturing', label: t.manufacturing },
    { value: 'Services', label: t.services },
    { value: 'Retail', label: t.retail },
    { value: 'Others', label: t.others }
  ]

  const subClassificationMapping: { [key: string]: OptionType[] } = {
    Technology: [
      { value: 'Software Development', label: t.softwareDevelopment },
      { value: 'Hardware', label: t.hardware },
      { value: 'Consulting', label: t.consulting },
      { value: 'Others', label: t.others }
    ],
    Manufacturing: [
      { value: 'Production', label: t.production },
      { value: 'Assembly', label: t.assembly },
      { value: 'Others', label: t.others }
    ],
    Services: [
      { value: 'Consulting', label: t.consulting },
      { value: 'Outsourcing', label: t.outsourcing },
      { value: 'Others', label: t.others }
    ],
    Retail: [
      { value: 'E-commerce', label: t.ecommerce },
      { value: 'Physical Stores', label: t.physicalStores },
      { value: 'Others', label: t.others }
    ],
    Others: [
      { value: 'Others', label: t.others }
    ]
  }

  const industrySectorsOptions: OptionType[] = [
    { value: 'IT', label: t.it },
    { value: 'Finance', label: t.finance },
    { value: 'Healthcare', label: t.healthcare },
    { value: 'Education', label: t.education },
    { value: 'Others', label: t.others }
  ]

  const handleCompanyClassificationChange = (index: number, selectedOption: any) => {
    const newValue = selectedOption ? selectedOption.value : ''
    setFormData((prev: any) => {
      const newClassifications = [...prev.companyClassification]
      newClassifications[index] = { ...newClassifications[index], companyClassification: newValue, subClassification: '' }
      return { ...prev, companyClassification: newClassifications }
    })
  }

  const handleSubClassificationChange = (index: number, selectedOption: any) => {
    const newValue = selectedOption ? selectedOption.value : ''
    setFormData((prev: any) => {
      const newClassifications = [...prev.companyClassification]
      newClassifications[index] = { ...newClassifications[index], subClassification: newValue }
      return { ...prev, companyClassification: newClassifications }
    })
  }

  const handleIndustrySectorsChange = (selectedOption: any) => {
    handleInputChange({ target: { name: 'industrySectors', value: selectedOption ? selectedOption.value : '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <form onSubmit={onSubmit} className="py-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {t.financialInformation}
      </h2>

      {/* Financial Information */}
      <div className="space-y-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.financialInformation}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Audited Balance Sheet */}
          <div className="mb-6 md:mb-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.auditedBalanceSheet} <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChangeInternal}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
              >
                {t.chooseFile}
              </button>
              <span className="text-sm text-gray-500">{formData.auditedBalanceSheet ? formData.auditedBalanceSheet.name : t.noFileChosen}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.paidCapital}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder={t.enterPaidCapital}
              value={formData.fiscalCapital}
              onChange={handleInputChange}
              name="fiscalCapital"
            />
          </div>

        </div>

        {/* Domestic Sales Details */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-800 pb-2">
            {t.domesticSalesDetails}
          </h4>
          <div className="space-y-4">
            {formData.domesticSalesDetails.map((detail, index) => (
              <div key={`domesticSales-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.domesticSalesYear} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={t.enterDomesticSalesYear}
                    value={detail.year}
                    onChange={(e) => handleDynamicInputChange('domesticSalesDetails', index, 'year', e.target.value)}
                    name={`domesticSalesDetails.${index}.year`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.domesticSalesValue} <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={t.enterDomesticSalesValue}
                    value={detail.value}
                    onChange={(e) => handleDynamicInputChange('domesticSalesDetails', index, 'value', e.target.value)}
                    name={`domesticSalesDetails.${index}.value`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.totalRevenueYear} <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={t.enterTotalRevenueYear}
                    value={detail.totalRevenueYear}
                    onChange={(e) => handleDynamicInputChange('domesticSalesDetails', index, 'totalRevenueYear', e.target.value)}
                    name={`domesticSalesDetails.${index}.totalRevenueYear`}
                  />
                </div>
                <div className="flex justify-end col-span-3">
                  <button
                    type="button"
                    onClick={() => removeRow('domesticSalesDetails', index)}
                    className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addRow('domesticSalesDetails', { year: '', value: '', totalRevenueYear: '' })}
                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.annualRevenue} <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder={t.enterAnnualRevenue}
              value={formData.annualRevenue}
              onChange={handleInputChange}
              name="annualRevenue"
              readOnly
            />
          </div>
        </div>

        {/* Total No of Employees and Company Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.totalNoOfEmployees}</label>
            <input
              type="text"
              className="input-field"
              placeholder={t.enterTotalNumberOfEmployees}
              value={formData.totalNoOfEmployees}
              onChange={handleInputChange}
              name="totalNoOfEmployees"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.companySize}</label>
            <Select
              options={companySizeOptions}
              value={companySizeOptions.find(option => option.value === formData.companySize)}
              onChange={handleCompanySizeChange}
              placeholder={t.selectCompanySize}
              className="basic-single"
              classNamePrefix="select"
            />
          </div>
        </div>

      </div>

      {/* Market Information */}
      <div className="space-y-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.marketInformation}
        </h3>

        {/* Key Technologies, Affiliations, Memberships */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.keyTechnologies}</label>
            <Select
              isMulti
              options={keyTechnologiesOptions}
              value={keyTechnologiesOptions.filter(option => formData.keyTechnologies.includes(option.value))}
              onChange={handleKeyTechChange}
              placeholder={t.selectKeyTechnologies}
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
            {showCustomKeyTechInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customKeyTech}
                  onChange={(e) => handleCustomKeyTechChange(e.target.value)}
                  placeholder={t.enterCustomKeyTechnology}
                  className="input-field"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.affiliation}</label>
            <Select
              isMulti
              options={affiliationOptions}
              value={affiliationOptions.filter(option => formData.affiliation.includes(option.value))}
              onChange={handleAffiliationChange}
              placeholder={t.selectAffiliations}
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
            {showCustomAffiliationInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customAffiliation}
                  onChange={(e) => handleCustomAffiliationChange(e.target.value)}
                  placeholder={t.enterCustomAffiliation}
                  className="input-field"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.memberships}</label>
            <Select
              isMulti
              options={membershipsOptions}
              value={membershipsOptions.filter(option => formData.memberships.includes(option.value))}
              onChange={handleMembershipsChange}
              placeholder={t.selectMemberships}
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
            {showCustomMembershipsInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customMemberships}
                  onChange={(e) => handleCustomMembershipsChange(e.target.value)}
                  placeholder={t.enterCustomMembership}
                  className="input-field"
                />
              </div>
            )}
          </div>
        </div>

        {/* Certificates, Partnerships */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.certificates}</label>
            <Select
              isMulti
              options={certificatesOptions}
              value={certificatesOptions.filter(option => formData.certificates.includes(option.value))}
              onChange={handleCertificatesChange}
              placeholder={t.selectCertificates}
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
            {showCustomCertificatesInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customCertificates}
                  onChange={(e) => handleCustomCertificatesChange(e.target.value)}
                  placeholder={t.enterCustomCertificate}
                  className="input-field"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.partnerships}</label>
            <Select
              isMulti
              options={partnershipsOptions}
              value={partnershipsOptions.filter(option => formData.partnerships.includes(option.value))}
              onChange={handlePartnershipsChange}
              placeholder={t.selectPartnerships}
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
            {showCustomPartnershipsInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customPartnerships}
                  onChange={(e) => handleCustomPartnershipsChange(e.target.value)}
                  placeholder={t.enterCustomPartnership}
                  className="input-field"
                />
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{t.products}</h4>
          {formData.products.map((product: { name: string; description: string }, index: number) => (
            <div key={`product-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.productName}</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleDynamicInputChange('products', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder={t.productName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.productDescription}</label>
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) => handleDynamicInputChange('products', index, 'description', e.target.value)}
                    className="input-field"
                    placeholder={t.productDescription}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('products', index)}
                  className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => addRow('products', { name: '', description: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{t.services}</h4>
          {formData.services.map((service: { name: string; description: string }, index: number) => (
            <div key={`service-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.serviceName}</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => handleDynamicInputChange('services', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder={t.serviceName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.serviceDescription}</label>
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => handleDynamicInputChange('services', index, 'description', e.target.value)}
                    className="input-field"
                    placeholder={t.serviceDescription}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('services', index)}
                  className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => addRow('services', { name: '', description: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Customer Reference */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{t.customerReference}</h4>
          {formData.customerReferences.map((reference: { name: string; country: string; projectSize: string; scope: string; industriesSector: string; description: string }, index: number) => (
            <div key={`reference-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.customerName}</label>
                  <input
                    type="text"
                    value={reference.name}
                    onChange={(e) => handleDynamicInputChange('customerReferences', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder={t.customerName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.country}</label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(option => option.value === reference.country)}
                    onChange={(selectedOption) => handleDynamicInputChange('customerReferences', index, 'country', selectedOption ? selectedOption.value : '')}
                    placeholder={t.selectCountry}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.projectSize}</label>
                  <input
                    type="text"
                    value={reference.projectSize}
                    onChange={(e) => handleDynamicInputChange('customerReferences', index, 'projectSize', e.target.value)}
                    className="input-field"
                    placeholder={t.projectSize}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.scope}</label>
                  <input
                    type="text"
                    value={reference.scope}
                    onChange={(e) => handleDynamicInputChange('customerReferences', index, 'scope', e.target.value)}
                    className="input-field"
                    placeholder={t.scope}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.industriesSector}</label>
                  <input
                    type="text"
                    value={reference.industriesSector}
                    onChange={(e) => handleDynamicInputChange('customerReferences', index, 'industriesSector', e.target.value)}
                    className="input-field"
                    placeholder={t.industriesSector}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.projectDescription}</label>
                <input
                  type="text"
                  value={reference.description}
                  onChange={(e) => handleDynamicInputChange('customerReferences', index, 'description', e.target.value)}
                  className="input-field"
                  placeholder={t.projectDescription}
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('customerReferences', index)}
                  className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => addRow('customerReferences', { name: '', country: '', projectSize: '', scope: '', industriesSector: '', description: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Company Classifications */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">{t.companyClassifications}</h4>
          {formData.companyClassification.map((classification, index) => (
            <div key={`classification-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.companyClassifications} <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={companyClassificationOptions}
                    value={companyClassificationOptions.find(option => option.value === classification.companyClassification)}
                    onChange={(selectedOption) => handleCompanyClassificationChange(index, selectedOption)}
                    placeholder={t.selectCompanyClassification}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.companySubClassification} <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={subClassificationMapping[classification.companyClassification] || []}
                    value={(subClassificationMapping[classification.companyClassification] || []).find(option => option.value === classification.subClassification)}
                    onChange={(selectedOption) => handleSubClassificationChange(index, selectedOption)}
                    placeholder={t.selectSubClassification}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.industrySectors}
                  </label>
                  <Select
                    options={industrySectorsOptions}
                    value={industrySectorsOptions.find(option => option.value === formData.industrySectors)}
                    onChange={handleIndustrySectorsChange}
                    placeholder={t.selectIndustrySector}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('companyClassification', index)}
                  className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              disabled={formData.companyClassification.length >= 3}
              onClick={() => addRow('companyClassification', { companyClassification: '', subClassification: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      </div>






      {/* Fiscal Capital Section */}
      <div className="mb-8">

        {/* Do You Export Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.export}? <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="export"
                value="yes"
                checked={formData.export === 'yes'}
                onChange={(e) => handleRadioChange('export', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{t.yes}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="export"
                value="no"
                checked={formData.export === 'no'}
                onChange={(e) => handleRadioChange('export', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{t.no}</span>
            </label>
          </div>
        </div>

        {formData.export === 'yes' && (
          <>
            {/* Export Information */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">{t.exportInformation}</h4>
              {formData.exportInformation.map((exportInfo, index) => (
                <div key={`export-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.year}</label>
                      <input
                        type="text"
                        value={exportInfo.year}
                        onChange={(e) => handleDynamicInputChange('exportInformation', index, 'year', e.target.value)}
                        className="input-field"
                        placeholder={t.year}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.marketRegion}</label>
                      <input
                        type="text"
                        value={exportInfo.marketRegion}
                        onChange={(e) => handleDynamicInputChange('exportInformation', index, 'marketRegion', e.target.value)}
                        className="input-field"
                        placeholder={t.marketRegion}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.country}</label>
                      <input
                        type="text"
                        value={exportInfo.country}
                        onChange={(e) => handleDynamicInputChange('exportInformation', index, 'country', e.target.value)}
                        className="input-field"
                        placeholder={t.country}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.typesProductsServicesExported}</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={exportInfo.valueExported}
                          onChange={(e) => handleDynamicInputChange('exportInformation', index, 'valueExported', e.target.value)}
                          className="input-field"
                          placeholder={t.typesProductsServicesExported}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.totalAmountExportsYearUSD}</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={exportInfo.totalAmountExported}
                          onChange={(e) => handleDynamicInputChange('exportInformation', index, 'totalAmountExported', e.target.value)}
                          className="input-field"
                          placeholder={t.totalAmountExportsYearUSD}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => removeRow('exportInformation', index)}
                      className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => addRow('exportInformation', { year: '', marketRegion: '', country: '', valueExported: '', totalAmountExported: '' })}
                  className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Type of Ownership */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.ownership} ({t.selected100PercentEgyptian})? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ownershipNationality"
                value="yes"
                checked={formData.ownershipNationality === 'yes'}
                onChange={(e) => handleRadioChange('ownershipNationality', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{t.yes}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ownershipNationality"
                value="no"
                checked={formData.ownershipNationality === 'no'}
                onChange={(e) => handleRadioChange('ownershipNationality', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{t.no}</span>
            </label>
          </div>
        </div>
        {formData.ownershipNationality === 'no' && (
          <>
            {/* Ownership Details */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.percentageOfEgyptianOwnership}</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field pr-8"
                      placeholder={t.percentageOfEgyptianOwnership}
                      value={formData.percentageEgyptianOwnership}
                      onChange={handleInputChange}
                      name="percentageEgyptianOwnership"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.percentageOfNonEgyptianOwnership}</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field pr-8"
                      placeholder={t.percentageOfNonEgyptianOwnership}
                      value={formData.percentageNonEgyptianOwnership}
                      onChange={handleInputChange}
                      name="percentageNonEgyptianOwnership"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.partnersOrShareholdersNationalities}</label>
                  <Select
                    options={nationalitiesOptions}
                    value={nationalitiesOptions.find(option => option.value === formData.partnersNationalities)}
                    onChange={handlePartnersNationalitiesChange}
                    placeholder={t.selectNationality}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default FinancialInformation
