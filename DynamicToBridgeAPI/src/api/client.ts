/* Simple API client with configurable base URL via Vite env */

const apiBaseUrl: string = (import.meta as any).env?.VITE_API_BASE_URL || ''

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  token?: string | null
}

export async function apiFetch<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const url = `${apiBaseUrl}${path}`
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...options.headers,
  }
  if (options.body !== undefined) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
  }
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    // Do not send credentials by default to avoid CORS failures with "*" origins
  })

  if (!response.ok) {
    let message = `HTTP ${response.status}`
    try {
      const data = await response.json()
      message = (data && (data.message || data.error)) || message
    } catch (_) {
      // ignore json parse errors
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as unknown as TResponse
  }

  return (await response.json()) as TResponse
}

// Auth endpoints - adjust paths to match BridgeAPI once confirmed
export interface LoginRequest { login: string; password: string }
export interface LoginResponse { token?: string; accessToken?: string; user?: unknown }

export async function login(request: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/public/auth/login', {
    method: 'POST',
    body: request,
  })
}

export async function forgotPassword(email: string): Promise<void> {
  // Backends may not have this; prefer recover() where available
  await apiFetch<void>('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  })
}

// Recover (classic BridgeAPI): POST /api/auth/recover { method, value }
export interface RecoverRequest { method: 'login' | 'cr' | 'license'; value: string }
export interface RecoverResponse { ok: boolean; email?: string }

export async function recover(request: RecoverRequest): Promise<RecoverResponse> {
  return apiFetch<RecoverResponse>('/public/auth/recover', {
    method: 'POST',
    body: request,
  })
}

// Company by email: GET /api/companyByEmail?email=
export interface ContactInfo {
  id: string
  jobTitle?: string
  mobilePhone?: string
  emailAddress1?: string
  ldv_Email2?: string
  firstName?: string
  lastName?: string
  fullName?: string
  ldv_NationalID?: string
  ldv_NIDIssueDate?: string
  ldv_NIDIssuedFrom?: string
}

export interface CompanyInfo {
  id: string
  accountId: string
  englishName?: string
  commercialDenomination?: string
  arabicName?: string
  commercialRegistrationNumber?: string
  crDate?: string
  office?: string
  classCode?: number
  ucr?: string
  establishmentYear?: number
  taxFileNumber?: string
  email?: string
  ldv_IPRLicenseNumber?: string
  ldv_itidacustomernumber?: string
  ldv_companyoverview?: string
  ldv_legaltypecode?: number
  ldv_legaltypecode_displayname?: string
  primaryContact?: {
    id: string
    name: string
    jobTitle?: string
    mobilePhone?: string
    emailAddress1?: string
    ldv_Email2?: string
    firstName?: string
    lastName?: string
    fullName?: string
    ldv_NationalID?: string
    ldv_NIDIssueDate?: string
    ldv_NIDIssuedFrom?: string
  }
  companyHead?: {
    id: string
    name: string
    jobTitle?: string
    mobilePhone?: string
    emailAddress1?: string
    ldv_Email2?: string
    firstName?: string
    lastName?: string
    fullName?: string
    ldv_NationalID?: string
    ldv_NIDIssueDate?: string
    ldv_NIDIssuedFrom?: string
  }
  companyRepresentative?: {
    id: string
    name: string
    jobTitle?: string
    mobilePhone?: string
    emailAddress1?: string
    ldv_Email2?: string
    firstName?: string
    lastName?: string
    fullName?: string
    ldv_NationalID?: string
    ldv_NIDIssueDate?: string
    ldv_NIDIssuedFrom?: string
  }
  contacts?: ContactInfo[]
  ownersStakeholders?: Array<{
    ldv_name?: string | null
    ldv_Equitypercentage?: number | null
    ldv_ownertypecode?: number | null
    ldv_nationalid?: string | null
    ldv_position?: string | null
  }>
}

// Reset password with OTP
export interface ResetPasswordRequest { login: string; code: string; newPassword: string }
export async function resetPassword(request: ResetPasswordRequest): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>('/public/auth/reset-password', {
    method: 'POST',
    body: request,
  })
}

export async function companyByEmail(email: string): Promise<{ value: CompanyInfo[] }> {
  const encoded = encodeURIComponent(email)
  return apiFetch<{ value: CompanyInfo[] }>(`/api/companyByEmail?email=${encoded}`)
}

// Update company information
export interface UpdateCompanyRequest {
  englishName?: string | null
  arabicName?: string | null
  commercialDenomination?: string | null
  commercialRegistrationNumber?: string | null
  crDate?: string | null
  establishmentYear?: number | null
  taxFileNumber?: string | null
  ldv_IPRLicenseNumber?: string | null
}

export async function updateCompany(accountId: string, updates: UpdateCompanyRequest): Promise<CompanyInfo> {
  return apiFetch<CompanyInfo>(`/api/company/${accountId}`, {
    method: 'PUT',
    body: updates,
  })
}

// Update contact information
export interface UpdateContactRequest {
  jobTitle?: string | null
  mobilePhone?: string | null
  emailAddress1?: string | null
  ldv_Email2?: string | null
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  ldv_NationalID?: string | null
  ldv_NIDIssueDate?: string | null
  ldv_NIDIssuedFrom?: string | null
}

export async function updateContact(accountId: string, contactId: string, updates: UpdateContactRequest): Promise<ContactInfo> {
  return apiFetch<ContactInfo>(`/api/company/${accountId}/contacts/${contactId}`, {
    method: 'PUT',
    body: updates,
  })
}

// Create contact
export interface CreateContactRequest extends UpdateContactRequest {
  fullName?: string | null
  setAsPrimary?: boolean
  setAsCompanyHead?: boolean
  setAsRepresentative?: boolean
}

export async function createContact(accountId: string, payload: CreateContactRequest): Promise<ContactInfo> {
  return apiFetch<ContactInfo>(`/api/company/${accountId}/contacts`, {
    method: 'POST',
    body: payload,
  })
}

export async function deleteContact(accountId: string, contactId: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/company/${accountId}/contacts/${contactId}`, {
    method: 'DELETE'
  })
}

