import { admin, functions, logger, FieldValue } from '../../config'
import { USERS_COLLECTION } from '../../constants'

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    try {
      await admin.firestore().collection(USERS_COLLECTION).doc(user.uid).set({
        email: user.email,
        created_at: FieldValue.serverTimestamp(),
      })
      logger.info(`Document for user ${user.uid} created successfully.`)
    } catch (error) {
      logger.error(`Error creating document for user ${user.uid}:`, error)
    }
  })

export const deleteUserDocument = functions.auth
  .user()
  .onDelete(async (user) => {
    try {
      await admin
        .firestore()
        .collection(USERS_COLLECTION)
        .doc(user.uid)
        .delete()
      logger.info(`Document for user ${user.uid} deleted successfully.`)
    } catch (error) {
      logger.error(`Error deleting document for user ${user.uid}:`, error)
    }
  })
