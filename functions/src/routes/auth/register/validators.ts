import { admin, HttpsError } from '../../../config'
import { EErrorsRegisterValidationProps } from './types'

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isValidPassword = (password: string): boolean => password.length >= 6

const emailExists = async (email: string): Promise<boolean> => {
  try {
    await admin.auth().getUserByEmail(email)
    return true
  } catch (error) {
    // @ts-expect-error - This is a known error
    if (error.code === 'auth/user-not-found') return false
    throw error
  }
}

export const validateRegistration = async (
  email: string,
  password: string
): Promise<void> => {
  const errors: Array<{ field: string; message: string }> = []

  if (!email || !password) {
    throw new HttpsError(
      EErrorsRegisterValidationProps.CODE,
      EErrorsRegisterValidationProps.EMAIL_PASSWORD_REQUIRED,
      {
        errors: [
          {
            field: 'general',
            message: 'Email and password are required.',
          },
        ],
      }
    )
  }

  if (!isValidEmail(email)) {
    errors.push({
      field: 'email',
      message: EErrorsRegisterValidationProps.INVALID_EMAIL,
    })
  }

  if (!isValidPassword(password)) {
    errors.push({
      field: 'password',
      message: EErrorsRegisterValidationProps.PASSWORD_LENGTH,
    })
  }

  if (errors.length === 0 && (await emailExists(email))) {
    errors.push({
      field: 'email',
      message: EErrorsRegisterValidationProps.EMAIL_ALREADY_REGISTERED,
    })
  }

  if (errors.length > 0) {
    throw new HttpsError(
      EErrorsRegisterValidationProps.CODE,
      EErrorsRegisterValidationProps.VALIDATION_ERRORS,
      errors.map((value) => value.message).join(', ')
    )
  }
}
