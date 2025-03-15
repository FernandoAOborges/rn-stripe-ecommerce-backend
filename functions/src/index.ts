import { onCall } from 'firebase-functions/v2/https'
import { registerUser } from './routes/auth'
import { createUserDocument, deleteUserDocument } from './triggers'

const CONFIG = {
  cors: true,
  enforceAppCheck: false,
  timeoutSeconds: 30,
}

// Auth
exports.registerUser = onCall({ ...CONFIG }, (request) => registerUser(request))

// Triggers - Firestore
exports.createUserDocument = createUserDocument
exports.deleteUserDocument = deleteUserDocument
