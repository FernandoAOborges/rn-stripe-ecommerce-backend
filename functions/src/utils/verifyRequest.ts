import { HttpsError, functions } from '../config'

const verifyRequest = async (context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    )
  }

  return {
    userId: context.auth.uid,
    name: context.auth.token.name || 'Usuário sem nome',
    email: context.auth.token.email,
    picture: context.auth.token.picture,
  }
}

export default verifyRequest
