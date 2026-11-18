# ❤️ A Special Sorry Website For My Sister (Motu)

A beautiful, emotional, interactive, multi-screen apology website created with love from a brother to his beloved sister. Built with pure **HTML5, CSS3, and Vanilla JavaScript** — lightweight, mobile-first, and ready for instant deployment on **Vercel**.

---

## 🌟 Features & Journey Flow

1. **Screen 1 — Welcome & 3D Sealed Envelope 💌**:
   - Title: *"A Message For My Sister ❤️"*
   - Realistic 3D-styled envelope with an embossed heart wax seal.
   - Reads: *"Motu, please open this... It's from your Bhaiyooo 🥺❤️"*
   - Interactive opening animation with heart sparkles and chime sound effects.

2. **Screen 2 — Sorry Motu & Pleading Teddy 🥺**:
   - Title: *"Sorry Motu 🥺❤️"* with *"From Your Bhaiyooo"* tag.
   - Handcrafted vector animated teddy bear with sparkling pleading eyes, blushing cheeks, and paws holding a mini letter.
   - *"Click To Reveal Bhaiyoo's Message 💌"* button.

3. **Screen 3 — The Main Apology Message 📜**:
   - Header: *"Meri Pyari Motu ❤️"* with vintage postage stamp & airmail border.
   - Exact, verbatim heartfelt apology message from Bhaiyoo.
   - Smooth, comfortable scrolling on all mobile screens.
   - Two distinct decision buttons:
     - `❤️ Bhaiyoo Ko Maaf Kiya`
     - `😒 Nahi Kiya Maaf Bhaiyoo Ko`

4. **Screen 4A — If She Forgives Bhaiyoo (Celebration) 🎉**:
   - *"YAYYYYY! 🥹❤️"* & *"BOHOT SHUKRIYA MOTUUUU!"*
   - Full-canvas falling heart confetti & balloons.
   - Happy dancing teddy bear with party hat and heart balloons.
   - *"Chalo ab meri pyari motu, har jagah se unblock karo apne Bhaiyoo ko. 🥺❤️"*
   - WhatsApp Card: Copies `"Bhaiyoo maaf kia ❤️"` and opens `https://wa.me/9232322682176?text=Bhaiyoo%20maaf%20kia%20%E2%9D%A4%EF%B8%8F`.

5. **Screen 4B — If She Does Not Forgive Bhaiyoo (Emotional Plea) 🥺**:
   - *"Kiun Motuuu? 🥺"* & *"Aisa Kiun Yaar?"*
   - Heartbroken animated sad teddy bear with drooping ears, tears, and a shaking signboard.
   - Exact emotional message including *"Plzzzz wapis dedo meri bhen"*.
   - **Sister's Message Form with Formspree**:
     - She can type a message to Bhaiyoo even if she blocked him on WhatsApp.
     - Delivered directly to Bhaiyoo's verified email.

---

## 🛠️ Project Structure

```
├── index.html          # Semantic HTML5 markup for all 5 interactive screens
├── style.css           # Glassmorphism, animations, responsive mobile-first CSS
├── script.js           # Navigation state, 3D envelope, Web Audio chimes, Formspree & WhatsApp
├── vercel.json         # Vercel deployment headers & caching rules
├── assets/
│   └── favicon.svg     # Sweet heart vector favicon
└── README.md           # Documentation & deployment guide
```

---

## 💌 Formspree Setup Instructions (To Receive Motu's Messages in Your Email)

To receive your sister's typed message in your email:

1. Go to **[https://formspree.io/](https://formspree.io/)** and create a free account (or log in).
2. Click **"+ New Form"**.
3. Name the form (e.g., `Motu Apology Messages`).
4. Enter the email address where you want to receive her messages and verify it.
5. Formspree will provide you with a unique endpoint URL:
   `https://formspree.io/f/your_form_id`
6. Open `script.js` in your code editor.
7. Replace `'YOUR_FORMSPREE_ENDPOINT'` on line 18 with your actual endpoint URL:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_form_id';
   ```
8. Save `script.js`! Messages typed by Motu will now arrive directly in your inbox with the subject *"A Message From Motu ❤️"* and timestamp!

> **Note**: If left as `'YOUR_FORMSPREE_ENDPOINT'`, the website safely informs the user that message delivery is not yet configured, preventing fake success notifications.

---

## 🚀 Deploying to Vercel

### Option 1: Deploy with Vercel CLI
1. Open PowerShell or Terminal in the project root (`e:\msg`).
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the quick prompts (link to existing project or create new).
4. Once completed, run `npx vercel --prod` to deploy to production.

### Option 2: Deploy via GitHub & Vercel Dashboard
1. Create a repository on GitHub (e.g. `sorry-motu`).
2. Push your files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Special Sorry Website for Motu ❤️"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sorry-motu.git
   git push -u origin main
   ```
3. Go to **[https://vercel.com/new](https://vercel.com/new)**.
4. Import your `sorry-motu` repository.
5. Leave Framework Preset as **Other** (it's pure static HTML/CSS/JS, no build step needed).
6. Click **Deploy**!
7. Your website will be live in seconds with an SSL-secured URL (e.g., `https://sorry-motu.vercel.app`) that you can share with your sister.

