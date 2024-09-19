FROM node:18

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the mobile code
COPY . .

# Copy shared code
COPY ../shared ./src/shared

# Install global dependencies
RUN npm install -g react-native-cli

# Build the app (this is a placeholder, actual build process may vary)
RUN react-native bundle --entry-file index.js --platform android --dev false --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# You would typically build the APK here, but that requires the Android SDK
# For iOS, you'd need to run this on a macOS machine with Xcode

CMD ["echo", "Mobile app bundled. Further steps (like creating APK) should be done in CI/CD pipeline."]