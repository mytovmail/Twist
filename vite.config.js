import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // הגדרת הבסיס - החליפי את 'YOUR_REPO_NAME' בשם המאגר שלך בגיטהאב
  // אם האתר ירוץ על הדומיין הראשי (username.github.io), השאירי רק '/'
base: process.env.NODE_ENV === 'production' ? '/Twist/' : '/',
  logLevel: 'error',
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ]
});
