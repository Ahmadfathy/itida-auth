# Images Folder

This folder contains static images for the ITIDA application.

## Logo Image

Place your ITIDA logo image here as `itida-logo.png`

**Recommended specifications:**
- Format: PNG, JPG, or SVG
- Size: 32x32 pixels or larger (will be scaled to fit)
- Background: Transparent or white background works best
- File name: `itida-logo.png`

## Flag Images

Place your flag images here for language switching:

### `ar.png` - Arabic/Egyptian Flag
- **Usage**: Shown when current language is English (click to switch to Arabic)
- **Recommended size**: 24x16 pixels (w-6 h-4)
- **Format**: PNG with transparent background preferred

### `en.png` - English Flag  
- **Usage**: Shown when current language is Arabic (click to switch to English)
- **Recommended size**: 24x16 pixels (w-6 h-4)
- **Format**: PNG with transparent background preferred

## Current Usage

The logo is used in:
- Header component (clickable, navigates to home)
- Footer component (clickable, navigates to home)
- ForgotPassword component

The flag images are used in:
- Header component (language toggle button)

## Fallback

If the logo image fails to load, the component will automatically fall back to displaying the letter "I" in the ITIDA brand colors.
