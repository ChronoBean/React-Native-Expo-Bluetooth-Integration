# BLE‑Mapper 📡🗺️

This repository contains the **Expo React Native** project (iOS & Android) plus server‑side helpers for storing and visualizing scans.
This is a proof of concept (POC) app that places nearby discovered ble peripherals on a maps and represents those RSSI (received signal strength indicator) as markers using a Deterministic Pseudo-Random Scatter approach in a Polar Coordinate System.

The BLE scanning occurs at a 10 seconds interval to search for new available devices.

---

## Features
* **Passive BLE scanning** — captures RSSI, UUID, and _(if available)_ the device name.  
* **Heat‑map visualisation** — pins every scan to the user’s geolocation with a colour‑coded intensity layer.  
* **Offline‑first** — queues scans locally when network is unavailable, then syncs once online.  
* **Cross‑platform** — runs natively on iOS and Android from a single codebase.  
* **Modular data layer** — easily swap the backend (Firebase, Supabase, REST) without touching scan logic.  


---

## Quick Start

### iOS (Local Build)

> Tested with macOS 14 & Xcode 15.2

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Generate the native iOS project**

   ```bash
   npx expo prebuild --platform ios
   ```

3. **Open the project in Xcode**

   ```bash
   open ios/*.xcworkspace
   ```

4. In Xcode **Signing & Capabilities**, choose your **Team** and ensure the bundle ID is unique.  
5. Plug in your iPhone via USB.  
6. In the device selector, pick your iPhone (or a simulator).  
7. **Run** ▸ to build & install the app.  
8. Alternatively, from the terminal you can:

   ```bash
   npx expo run:ios --device
   ```

   and select your phone from the list.

---

### Android (Local or EAS Build)

#### Option A — Local device / emulator

1. Start an Android emulator **OR** enable USB‑debugging on a physical device.  
2. From the project root:

   ```bash
   npx expo start --dev-client
   ```

3. In a separate shell, build & install the dev client:

   ```bash
   npx expo run:android
   ```

4. Scan the Metro QR code in your terminal (or the Expo DevTools UI) to launch.

#### Option B — EAS Cloud Build

1. Log in to Expo:

   ```bash
   eas login
   ```

2. Kick off a development build:

   ```bash
   eas build --platform android --profile development
   ```

   * The first run creates `eas.json` and prompts for keystore / package name.
3. When the build finishes, download the `.apk` or `.aab` from the Expo dashboard.  
4. **Scan** the QR code in the _Expo Development Server_ tab (or sideload the file) to install.

> **Tip:** Development profile uses _debug_ signing and enables live reloading; switch to `release` or `production` when you’re ready for the Play Store.

---

## How It Works

1. **BLE Scan**  
   The app subscribes to advertisement packets using `react-native-ble-manager`.  
2. **Parsing**  
   We extract:
   * `id` (MAC or pseudo‑ID on iOS)  
   * `rssi` (signal strength, ~dBm)  
   * `advertising.manufacturerData` → decode manufacturer‑specific payloads  
3. **Geo‑tagging**  
   On every scan, we fetch the device’s GPS coords via `expo-location`.  
4. **Local DB**  
   Scans are cached in SQLite (via _expo‑sqlite_) until successfully POSTed to `/api/scans`.  
5. **Heat‑map rendering**  
   In the **Map** screen we cluster points and generate a colour ramp by RSSI.  
   _> Green ≈ strong, Red ≈ weak._

---

## BLE Payload Schema

On screen we show only **RSSI**, **UUID**, and **Name** (if present).  
A raw scan looks like:

```ts
const bleResponsePayload = [
  {
    advertising: {
      manufacturerData: {
        '0006': {
          bytes: [1, 9, 32, 34, 49, 255, 185, 248, /* … */ 84],
          data: 'AQkgIjH/ufh/2vDXy4Dx7zZoFcsOv3+Uxk1U',
          CDVType: 'ArrayBuffer'
        }
      },
      txPowerLevel: -2147483648,
      serviceData: {},
      isConnectable: false,
      serviceUUIDs: [],
      manufacturerRawData: { /* … */ },
      rawData: { /* … */}
    },
    rssi: -88,
    id: '0F:B3:9B:66:41:F7',
    name: null
  }
];
```

| Field | Description |
|-------|-------------|
| `id`  | Device MAC (Android) or UUID (iOS) |
| `rssi` | Signal strength in dBm (≈ ‑100 = weak … ‑30 = strong) |
| `advertising.manufacturerData` | Bytes & base64‑encoded blob with vendor‑specific payload |
| `name` | Advertised device name (may be `null`) |

---

## Configuration

Quick test: just copy and paste a Google Maps API Key into app.json lines 19 and 34

Create an `.env` in the project root:

```bash
API_URL=https://your‑backend.example.com
MAPBOX_TOKEN=<optional-mapbox-gl-token>
BLE_SCAN_INTERVAL=250   # ms
```

*All env‑vars are injected by **expo‑config‑plugins** at build time.*


