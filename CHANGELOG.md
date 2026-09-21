# Changelog

## v1.0.32 — 2026-09-15

- Published the Medivac One Android APK on the free-track GitHub release.
- Added direct APK download with optional privacy-conscious `apk_download` analytics.
- Added SHA-256 checksum display and one-click copy action.
- Added Android compatibility guidance for phones and tablets, Android 8.0+, and free storage requirements.
- Added a QR code for opening the download page on mobile devices.
- Added release notes and a visible changelog section.
- Added a manually triggered GitHub Actions workflow for packaging future APK URLs with a checksum manifest.
- Added a support and troubleshooting FAQ covering blocked installs, storage, downloads, and issue reporting.
- Added automated release validation for APK ZIP integrity, Android manifest, DEX, signature metadata, size, and checksum.
- Added a device compatibility matrix for phones, tablets, architectures, storage, and Play Store independence.
- Added official Android `apksigner` verification to the GitHub Actions release gate using Android Build Tools 35.0.0.
- Verified the current APK with APK Signature Scheme v2 and recorded its signer fingerprint.
- Confirmed native library coverage for `arm64-v8a` and `armeabi-v7a`.

### Current artifact

- Version: `v1.0.32`
- Size: `54.6 MB`
- SHA-256: `4bb03877a79c02310a074018e26d7a090d713769b264b4918cfd282d99822a0c`
- Signing certificate SHA-256: `e2372158de8c61211222da725b41d6e2459c459153c476463617bcb2731d3fbf`
- APK signature: v2 verified; signer: `CN=Manus App`
- Native ABIs: `arm64-v8a`, `armeabi-v7a`

## JEDI//HUB marketplace update — 2026-09-22

- Rescoped the landing page into a futuristic free-track marketplace and control hub.
- Added real GitHub release download cards for Medivac One and MediVacAlpha.
- Added source-only entries for authorized JEDI ecosystem repositories, clearly marked when no public release asset exists.
- Added local registration UX, install/test triggers, release verification surfaces, and a payment connector status gate.
- Uploaded the newly supplied APK as a byte-identical release mirror; the SHA-256 remains unchanged.
