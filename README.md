# create-my-pwa

`create-my-pwa` generates a standard React + TypeScript + Vite PWA with optional Firebase services and Android TWA configuration.

## Install and use anywhere

The package name is **create-my-pwa**. After it is published to npm, users can run it without installing it permanently:

```bash
npx create-my-pwa my-app
```

Or install it globally:

```bash
npm install --global create-my-pwa
create-my-pwa my-app
```

The package also works with pnpm and yarn:

```bash
pnpm dlx create-my-pwa my-app
yarn create my-pwa my-app
```

The generator creates the project in the current directory. The target directory must not already exist.

## Publish a new version

Only the package owner should run these commands. First create an npm account, verify the package name is available, and log in:

```bash
npm login
npm whoami
```

Run the local checks and inspect the exact files that will be uploaded:

```bash
npm run check
npm test
npm pack --dry-run
```

Publish the public package:

```bash
npm publish --access public
```

For later releases, update `version` in `package.json` or use npm versioning, then publish again:

```bash
npm version patch
npm publish
```

Never publish `.env`, Firebase credentials, generated test projects, or private signing keys. The `files` field in `package.json` limits the npm package to `bin`, `src`, and this README.

## 1. Prerequisites

Install Node.js 18+, npm, and the Firebase CLI if Firebase features are selected:

```bash
npm install -g firebase-tools
firebase login
```

For Android TWA work, also install Java, Android Studio/SDK, and Bubblewrap:

```bash
npm install -g @bubblewrap/cli
```

## 2. Create an application

From this project directory or an installed copy:

```bash
npm start -- my-app
```

Answer the prompts for Firebase, authentication, Firestore, Storage, Functions, Hosting, emulators, and Android TWA support.

To accept the defaults without prompts:

```bash
npm start -- my-app --yes
```

Then enter the generated project and install dependencies:

```bash
cd my-app
npm install
```

## 3. Configure Firebase

1. Open the [Firebase Console](https://console.firebase.google.com/), choose **Create a project**, and complete setup.
2. Open **Project settings**.
3. Under **Your apps**, choose the Web icon (`</>`), register an app, and open **SDK setup and configuration**.
4. Copy the web app configuration values.
5. Enable the selected products: Authentication providers under **Authentication → Sign-in method**, Firestore under **Firestore Database**, and Storage under **Storage**.
6. If using Functions, confirm billing is enabled when required by Firebase.

Connect the local directory to the Firebase project:

```bash
firebase use --add
```

Select the project and use the alias `default`. If Firebase configuration was not generated, initialize it with:

```bash
firebase init
```

Select only the services you intend to use.

## 4. Create and fill `.env`

Copy the generated template:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Fill `.env` with the exact values copied from Firebase:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

The `VITE_` prefix is required by Vite. Do not commit `.env`; it is ignored by Git. Firebase web config values are client-side identifiers, so protect the project with Authentication, Firestore rules, Storage rules, and App Check.

## 5. Run and validate

```bash
npm run dev
```

Open the local URL printed by Vite and test the generated app and Firebase flows. Create a production build with:

```bash
npm run build
npm run preview
```

## 6. Review security rules

Generated Firestore and Storage rules are intentionally restrictive. Update them for your data model before deployment, and never deploy broad public read/write rules.

```bash
firebase deploy --only firestore:rules,storage
```

## 7. Firebase emulators (optional)

If Emulator Suite was selected:

```bash
npm run firebase:emulate
```

Configure the app to connect to the emulators during local development. Emulator testing does not replace testing against the deployed project.

## 8. Deploy the web app

After selecting the correct project with `firebase use --add`:

```bash
npm run deploy          # build and deploy Hosting, rules, and configured services
npm run deploy:web      # build and deploy Hosting only
npm run deploy:functions
```

Verify the deployed URL, authentication providers, Firestore, Storage, and Functions in the Firebase Console.

## 9. Android TWA (optional)

The generator creates `android/twa.config.json` and an `assetlinks.json` template. Initialize Bubblewrap after the PWA is deployed:

1. Deploy the web app.
2. Set the deployed manifest URL.

Windows PowerShell:

```powershell
$env:PWA_MANIFEST_URL = "https://your-project.web.app/manifest.webmanifest"
```

macOS/Linux:

```bash
export PWA_MANIFEST_URL=https://your-project.web.app/manifest.webmanifest
```

3. Run `npm run android:init`.
4. Configure Android signing and copy its SHA-256 certificate fingerprint into `public/.well-known/assetlinks.json`, replacing `REPLACE_WITH_SHA256_FINGERPRINT`.
5. Deploy the updated web app so the file is available at `/.well-known/assetlinks.json`.
6. Build the TWA with `npm run android:build`.

Keep Android signing keys private and backed up.

## Useful commands

```bash
npm run dev
npm run build
npm run preview
npm run firebase:emulate
npm run deploy
npm run deploy:web
npm run deploy:functions
npm run android:init
npm run android:build
```

Generated projects remain standard React, Vite, Firebase, and Bubblewrap code. Firebase values are supplied through `.env` and are never hard-coded by the generator.
