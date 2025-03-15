import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'
import { FieldValue, Timestamp, FieldPath } from 'firebase-admin/firestore'
import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https'
import { log, error } from 'firebase-functions/logger'
import { getAppCheck } from 'firebase-admin/app-check'
import { https, logger } from 'firebase-functions/v2'
import {
  onDocumentCreated,
  onDocumentDeleted,
} from 'firebase-functions/v2/firestore'

import serviceAccount from './serviceAccountKey.json'

const serviceAccountCredentials = serviceAccount as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredentials),
  storageBucket: 'rnstripefer2025.firebasestorage.app',
})

const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage()
const messaging = admin.messaging()

export {
  db,
  functions,
  auth,
  storage,
  messaging,
  admin,
  FieldValue,
  Timestamp,
  FieldPath,
  onCall,
  HttpsError,
  log,
  error,
  getAppCheck,
  onRequest,
  https,
  onDocumentCreated,
  onDocumentDeleted,
  logger,
}
