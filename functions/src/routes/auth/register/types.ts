import type { admin, https } from '../../../config'

export interface IRegisterRequestProps {
  email: string
  password: string
}

export interface IRegisterResponseProps {
  uid: string
  email?: string
}

export enum EErrorsRegisterProps {
  TYPE = 'Error registering user',
  CODE = 'internal',
}

export enum EErrorsRegisterValidationProps {
  CODE = 'invalid-argument',
  EMAIL_PASSWORD_REQUIRED = 'Email and password are required',
  INVALID_EMAIL = 'Invalid email format',
  PASSWORD_LENGTH = 'Password must be at least 6 characters long',
  EMAIL_ALREADY_REGISTERED = 'Email is already registered',
  VALIDATION_ERRORS = 'Validation errors',
}

export type TUserType = admin.auth.UserRecord | null

export type TRequestProps = https.CallableRequest<IRegisterRequestProps>
export type TResponseProps = Promise<IRegisterResponseProps>
