import { error, admin, logger, HttpsError } from '../../../config'
import { USER_ROLES } from '../../../constants'
import type { TRequestProps, TResponseProps, TUserType } from './types'
import { EErrorsRegisterProps } from './types'
import { validateRegistration } from './validators'

const registerUser = async (
  request: TRequestProps
): Promise<TResponseProps> => {
  let user: TUserType = null

  try {
    const { email, password } = request.data
    await validateRegistration(email, password)

    user = await admin.auth().createUser({
      email,
      password,
      disabled: false,
    })

    await admin.auth().setCustomUserClaims(user.uid, {
      role: USER_ROLES.USER,
    })

    return { uid: user.uid, email: user.email }
  } catch (err) {
    const errorObj = err as Error
    error('registerUser', {
      errorMessage: errorObj.message,
      errorStack: errorObj.stack,
      errorName: errorObj.name,
    })

    if (user) {
      try {
        await admin.auth().deleteUser(user.uid)
        logger.info('User rollback successful', { uid: user.uid })
      } catch (deleteError) {
        logger.error('Failed to delete user', {
          uid: user.uid,
          error: deleteError,
        })
      }
    }

    if (err instanceof HttpsError) {
      throw new HttpsError(err.code, err.message, err.details)
    }

    throw new HttpsError(EErrorsRegisterProps.CODE, EErrorsRegisterProps.TYPE)
  }
}

export default registerUser
