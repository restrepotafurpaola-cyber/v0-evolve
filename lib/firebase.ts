import { initializeApp, FirebaseApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getDatabase, ref as firebaseRef, set as firebaseSet, push as firebasePush, update as firebaseUpdate, Database } from 'firebase/database'

declare global {
  interface Window {
    __appCheckInitialized?: boolean
  }
}

const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

// Firebase es opcional - si no hay configuración, la app funciona sin tracking
let app: FirebaseApp | null = null
let database: Database | null = null

if (databaseURL) {
  const firebaseConfig = {
    databaseURL,
  }

  app = initializeApp(firebaseConfig)
  database = getDatabase(app)

  const initializeClientAppCheck = () => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.__appCheckInitialized) {
      return
    }

    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY

    if (!recaptchaKey || !app) {
      console.warn('Firebase App Check not initialized: missing NEXT_PUBLIC_RECAPTCHA_KEY')
      return
    }

    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaKey),
        isTokenAutoRefreshEnabled: true,
      })
      window.__appCheckInitialized = true
    } catch (error) {
      console.warn('Firebase App Check initialization failed:', error)
    }
  }

  initializeClientAppCheck()
} else {
  console.warn('Firebase not configured: NEXT_PUBLIC_FIREBASE_DATABASE_URL not set. Running in offline mode.')
}

// Funciones wrapper que funcionan con o sin Firebase
const ref = (path: string) => {
  if (database) {
    return firebaseRef(database, path)
  }
  return null
}

const set = async (reference: ReturnType<typeof ref>, data: unknown) => {
  if (reference && database) {
    return firebaseSet(reference, data)
  }
  // En modo offline, simplemente no hacemos nada
  return Promise.resolve()
}

const push = (reference: ReturnType<typeof ref>) => {
  if (reference && database) {
    return firebasePush(reference)
  }
  return null
}

const update = async (reference: ReturnType<typeof ref>, data: unknown) => {
  if (reference && database) {
    return firebaseUpdate(reference, data)
  }
  return Promise.resolve()
}

export { database, ref, set, push, update }
