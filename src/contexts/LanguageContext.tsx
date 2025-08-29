import { createContext, useContext } from 'react'

interface LanguageContextType {
  language: 'en' | 'ar'
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Helper function to get initial language from localStorage or default to 'en'
export const getInitialLanguage = (): 'en' | 'ar' => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('itida-language')
    if (savedLanguage === 'en' || savedLanguage === 'ar') {
      return savedLanguage
    }
  }
  return 'en'
}

// Helper function to save language to localStorage
export const saveLanguageToStorage = (language: 'en' | 'ar'): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('itida-language', language)
  }
}

export const translations = {
  en: {
    // Header
    home: 'Home',
    benefits: 'Benefits',
    contact: 'Contact',
    callUs: 'Call: 16248',
    
    // Registration Sidebar
    registrationCompany: 'Registration Company',
    companyHeadContacts: 'Company\'s Head & Contacts',
    financialInformation: 'Financial Information',
    
         // Hero
     heroTitle: 'Join Egypt\'s Official ICT Sector Registry',
     heroSubtitle: 'Empowering Digital Innovation and Growth',
     heroDescription: 'The Information Technology Industry Development Agency (ITIDA) is the central governmental authority regulating Egypt\'s Information and Communications Technology (ICT) sector.',
     learnMore: 'Learn More',
    
         // Login Form
     alreadyMember: 'Already ITIDA Member',
     usernameEmail: 'Username or Email',
     password: 'Password',
     rememberMe: 'Remember Me',
     login: 'Sign In',
     forgotPassword: 'Lost your password?',
     joinNow: 'Join ITIDA Now',
     dontHaveAccount: 'Don\'t have an account?',
     registerHere: 'Register here',
     username: 'UserName/Email',
     crn: 'CRN',
     licenseNo: 'License No.',
    
    // User Roles
    userRole: 'User Role',
    individual: 'Individual',
    company: 'Company',
    government: 'Government',
    
         // Features
     featuresTitle: 'Why Choose ITIDA?',
     licensing: 'Licensing',
     licensingDesc: 'Official licenses for ICT activities',
     innovation: 'Innovation Support',
     innovationDesc: 'Foster digital innovation',
     ecosystem: 'Digital Ecosystem',
     ecosystemDesc: 'Thriving ICT community',
     secureAccess: 'Secure Access Portal',
     secureAccessDesc: 'Access your ITIDA dashboard with enterprise-grade security',
     recoverYourAccount: 'Recover Your Account',
     recoverYourAccountDesc: 'Easily recover access to your ITIDA account with our secure recovery process',
     twoFactorAuth: 'Two-Factor Authentication',
     twoFactorAuthDesc: 'Enhanced security for your account',
     encryptedComm: 'Encrypted Communication',
     encryptedCommDesc: 'All data is encrypted in transit',
          realTimeMonitoring: 'Real-time Monitoring',
     realTimeMonitoringDesc: 'Track your activities and licenses',
     
     // Features Additional
     comprehensiveIctSolutions: 'Comprehensive ICT Solutions',
     comprehensiveIctSolutionsDesc: 'From licensing and regulation to innovation support and ecosystem development, ITIDA provides end-to-end solutions for Egypt\'s digital transformation journey.',
     governmentBackedAuthority: 'Government-backed authority',
     internationalStandardsCompliance: 'International standards compliance',
     support24x7: '24/7 support and assistance',
                          exploreAllServices: 'Explore All Services',
     discoverBenefits: 'Discover the comprehensive benefits and services that make ITIDA the leading authority in Egypt\'s ICT sector development',
     backToHome: 'Back to Home',
     
     // Footer
     poweredBy: 'Proudly powered by ITIDA',
     itidaDb: 'ITIDA DB',
     
     // Forgot Password
     forgotPasswordTitle: 'Forgot Password?',
     forgotPasswordSubtitle: 'Enter your email address and we\'ll send you a link to reset your password.',
     emailAddress: 'Email Address',
     enterEmail: 'Enter your email',
     sendResetLink: 'Send Reset Link',
     sending: 'Sending...',
     checkYourEmail: 'Check Your Email',
     resetInstructions: 'We\'ve sent a password reset link to {email}. Please check your email and click the link to reset your password.',
     backToLogin: 'Back to Login',
     sendAnotherEmail: 'Send Another Email',
     didntReceiveEmail: 'Didn\'t receive the email? Check your spam folder or contact support.',
     needHelp: 'Need help?',
     contactSupport: 'Contact Support',
     helpCenter: 'Help Center',
     pleaseEnterEmail: 'Please enter your email address',
     pleaseEnterValidEmail: 'Please enter a valid email address',
     somethingWentWrong: 'Something went wrong. Please try again.',
     
     // Registration Page
     companiesRegistrationForm: 'Companies Registration Form',
     completeCompanyRegistration: 'Complete your company registration with ITIDA',
     companyLegalInformation: 'Company Legal Information',
     contactInformation: 'Contact Information',
     activitiesAttachments: 'Activities & Attachments',
     previous: 'Previous',
     next: 'Next',
     submitRegistration: 'Submit Registration',
     
     // Tab 1: Company Legal Information
     companyLegalInfoTitle: 'Company Legal Information',
     companyLegalInfoSubtitle: '(As mentioned in the commercial register or tax card)',
     companyNameEnglish: 'Company Name English',
     companyNameArabic: 'Company Name Arabic',
     commercialDenomination: 'Commercial Denomination',
     legalType: 'Legal Type',
     selectLegalType: 'Select Legal Type',
     soleProprietorship: 'Sole Proprietorship',
     partnership: 'Partnership',
     limitedLiabilityCompany: 'Limited Liability Company',
     jointStockCompany: 'Joint Stock Company',
     branch: 'Branch',
     other: 'Other',
     registerUsing: 'Register Using',
     commercialRegistryNumber: 'Commercial Registry Number',
     unifiedCommercialRegistryNumber: 'Unified Commercial Registry Number',
     taxRegistryNumber: 'Tax Registry Number',
     commercialRegistrationDate: 'Commercial Registration Date',
     noteRegistrationOptions: 'Note: At least one registration option must be selected',
     
     // Tab 2: Contact Information
     contactInfoTitle: 'Contact Information',
     contactInfoSubtitle: 'Contact Information & Company Representative',
     companyAddress: 'Company Address',
     governorate: 'Governorate',
     selectGovernorate: 'Select Governorate',
     districtCity: 'District - City',
     streetAddress: 'Street Address',
     companyContactInfo: 'Company Contact Information',
     companyWebsiteUrl: 'Company Website URL',
     officialEmail: 'Official Email',
     phoneMobile: 'Phone/Mobile',
     companyHasBranches: 'Yes, Company Has Branches',
     companyRepresentative: 'Company In-charge / Representative',
     representativeSubtitle: '(As shown in the commercial register or power of attorney)',
     name: 'Name',
     title: 'Title',
     mobile: 'Mobile',
     nationalId: 'National ID',
     email: 'E-mail',
     requestApplicant: 'Request Applicant',
     companyInCharge: 'Company In-charge (as shown in commercial register or power of attorney)',
     representative: 'Representative',
     noteRequiredFields: 'Note: All required fields must be filled before proceeding to the next step',
     
     // Tab 3: Activities & Attachments
     activitiesAttachmentsTitle: 'Activities & Attachments',
     activitiesAttachmentsSubtitle: 'Select required activities and attach required documents',
     activitiesRequiredForLicensing: 'Activities Required for Licensing',
     softwareDesignServices: 'Software design, production, and development services',
     itSystemsServices: 'Information technology systems design, development, production, supply, and operation services',
     trustServices: 'Trust and electronic signature services',
     websitesPlatformsServices: 'Website, platform, and electronic transaction services using the internet',
     electronicsEmbeddedServices: 'Electronics and embedded systems design, development, and production services in the field of information and communication technology',
     contentDigitizationServices: 'Traditional content digitization services using information technology',
     callCenterBusinessServices: 'Call center and business process management services using information and communication technology',
     consultingResearchServices: 'Consulting, research and development, and entrepreneurship services in the field of information and communication technology',
     trainingLearningServices: 'Training and learning services in the field of information and communication technology',
     attachments: 'Attachments',
     attachmentsNote: 'Note: Only Images & PDF are accepted with max 3 MB',
     commercialRegisterImage: 'Commercial Register Image or Declaration Decision',
     taxCardImage: 'Tax Card Image',
     nationalIdImage: 'ID Image (National ID) for Responsible Manager',
     investmentGazetteImage: 'Investment Gazette or Company Contract Image',
     declarationUndertakingImage: 'Declaration and Undertaking Regarding IT Activities',
     licenseReceipt: 'License Receipt',
     methodOfLicenseReceipt: 'Method of License Receipt',
     selectReceiptMethod: 'Select Receipt Method',
     postalMail: 'Postal Mail',
     personalPickup: 'Personal Pickup',
     courier: 'Courier',
     declarationAgreement: 'Declaration & Agreement',
     declarationText: 'I declare and undertake the accuracy of the submitted documents and my commitment to the relevant Egyptian laws, including those concerning electronic signatures, intellectual property rights, personal data protection, and cybercrime. I also undertake to practice licensed activities safely, ethically, responsibly, and transparently.',
     iAgree: 'I agree',
     noteDeclarationAgreement: 'Note: Declaration agreement must be accepted before submitting the request',

     // Additional Benefits
     additionalBenefitsTitle: 'Regulation of Information Technology Activity Licenses',
     additionalBenefitsDesc: 'The Information Technology Industry Development Agency (ITIDA) issues licenses for practicing specialized activities within the information and communication technology sector to regulate the IT sector and encourage investment in this vital field. This initiative aims to support market growth and foster a vibrant digital business environment.',
     activitiesEligible: 'Activities Eligible for Licensing:',
     eligibleActivities: [
       'Software design, production, and development services.',
       'Information technology systems design, development, production, supply, and operation services.',
       'Website, platform, and e-transaction services utilizing the internet.',
       'Electronics and embedded systems design and development, and electronics manufacturing in the ICT field.',
       'Traditional content digitization services using information technology.',
       'Call center and business process management services using information and communication technology.',
       'Consultancy, research and development, and entrepreneurship services in information and communication technology.',
       'Training and education services in information and communication technology.'
     ]
  },
  ar: {
    // Header
    home: 'الرئيسية',
    benefits: 'الفوائد',
    contact: 'اتصل بنا',
    callUs: 'اتصل: 16248',
    
    // Registration Sidebar
    registrationCompany: 'تسجيل الشركة',
    companyHeadContacts: 'رئيس الشركة وجهات الاتصال',
    financialInformation: 'المعلومات المالية',
    
         // Hero
     heroTitle: 'انضم إلى السجل الرسمي لقطاع تكنولوجيا المعلومات في مصر',
     heroSubtitle: 'تمكين الابتكار الرقمي والنمو',
     heroDescription: 'وكالة تنمية صناعة تكنولوجيا المعلومات (إيتيدا) هي السلطة الحكومية المركزية التي تنظم قطاع تكنولوجيا المعلومات والاتصالات في مصر.',
     learnMore: 'اعرف المزيد',
    
         // Login Form
     alreadyMember: 'عضو إيتيدا بالفعل',
     usernameEmail: 'اسم المستخدم أو البريد الإلكتروني',
     password: 'كلمة المرور',
     rememberMe: 'تذكرني',
     login: 'تسجيل الدخول',
     forgotPassword: 'نسيت كلمة المرور؟',
     joinNow: 'انضم إلى إيتيدا الآن',
     dontHaveAccount: 'ليس لديك حساب؟',
     registerHere: 'سجل هنا',
     username: 'إسم المستخدم/البريد الإلكتروني',
     crn: 'CRN',
     licenseNo: 'رقم الترخيص',
    
    // User Roles
    userRole: 'دور المستخدم',
    individual: 'فرد',
    company: 'شركة',
    government: 'حكومة',
    
         // Features
     featuresTitle: 'لماذا تختار إيتيدا؟',
     licensing: 'الترخيص',
     licensingDesc: 'تراخيص رسمية للأنشطة المتعلقة بتكنولوجيا المعلومات',
     innovation: 'دعم الابتكار',
     innovationDesc: 'تعزيز الابتكار الرقمي',
     ecosystem: 'النظام البيئي الرقمي',
     ecosystemDesc: 'مجتمع تكنولوجيا المعلومات المزدهر',
     secureAccess: 'بوابة الوصول الآمن',
     secureAccessDesc: 'الوصول إلى لوحة تحكم إيتيدا مع أمان على مستوى المؤسسة',
     recoverYourAccount: 'استعادة حسابك',
     recoverYourAccountDesc: 'استعادة الوصول إلى حسابك في إيتيدا بسهولة من خلال عملية الاستعادة الآمنة',
     twoFactorAuth: 'المصادقة الثنائية',
     twoFactorAuthDesc: 'أمان محسن لحسابك',
     encryptedComm: 'التواصل المشفر',
     encryptedCommDesc: 'جميع البيانات مشفرة أثناء النقل',
          realTimeMonitoring: 'المراقبة في الوقت الفعلي',
     realTimeMonitoringDesc: 'تتبع أنشطتك وتراخيصك',
     
     // Features Additional
     comprehensiveIctSolutions: 'حلول تكنولوجيا المعلومات الشاملة',
     comprehensiveIctSolutionsDesc: 'من الترخيص والتنظيم إلى دعم الابتكار وتطوير النظام البيئي، توفر إيتيدا حلولاً شاملة لرحلة التحول الرقمي في مصر.',
     governmentBackedAuthority: 'سلطة مدعومة من الحكومة',
     internationalStandardsCompliance: 'الامتثال للمعايير الدولية',
     support24x7: 'الدعم والمساعدة على مدار 24/7',
     exploreAllServices: 'استكشف جميع الخدمات',
     discoverBenefits: 'اكتشف الفوائد والخدمات الشاملة التي تجعل إيتيدا السلطة الرائدة في تطوير قطاع تكنولوجيا المعلومات في مصر',
     backToHome: 'العودة للرئيسية',
     
     // Forgot Password
     forgotPasswordTitle: 'نسيت كلمة المرور؟',
     forgotPasswordSubtitle: 'أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.',
     emailAddress: 'عنوان البريد الإلكتروني',
     enterEmail: 'أدخل بريدك الإلكتروني',
     sendResetLink: 'إرسال رابط إعادة التعيين',
     sending: 'جاري الإرسال...',
     checkYourEmail: 'تحقق من بريدك الإلكتروني',
     resetInstructions: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى {email}. يرجى التحقق من بريدك الإلكتروني والنقر على الرابط لإعادة تعيين كلمة المرور.',
     backToLogin: 'العودة إلى تسجيل الدخول',
     sendAnotherEmail: 'إرسال بريد إلكتروني آخر',
     didntReceiveEmail: 'لم تستلم البريد الإلكتروني؟ تحقق من مجلد الرسائل غير المرغوب فيها أو اتصل بالدعم.',
     needHelp: 'تحتاج مساعدة؟',
     contactSupport: 'اتصل بالدعم',
     helpCenter: 'مركز المساعدة',
     pleaseEnterEmail: 'يرجى إدخال عنوان البريد الإلكتروني',
     pleaseEnterValidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
     somethingWentWrong: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
     
     // Footer
     poweredBy: 'مدعوم بفخر من إيتيدا',
     itidaDb: 'قاعدة بيانات إيتيدا',
     
     // Registration Page
     companiesRegistrationForm: 'نموذج تسجيل الشركات',
     completeCompanyRegistration: 'أكمل تسجيل شركتك مع إيتيدا',
     companyLegalInformation: 'البيانات القانونية للشركة',
     contactInformation: 'معلومات الاتصال',
     activitiesAttachments: 'الأنشطة والمرفقات',
     previous: 'السابق',
     next: 'التالي',
     submitRegistration: 'إرسال التسجيل',
     
     // Tab 1: Company Legal Information
     companyLegalInfoTitle: 'البيانات القانونية للشركة',
     companyLegalInfoSubtitle: '(كما هو مذكور بالسجل التجاري أو بالبطاقة الضريبية)',
     companyNameEnglish: 'إسم المنشأة الإنجليزي كما هو مذكور بالسجل التجاري',
     companyNameArabic: 'إسم المنشأة العربي كما هو مذكور بالسجل التجاري',
     commercialDenomination: 'السمة التجارية',
     legalType: 'الشكل القانوني للمنشأة',
     selectLegalType: 'اختر الشكل القانوني',
     soleProprietorship: 'منشأة فردية',
     partnership: 'شركة تضامن',
     limitedLiabilityCompany: 'شركة ذات مسؤولية محدودة',
     jointStockCompany: 'شركة مساهمة',
     branch: 'فرع',
     other: 'أخرى',
     registerUsing: 'التسجيل باستخدام',
     commercialRegistryNumber: 'رقم السجل التجاري',
     unifiedCommercialRegistryNumber: 'رقم السجل التجاري الموحد',
     taxRegistryNumber: 'رقم التسجيل الضريبي',
     commercialRegistrationDate: 'تاريخ اصدار السجل',
     noteRegistrationOptions: 'ملاحظة: يجب أن يكون أحد خيارات التسجيل محددا على الأقل',
     
     // Tab 2: Contact Information
     contactInfoTitle: 'معلومات الاتصال',
     contactInfoSubtitle: 'معلومات الاتصال والمدير المسئول',
     companyAddress: 'عنوان الشركة',
     governorate: 'المحافظة',
     selectGovernorate: 'اختر المحافظة',
     districtCity: 'الحي - المدينة',
     streetAddress: 'العنوان',
     companyContactInfo: 'معلومات الاتصال بالشركة',
     companyWebsiteUrl: 'موقع الشركة الإلكتروني',
     officialEmail: 'البريد الإلكتروني الرسمي',
     phoneMobile: 'رقم الموبايل',
     companyHasBranches: 'نعم، للشركة فروع',
     companyRepresentative: 'بيانات المدير المسئول و مقدم الطلب',
     representativeSubtitle: '(كما هو موضح بالسجل التجاري أو توكيل الإدارة)',
     name: 'الإسم',
     title: 'الصفة',
     mobile: 'رقم المحمول',
     nationalId: 'الرقم القومي',
     email: 'البريد الإلكتروني',
     requestApplicant: 'مقدم الطلب',
     companyInCharge: 'المدير المسئول كما هو موضح بالسجل التجارية أو توكيل بالإدارة',
     representative: 'مفوض',
     noteRequiredFields: 'ملاحظة: جميع الحقول المطلوبة يجب ملؤها قبل الانتقال للخطوة التالية',
     
     // Tab 3: Activities & Attachments
     activitiesAttachmentsTitle: 'الأنشطة والمرفقات',
     activitiesAttachmentsSubtitle: 'اختر الأنشطة المطلوبة وارفق المستندات المطلوبة',
     activitiesRequiredForLicensing: 'الأنشطة المطلوب الترخيص بمزاولتها',
     softwareDesignServices: 'خدمات تصميم وإنتاج وتطوير البرمجيات',
     itSystemsServices: 'خدمات تصميم وتطوير وإنتاج وتوريد وتشغيل أنظمة تكنولوجيا المعلومات',
     trustServices: 'خدمات الثقة والتوقيع الإلكتروني',
     websitesPlatformsServices: 'خدمات المواقع والمنصات والمعاملات الإلكترونية باستخدام شبكة الإنترنت',
     electronicsEmbeddedServices: 'خدمات تصميم وتطوير الإلكترونيات والأنظمة المدمجة، وإنتاج الإلكترونيات في مجال تكنولوجيا المعلومات والاتصالات',
     contentDigitizationServices: 'خدمات رقمنة المحتوى التقليدي باستخدام تكنولوجيا المعلومات',
     callCenterBusinessServices: 'خدمات مراكز الاتصال وإدارة الأعمال باستخدام تكنولوجيا المعلومات والاتصالات',
     consultingResearchServices: 'خدمات الاستشارات والبحوث والتطوير وريادة الأعمال في مجال تكنولوجيا المعلومات والاتصالات',
     trainingLearningServices: 'خدمات التدريب والتعلم في مجال تكنولوجيا المعلومات والاتصالات',
     attachments: 'المرفقات',
     attachmentsNote: 'ملاحظة: يتم قبول الصور وملفات PDF فقط بحد أقصى 3 ميجابايت',
     commercialRegisterImage: 'صورة السجل التجاري أو قرار الإشهار',
     taxCardImage: 'صورة البطاقة الضريبية',
     nationalIdImage: 'صورة إثبات الشخصية (الرقم القومي) للمدير المسئول',
     investmentGazetteImage: 'صورة صحيفة الإستثمار أو الشركات أو عقد الشركة',
     declarationUndertakingImage: 'إقرار وتعهد بشأن مزاولة أنشطة تكنولوجيا المعلومات',
     licenseReceipt: 'إستلام الترخيص',
     methodOfLicenseReceipt: 'طريقة إستلام الترخيص',
     selectReceiptMethod: 'اختر طريقة الاستلام',
     postalMail: 'بريد عادي',
     personalPickup: 'استلام شخصي',
     courier: 'ساعي',
     declarationAgreement: 'الإقرار والموافقة',
     declarationText: 'أقر وأتعهد بصحة المستندات المقدمة والتزامي بالقوانين المصرية ذات الصلة، بما في ذلك قوانين التوقيع الإلكتروني وحقوق الملكية الفكرية وحماية البيانات الشخصية ومكافحة الجرائم الإلكترونية. كما أتعهد بمزاولة الأنشطة المرخصة بأمان وأخلاقيات ومسؤولية وشفافية.',
     iAgree: 'أوافق',
     noteDeclarationAgreement: 'ملاحظة: يجب الموافقة على الإقرار والموافقة قبل إرسال الطلب',

     // Additional Benefits
     additionalBenefitsTitle: 'تنظيم تراخيص أنشطة تكنولوجيا المعلومات',
     additionalBenefitsDesc: 'تصدر وكالة تنمية صناعة تكنولوجيا المعلومات (إيتيدا) تراخيص لممارسة الأنشطة المتخصصة في قطاع تكنولوجيا المعلومات والاتصالات لتنظيم قطاع تكنولوجيا المعلومات وتشجيع الاستثمار في هذا المجال الحيوي. تهدف هذه المبادرة إلى دعم نمو السوق وتعزيز بيئة أعمال رقمية حيوية.',
     activitiesEligible: 'الأنشطة المؤهلة للترخيص:',
     eligibleActivities: [
       'خدمات تصميم وإنتاج وتطوير البرمجيات.',
       'خدمات تصميم وتطوير وإنتاج وتوريد وتشغيل أنظمة تكنولوجيا المعلومات.',
       'خدمات المواقع والمنصات والمعاملات الإلكترونية باستخدام الإنترنت.',
       'تصميم وتطوير الإلكترونيات والأنظمة المدمجة، وتصنيع الإلكترونيات في مجال تكنولوجيا المعلومات والاتصالات.',
       'خدمات رقمنة المحتوى التقليدي باستخدام تكنولوجيا المعلومات.',
       'خدمات مراكز الاتصال وإدارة العمليات التجارية باستخدام تكنولوجيا المعلومات والاتصالات.',
       'خدمات الاستشارات والبحوث والتطوير وريادة الأعمال في تكنولوجيا المعلومات والاتصالات.',
       'خدمات التدريب والتعليم في تكنولوجيا المعلومات والاتصالات.'
     ]
  }
}
