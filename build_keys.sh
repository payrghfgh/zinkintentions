#!/bin/bash

# Create the js directory if it doesn't exist
mkdir -p js

# Create the firebase-keys.js file using environment variables
cat <<EOF > js/firebase-keys.js
export const firebaseConfig = {
    apiKey: "${FB_API_KEY}",
    authDomain: "${FB_AUTH_DOMAIN}",
    projectId: "${FB_PROJECT_ID}",
    storageBucket: "${FB_STORAGE_BUCKET}",
    messagingSenderId: "${FB_MESSAGING_SENDER_ID}",
    appId: "${FB_APP_ID}"
};
EOF

echo "Firebase keys generated successfully for Netlify build."
