# Play Position:

<div style="width: 100%; display: flex; justify-content: center; align-items: center; margin: 30px 5px;">
	<img src="assets/images/logo1024x1024-white-bg.jpg" style="max-width: 500px; border-radius:100rem" width="100%" >
</div>

# 1. Introduction

Play Position is cross-platform mobile application that allows users to create and join local soccer games. The app is designed to help users find local soccer games and players to play with. Users can create games, join games, and view games in their area.

[Play Position](https://play-position-96c34.web.app)

# 2. Features

- Create a game
- Join a game
- View games in your area
- View game details
- Configure search radius

# 3. Technologies

- React Native
- Expo
- Firebase (Web hosting)
- Supabase (Database and Authentication)
- Google Maps API
- Tailwind CSS (Web) with NativeWind for (Native)

# 4. Installation

1. Clone the repository

```bash
git clone https://github.com/amineNouabi/play-position.git
```

2. Install dependencies

```bash
cd play-position
pnpm i
```

3. Create a Supabase account and create a new project.
4. Create a Google Cloud Platform account and enable the Google Maps API and download the `google-services.json` file in the root directory.
5. Create a `.env` file in the root directory like `.env.example` and fill in the required environment variables.

# 5. Usage

1. Start the metro bundler and the app

```bash
pnpm start

# or

pnpm dev:web # for web
pnpm android # for android
pnpm ios # for ios
```

2. Connect to the app using the Expo Go app on your phone or an emulator on your computer or a development build.

# 5. Contributors

- [Ahmed Amine Nouabi](https://github.com/amineNouabi)
- [Youssef Acherki]()
