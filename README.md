# React Native Expo Bluetooth Integration with Maps

This is an [Expo](https://expo.dev) project that integrates Bluetooth functionality with an interactive Google Maps interface.

## Features

- 🗺️ Interactive Google Maps interface
- 📍 Location tracking and mapping
- 📱 Cross-platform React Native app
- 🔗 Bluetooth integration capabilities
- 🎨 Modern UI with tab navigation

## Environment Setup

Before running the app, you need to set up your Google Maps API key:

1. Create a `.env` file in the root directory
2. Add your Google Maps API key:
   ```
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. Copy `.env.example` to `.env` and replace the placeholder with your actual API key

**Note**: Never commit your actual API key to version control. The `.env` file is already in `.gitignore`.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
