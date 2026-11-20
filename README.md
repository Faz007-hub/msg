# SORRY MOTU! ❤️🥺
> A Complete Animated, Emotional & Interactive Apology Website for My Sister from Bhaiyoo.

Built with **pure HTML5, CSS3, and Vanilla JavaScript** — lightweight, mobile-first responsive, fast, zero heavy frameworks, and ready for instant **Vercel deployment**.

---

## 🌟 Table of Contents
1. [Project Overview & Sibling World](#project-overview--sibling-world)
2. [Project Structure](#project-structure)
3. [How to Run Locally](#how-to-run-locally)
4. [How to Deploy to Vercel](#how-to-deploy-to-vercel)
5. [How to Replace the Generated Voice with Your Own Voice](#how-to-replace-the-generated-voice-with-your-own-voice)
6. [How to Configure WhatsApp](#how-to-configure-whatsapp)
7. [How to Configure EmailJS for Direct Replies](#how-to-configure-emailjs-for-direct-replies)
8. [Where to Replace Character Illustrations](#where-to-replace-character-illustrations)
9. [How to Customize Sound Effects & Music](#how-to-customize-sound-effects--music)
10. [Website Screen Flow & Surprises](#website-screen-flow--surprises)

---

## 🌸 Project Overview & Sibling World

This website is a handcrafted digital experience designed to make your sister smile, laugh, feel emotional, and forgive her brother:
- **Consistent Sibling Characters**: Bhaiyoo (cute anime-style boy in sky-blue hoodie) and Motu (cute anime-style girl with twin buns, pink ribbons, and rosy cheeks).
- **Interactive 3D Envelope**: Realistic wax seal breaking, flap opening, and letter slide-out with heart bursts.
- **Voice System**: Actual generated voice saying affectionate *"Sorry Motu!"* with waveform animation and one-tap voice mode switching.
- **Complete Unedited Apology Letters**: Part 1 (the honest explanation of the job message and sickness) and Part 2 (how much you miss teasing her and her pranks).
- **Secret Hidden Heart Surprise**: A discoverable glowing heart revealing a secret cheeky message, followed by Bhaiyoo's warm open-arms hug scene.
- **3D Apology Cake**: Multi-layer animated cake with sequentially lighting candles and the iconic *"Warna Aptech ajaounga lekar cake!"* joke.
- **Interactive Forgiveness Decision**:
  - `Haan, Maaf Kiya! ❤️` &rarr; Grand fireworks, confetti cannon, dancing characters.
  - `Nahi! 😤` &rarr; Bhaiyoo crying cartoon waterfall tears with puppy eyes pleading for one more chance.
  - `Abhi thora waqt chahiye ❤️` &rarr; Warm, respectful message that never pressures her.
- **Unblock Request & Actions**: One-click WhatsApp message button and clipboard copy button.
- **Sister's Reply Box**: Sends her response directly to your email (`fazulisalm61@gmail.com`) via EmailJS with an automatic mailto fallback.

---

## 📁 Project Structure

```text
/
├── index.html                  # All 9 interactive screens & modals
├── style.css                   # Mobile-first pastel theme, 3D animations, glassmorphism
├── script.js                   # Navigation engine, voice switcher, particle canvas & EmailJS
├── vercel.json                 # Vercel static routing & caching configuration
├── README.md                   # Complete documentation & setup instructions
└── assets/
    ├── audio/
    │   ├── sorry-motu-generated.mp3   # Default generated "Sorry Motu!" voice
    │   ├── sorry-motu-custom.mp3      # Slot for your own custom recording
    │   ├── background-music.mp3       # Soft looping music box melody
    │   ├── envelope-open.mp3          # Magical paper opening chime
    │   └── celebration.mp3           # Grand celebration fanfare
    ├── characters/
    │   ├── bhaiyoo-placard.svg        # Bhaiyoo holding SORRY MOTU placard
    │   ├── siblings-intro.svg         # Bhaiyoo pleading & Motu pouting
    │   ├── bhaiyoo-letter.svg         # Bhaiyoo listening beside letter
    │   ├── bhaiyoo-secret.svg         # Bhaiyoo secret winking "shh"
    │   ├── bhaiyoo-hug.svg            # Bhaiyoo open arms for hug
    │   ├── bhaiyoo-cake.svg           # Bhaiyoo offering apology cake
    │   ├── motu-react-cake.svg        # Motu delighted at cake
    │   ├── bhaiyoo-sad.svg            # Bhaiyoo sad puppy eyes
    │   ├── siblings-celebration.svg   # Bhaiyoo & Motu dancing happily
    │   └── siblings-forever.svg       # Sibling bond holding giant heart
    └── images/
```

---

## 💻 How to Run Locally

Because this project uses vanilla HTML, CSS, and JavaScript, you can run it with any local server in seconds:

### Option 1: Python HTTP Server (Fastest)
Open your terminal in the project folder and run:
```bash
python -m http.server 8000
```
Open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click on `index.html`.
3. Click **"Open with Live Server"**.

### Option 3: Node `serve` or `npx http-server`
```bash
npx serve .
```

---

## 🚀 How to Deploy to Vercel

The project is 100% static and includes `vercel.json` for optimal performance.

### Method 1: Deploy with Vercel CLI (1-Minute)
1. Install the Vercel CLI (if not installed):
   ```bash
   npm install -g vercel
   ```
2. In the project folder, simply run:
   ```bash
   vercel
   ```
3. Follow the prompts (hit `Enter` to accept defaults). Your live URL will be ready immediately!
4. For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Keep the Framework Preset as **Other** (it's pure HTML/CSS/JS).
5. Click **Deploy**. Your custom link (e.g. `sorry-motu.vercel.app`) is live!

---

## 🎙️ How to Replace the Generated Voice with Your Own Voice

The website comes with an active generated voice (`assets/audio/sorry-motu-generated.mp3`) that works immediately. When you are ready to replace it with your own voice:

1. **Record your voice**:
   - Use your phone's voice recorder or microphone.
   - Say: *"Sorry Motu!"* or whatever sweet message you want.
   - Save the file as an MP3.
2. **Place the file**:
   - Copy your recorded audio file into:
     ```text
     assets/audio/sorry-motu-custom.mp3
     ```
3. **Switch Voice Mode in `script.js`**:
   - Open `script.js`.
   - At the very top (lines 20-25), look for:
     ```javascript
     const VOICE_MODE = "generated";
     ```
   - Change it to:
     ```javascript
     const VOICE_MODE = "custom";
     ```
4. Save `script.js`. The website will now automatically play your real recorded voice on Screen 2 and when Motu taps the replay button!

> **Note**: You do not need to touch any HTML or CSS files. You can switch between `"generated"` and `"custom"` anytime!

---

## 💬 How to Configure WhatsApp

On Screen 8 (Grand Celebration), Motu can tap **"Send Bhaiyoo a Message 💌"** to send the pre-filled message:
*"Bhai, maaf kar diya. ❤️"*

To attach your WhatsApp number:
1. Open `script.js`.
2. Look for lines 38-40:
   ```javascript
   const WHATSAPP_PHONE_NUMBER = ""; // e.g. "923001234567"
   ```
3. Enter your phone number with your country code (do not include `+` or spaces or dashes).
   - Example for Pakistan: `"923001234567"`
   - Example for India: `"919876543210"`
4. If you leave it empty (`""`), WhatsApp will automatically open and let her select your contact from her chat list!

---

## 📧 How to Configure EmailJS for Direct Replies

On Screen 9, Motu has a message box where she can type a response to you. To receive her message directly at `fazulisalm61@gmail.com`:

1. Go to [emailjs.com](https://www.emailjs.com/) and create a free account.
2. Connect your Gmail (`fazulisalm61@gmail.com`) as an **Email Service** (copy your `Service ID`).
3. Create an **Email Template** with these variables:
   - `{{to_email}}` &rarr; `fazulisalm61@gmail.com`
   - `{{from_name}}` &rarr; Motu ❤️
   - `{{message}}` &rarr; Sister's response
   - `{{timestamp}}` &rarr; Date & time
   - Copy your `Template ID`.
4. Go to **Account Settings** and copy your `Public Key`.
5. Open `script.js` and paste your keys in `EMAILJS_CONFIG`:
   ```javascript
   const EMAILJS_CONFIG = {
     SERVICE_ID: "your_service_id_here",
     TEMPLATE_ID: "your_template_id_here",
     PUBLIC_KEY: "your_public_key_here",
     FALLBACK_EMAIL: "fazulisalm61@gmail.com",
     WEBSITE_TITLE: "SORRY MOTU! 🥺❤️"
   };
   ```

> **Automatic Mailto Fallback**: If EmailJS keys are not yet configured or an ad-blocker blocks third-party scripts, the form automatically falls back to opening her mail client pre-addressed to `fazulisalm61@gmail.com`. No message is ever lost!

---

## 🎨 Where to Replace Character Illustrations

All character illustrations are located in `assets/characters/`. They are custom SVG files crafted with identical color codes, chibi proportions, and hair details:
- `bhaiyoo-placard.svg`: Bhaiyoo holding the pink SORRY MOTU placard.
- `siblings-intro.svg`: Pleading Bhaiyoo and pouting Motu side-by-side.
- `bhaiyoo-letter.svg`: Bhaiyoo sitting attentively next to the apology letter.
- `bhaiyoo-secret.svg`: Cheeky Bhaiyoo with finger to lips (*"Shhh..."*).
- `bhaiyoo-hug.svg`: Bhaiyoo with open arms ready for a hug.
- `bhaiyoo-cake.svg`: Bhaiyoo presenting the cake.
- `motu-react-cake.svg`: Motu pleasantly surprised and drooling over the cake.
- `bhaiyoo-sad.svg`: Bhaiyoo with puppy eyes and cartoon tears.
- `siblings-celebration.svg`: Both characters dancing happily.
- `siblings-forever.svg`: Both characters smiling and holding a giant heart.

If you ever want to replace any character with your own drawings or custom images:
1. Save your custom artwork with the exact same filename into `assets/characters/`.
2. Both `.svg` and `.png` are supported. If using `.png`, simply update the `src` attribute in `index.html`.

---

## 🎵 How to Customize Sound Effects & Music

All audio files live in `assets/audio/`:
- `background-music.mp3`: Ambient music box melody playing in the background.
- `envelope-open.mp3`: Chime sound when opening the letter on Screen 1.
- `celebration.mp3`: Celebratory fanfare when Motu clicks *"Haan, Maaf Kiya! ❤️"*.

To replace any sound effect:
1. Convert your desired sound to `.mp3`.
2. Replace the file in `assets/audio/` keeping the exact same filename.
3. The built-in audio engine also features a **Web Audio API procedural sound synthesizer** that plays pleasant chimes, pops, and sparkles as an instant zero-latency backup!

---

## ✨ Website Screen Flow & Surprises

| Screen | Title / Focus | Interactive Surprise |
| :--- | :--- | :--- |
| **Screen 1** | *Hey Motu! ❤️* | Interactive 3D Envelope with heart wax seal that shakes and opens with heart bursts! |
| **Screen 2** | *SORRY MOTU Placard* | Bhaiyoo holding sign + Spoken voice with real-time waveform animation. |
| **Screen 3** | *Ek Choti Si Request* | Playful highlighted reminders asking her not to get angry and read the whole message. |
| **Screen 4** | *Letter Part 1* | Parchment letter explaining the honest story behind the job message and sickness. |
| **Screen 5** | *Letter Part 2 & Secret* | Apology for teasing + **Hidden Glowing Heart** revealing secret modal and hug scene! |
| **Screen 6** | *The Apology Cake* | Animated 3D cake where candles light up one by one + Aptech joke! |
| **Screen 7** | *Motu Ka Faisla* | Dynamic decision screen (`YES`, `NO` with sad puppy eyes, or `Need Time`). |
| **Screen 8** | *Grand Celebration* | Confetti explosion + *"UNBLOCK KARDE PLEASE!"* with WhatsApp & copy buttons. |
| **Screen 9** | *Forever Siblings & Reply* | Beautiful eternal sibling bond card + interactive message box for Motu to reply. |

---

*Made with love by Bhaiyoo for Motu ❤️🥺*
