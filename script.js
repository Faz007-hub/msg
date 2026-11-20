/**
 * ============================================================================
 * SORRY MOTU! ❤️🥺 — Interactive Apology Website Engine
 * Vanilla JavaScript (ES6+) — Mobile-First, Accessible & Robust
 * ============================================================================
 */

/* ============================================================================
   1. USER CONFIGURATION SETTINGS
   ============================================================================ */

/**
 * VOICE SYSTEM CONFIGURATION
 * Options:
 *   - "generated": Uses the cute AI-generated voice saying "Sorry Motu!"
 *   - "custom": Uses your own recorded audio file!
 *
 * To use your own voice:
 * 1. Record yourself saying "Sorry Motu!" or your heartfelt apology.
 * 2. Save the file as: assets/audio/sorry-motu-custom.mp3
 * 3. Change VOICE_MODE from "generated" to "custom" below.
 */
const VOICE_MODE = "generated"; // "generated" | "custom"

const VOICE_FILES = {
  generated: "assets/audio/sorry-motu-generated.mp3",
  custom: "assets/audio/sorry-motu-custom.mp3"
};

/**
 * WHATSAPP CONFIGURATION
 * Put your WhatsApp phone number with country code (no '+' or spaces).
 * Example for Pakistan: "923001234567"
 * If left empty, WhatsApp will open with the pre-filled message, letting Motu choose your chat.
 */
const WHATSAPP_PHONE_NUMBER = ""; // e.g. "923001234567"
const WHATSAPP_MESSAGE = "Bhai, maaf kar diya. ❤️";

/**
 * EMAILJS CONFIGURATION
 * For receiving Motu's reply directly to: fazulisalm61@gmail.com
 * Sign up free at https://www.emailjs.com/
 * Replace these placeholder IDs with your actual EmailJS credentials:
 */
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_placeholder",     // e.g. "service_abc123"
  TEMPLATE_ID: "template_placeholder",   // e.g. "template_xyz456"
  PUBLIC_KEY: "public_key_placeholder",  // e.g. "user_123456789"
  FALLBACK_EMAIL: "fazulisalm61@gmail.com",
  WEBSITE_TITLE: "SORRY MOTU! 🥺❤️"
};


/* ============================================================================
   2. GLOBAL STATE
   ============================================================================ */
const State = {
  currentScreen: 1,
  totalScreens: 9,
  isSoundMuted: true,
  isVoicePlaying: false,
  isTransitioning: false,
  hasOpenedEnvelope: false,
  secretDiscovered: false
};


/* ============================================================================
   3. AUDIO MANAGER & WEB AUDIO API FALLBACK
   ============================================================================ */
class AudioManager {
  constructor() {
    this.voiceAudio = document.getElementById("audio-voice");
    this.bgmAudio = document.getElementById("audio-bgm");
    this.sfxAudio = document.getElementById("audio-sfx");
    
    // Set sources
    this.bgmAudio.src = "assets/audio/background-music.mp3";
    this.bgmAudio.volume = 0.28;
    this.bgmAudio.loop = true;

    // Set voice source based on configuration
    this.setupVoiceSource();

    // Initialize Web Audio Context (lazy created on user gesture)
    this.audioCtx = null;

    // Sound toggle button UI
    this.soundToggleBtn = document.getElementById("sound-toggle-btn");
    this.soundIcon = document.getElementById("sound-icon");

    this.bindEvents();
  }

  setupVoiceSource() {
    const src = VOICE_MODE === "custom" ? VOICE_FILES.custom : VOICE_FILES.generated;
    this.voiceAudio.src = src;
    console.log(`[Voice System] Mode: "${VOICE_MODE}", Source: "${src}"`);
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  bindEvents() {
    this.soundToggleBtn.addEventListener("click", () => this.toggleSound());

    // Sync waveform with voice playback
    this.voiceAudio.addEventListener("play", () => {
      State.isVoicePlaying = true;
      document.getElementById("waveform").classList.add("playing");
      document.getElementById("voice-status-text").textContent = "Bhaiyoo is speaking... 🥺❤️";
      document.getElementById("voice-play-icon").textContent = "⏸️";
    });

    this.voiceAudio.addEventListener("ended", () => {
      State.isVoicePlaying = false;
      document.getElementById("waveform").classList.remove("playing");
      document.getElementById("voice-status-text").textContent = "Bhaiyoo finished speaking ❤️";
      document.getElementById("voice-play-icon").textContent = "🔊";
    });

    this.voiceAudio.addEventListener("pause", () => {
      State.isVoicePlaying = false;
      document.getElementById("waveform").classList.remove("playing");
      document.getElementById("voice-play-icon").textContent = "🔊";
    });

    this.voiceAudio.addEventListener("error", (e) => {
      console.warn("[Voice Audio] File loading note, falling back to Web Speech:", e);
    });
  }

  toggleSound(forceState) {
    this.initAudioContext();
    if (typeof forceState === "boolean") {
      State.isSoundMuted = !forceState;
    } else {
      State.isSoundMuted = !State.isSoundMuted;
    }

    if (State.isSoundMuted) {
      this.bgmAudio.pause();
      this.soundIcon.textContent = "🔇";
      showToast("Music paused 🔇");
    } else {
      this.bgmAudio.play().catch(() => {
        // Fallback procedural soft music box if mp3 autoplay fails
        this.playProceduralBgm();
      });
      this.soundIcon.textContent = "🔊";
      showToast("Playing sweet background music 🎵");
    }
  }

  playVoice() {
    this.initAudioContext();
    if (State.isVoicePlaying) {
      this.voiceAudio.pause();
      this.voiceAudio.currentTime = 0;
      return;
    }

    // Attempt playback of audio file
    const playPromise = this.voiceAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("[Voice Audio] Autoplay/file blocked, using speech synthesis backup:", err);
        this.playSpeechSynthesisFallback();
      });
    }
  }

  playSpeechSynthesisFallback() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Sorry Motu!");
      utterance.pitch = 1.35; // Cute higher pitch
      utterance.rate = 0.85;  // Gentle sweet tempo
      utterance.lang = "hi-IN";

      utterance.onstart = () => {
        document.getElementById("waveform").classList.add("playing");
        document.getElementById("voice-status-text").textContent = "Bhaiyoo is speaking... 🥺❤️";
      };
      utterance.onend = () => {
        document.getElementById("waveform").classList.remove("playing");
        document.getElementById("voice-status-text").textContent = "Bhaiyoo finished speaking ❤️";
      };

      window.speechSynthesis.speak(utterance);
    }
  }

  playSfx(type) {
    this.initAudioContext();
    if (type === "envelope") {
      this.sfxAudio.src = "assets/audio/envelope-open.mp3";
      this.sfxAudio.play().catch(() => this.playProceduralChime([523.25, 659.25, 783.99, 1046.5]));
    } else if (type === "celebration") {
      this.sfxAudio.src = "assets/audio/celebration.mp3";
      this.sfxAudio.play().catch(() => this.playProceduralChime([523.25, 659.25, 783.99, 1046.5, 1318.5]));
    } else if (type === "pop") {
      this.playProceduralPop();
    } else if (type === "sparkle") {
      this.playProceduralSparkle();
    }
  }

  playProceduralPop() {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (_) {}
  }

  playProceduralChime(notes) {
    if (!this.audioCtx) return;
    try {
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + idx * 0.1);
        osc.stop(this.audioCtx.currentTime + idx * 0.1 + 0.65);
      });
    } catch (_) {}
  }

  playProceduralSparkle() {
    if (!this.audioCtx) return;
    try {
      [784, 988, 1175, 1568].forEach((f, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, this.audioCtx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + i * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + i * 0.06);
        osc.stop(this.audioCtx.currentTime + i * 0.06 + 0.45);
      });
    } catch (_) {}
  }

  playProceduralBgm() {
    // Graceful silent fallback if Web Audio is suspended
  }
}


/* ============================================================================
   4. SCREEN NAVIGATION ENGINE
   ============================================================================ */
class ScreenNavigator {
  constructor(audioManager) {
    this.audio = audioManager;
    this.progressBar = document.getElementById("progress-bar-fill");
    this.stepIndicator = document.getElementById("step-indicator");
    this.mainStage = document.getElementById("main-stage");

    this.bindNavigationButtons();
    this.updateProgress(1);
  }

  bindNavigationButtons() {
    // Envelope interactions
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const btnOpenEnvelope = document.getElementById("btn-open-envelope");

    const triggerOpen = () => this.handleEnvelopeOpen();
    envelopeWrapper.addEventListener("click", triggerOpen);
    btnOpenEnvelope.addEventListener("click", triggerOpen);

    // Screen 2 Next
    document.getElementById("btn-screen2-next").addEventListener("click", () => {
      this.goToScreen(3);
    });

    // Screen 3 Next
    document.getElementById("btn-screen3-next").addEventListener("click", () => {
      this.goToScreen(4);
    });

    // Screen 4 Next
    document.getElementById("btn-screen4-next").addEventListener("click", () => {
      this.goToScreen(5);
    });

    // Screen 5 Next
    document.getElementById("btn-screen5-next").addEventListener("click", () => {
      this.goToScreen(6);
    });

    // Screen 6 Next
    document.getElementById("btn-screen6-next").addEventListener("click", () => {
      this.goToScreen(7);
    });

    // Screen 8 Next
    document.getElementById("btn-screen8-next").addEventListener("click", () => {
      this.goToScreen(9);
    });

    // Replay Story Button
    document.getElementById("btn-replay-story").addEventListener("click", () => {
      this.resetStory();
    });

    // Back buttons
    document.querySelectorAll(".btn-back").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const prev = parseInt(e.currentTarget.getAttribute("data-prev"), 10);
        if (prev >= 1) {
          this.goToScreen(prev);
        }
      });
    });
  }

  handleEnvelopeOpen() {
    if (State.hasOpenedEnvelope || State.isTransitioning) return;
    State.hasOpenedEnvelope = true;
    State.isTransitioning = true;

    // Unmute music if user clicked
    if (State.isSoundMuted) {
      this.audio.toggleSound(true);
    }

    const envelope = document.getElementById("envelope");
    envelope.classList.add("opening");
    this.audio.playSfx("envelope");

    // Burst confetti particles around the envelope
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 45);

    setTimeout(() => {
      envelope.classList.add("opened");
      envelope.classList.remove("opening");
    }, 450);

    setTimeout(() => {
      State.isTransitioning = false;
      this.goToScreen(2);
    }, 1300);
  }

  goToScreen(screenNum) {
    if (screenNum < 1 || screenNum > State.totalScreens || State.isTransitioning) return;
    State.isTransitioning = true;

    const currentScreenEl = document.getElementById(`screen-${State.currentScreen}`);
    const nextScreenEl = document.getElementById(`screen-${screenNum}`);

    if (currentScreenEl) {
      currentScreenEl.classList.remove("active");
    }

    setTimeout(() => {
      if (nextScreenEl) {
        nextScreenEl.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      State.currentScreen = screenNum;
      this.updateProgress(screenNum);
      this.onScreenActivated(screenNum);
      State.isTransitioning = false;
    }, 280);
  }

  updateProgress(screenNum) {
    const percentage = Math.round((screenNum / State.totalScreens) * 100);
    this.progressBar.style.width = `${percentage}%`;
    this.stepIndicator.textContent = `${screenNum} / ${State.totalScreens}`;
  }

  onScreenActivated(screenNum) {
    this.audio.playProceduralPop();

    // Screen 2: Trigger voice automatically if possible
    if (screenNum === 2) {
      setTimeout(() => {
        this.audio.playVoice();
      }, 500);
    }

    // Screen 6: Light cake candles in sequence
    if (screenNum === 6) {
      this.animateCakeCandles();
    }

    // Screen 8: Trigger celebration confetti cannon
    if (screenNum === 8) {
      this.audio.playSfx("celebration");
      triggerGrandCelebration();
    }
  }

  animateCakeCandles() {
    const flames = [
      document.getElementById("flame-1"),
      document.getElementById("flame-2"),
      document.getElementById("flame-3")
    ];

    flames.forEach((flame) => flame.classList.remove("lit"));

    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.classList.add("lit");
        this.audio.playProceduralSparkle();
      }, 500 + index * 350);
    });

    setTimeout(() => {
      createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.45, 30);
    }, 1600);
  }

  resetStory() {
    State.hasOpenedEnvelope = false;
    State.secretDiscovered = false;
    const envelope = document.getElementById("envelope");
    envelope.classList.remove("opened", "opening");

    // Reset decision screen states
    document.getElementById("main-decision-btns").style.display = "flex";
    document.getElementById("sad-plea-card").style.display = "none";
    document.getElementById("need-time-card").style.display = "none";
    document.getElementById("decision-img").src = "assets/characters/siblings-intro.svg";

    // Reset hug scene
    document.getElementById("hug-scene").style.display = "none";

    this.goToScreen(1);
    showToast("Story restarted from beginning ❤️");
  }
}


/* ============================================================================
   5. INTERACTIVE FEATURES & SURPRISES
   ============================================================================ */

function setupVoiceControls(audioManager) {
  const btnPlayVoice = document.getElementById("btn-play-voice");
  const btnReplayVoice = document.getElementById("btn-replay-voice");

  btnPlayVoice.addEventListener("click", () => {
    audioManager.playVoice();
  });

  btnReplayVoice.addEventListener("click", () => {
    audioManager.voiceAudio.currentTime = 0;
    audioManager.playVoice();
    showToast("Replaying Bhaiyoo's voice 🔊");
  });
}

function setupSecretHeartSurprise(audioManager) {
  const secretHeartBtn = document.getElementById("secret-heart-btn");
  const secretModal = document.getElementById("secret-modal");
  const btnCloseSecret = document.getElementById("btn-close-secret");
  const modalCloseIcon = document.getElementById("modal-close-icon");
  const hugScene = document.getElementById("hug-scene");

  const openSecret = () => {
    secretModal.classList.add("active");
    audioManager.playSfx("sparkle");
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
  };

  const closeSecret = () => {
    secretModal.classList.remove("active");
    State.secretDiscovered = true;
    hugScene.style.display = "block";
    hugScene.scrollIntoView({ behavior: "smooth", block: "center" });
    audioManager.playProceduralPop();
    showToast("Ek hug toh banta hai na? 🥺❤️");
  };

  secretHeartBtn.addEventListener("click", openSecret);
  btnCloseSecret.addEventListener("click", closeSecret);
  modalCloseIcon.addEventListener("click", closeSecret);

  // Close on backdrop tap
  secretModal.addEventListener("click", (e) => {
    if (e.target === secretModal) closeSecret();
  });
}

function setupDecisionScreen(navigator, audioManager) {
  const btnYes = document.getElementById("btn-choice-yes");
  const btnNo = document.getElementById("btn-choice-no");
  const btnNeedTime = document.getElementById("btn-need-time");
  const btnReconsider = document.getElementById("btn-reconsider");
  const btnBackToChoice = document.getElementById("btn-back-to-choice");

  const mainBtns = document.getElementById("main-decision-btns");
  const sadPleaCard = document.getElementById("sad-plea-card");
  const needTimeCard = document.getElementById("need-time-card");
  const decisionImg = document.getElementById("decision-img");

  // YES INTERACTION
  btnYes.addEventListener("click", () => {
    audioManager.playSfx("celebration");
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
    navigator.goToScreen(8);
  });

  // NO INTERACTION (Shows Sad Bhaiyoo)
  btnNo.addEventListener("click", () => {
    audioManager.playProceduralPop();
    decisionImg.src = "assets/characters/bhaiyoo-sad.svg";
    mainBtns.style.display = "none";
    needTimeCard.style.display = "none";
    sadPleaCard.style.display = "block";
    sadPleaCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Reconsider from Sad Card
  btnReconsider.addEventListener("click", () => {
    audioManager.playProceduralSparkle();
    decisionImg.src = "assets/characters/siblings-intro.svg";
    sadPleaCard.style.display = "none";
    mainBtns.style.display = "flex";
    showToast("Ek aur chance? 🥺❤️");
  });

  // OPTION 3: NEED TIME
  btnNeedTime.addEventListener("click", () => {
    audioManager.playProceduralPop();
    mainBtns.style.display = "none";
    sadPleaCard.style.display = "none";
    needTimeCard.style.display = "block";
    needTimeCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  btnBackToChoice.addEventListener("click", () => {
    decisionImg.src = "assets/characters/siblings-intro.svg";
    needTimeCard.style.display = "none";
    mainBtns.style.display = "flex";
  });
}

function setupWhatsAppActions() {
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const btnCopyMsg = document.getElementById("btn-copy-msg");
  const copyBtnText = document.getElementById("copy-btn-text");

  // Configure WhatsApp URL
  const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
  let waUrl = `https://wa.me/?text=${encodedMsg}`;
  if (WHATSAPP_PHONE_NUMBER && WHATSAPP_PHONE_NUMBER.trim() !== "") {
    waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER.trim()}?text=${encodedMsg}`;
  }
  btnWhatsapp.setAttribute("href", waUrl);

  // Copy Message to Clipboard
  btnCopyMsg.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(WHATSAPP_MESSAGE);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = WHATSAPP_MESSAGE;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      copyBtnText.textContent = "Copied! ❤️";
      showToast("Message copied! Unblock karke paste kar dena 🥺❤️");
      setTimeout(() => {
        copyBtnText.textContent = "Copy Message";
      }, 3000);
    } catch (err) {
      showToast("Could not auto-copy, you can copy manually ❤️");
    }
  });
}

function setupReplyForm() {
  const form = document.getElementById("reply-form");
  const textarea = document.getElementById("reply-message");
  const btnSend = document.getElementById("btn-send-reply");
  const sendIcon = document.getElementById("send-reply-icon");
  const sendText = document.getElementById("send-reply-text");
  const feedback = document.getElementById("reply-feedback");

  // Check if EmailJS public key is configured
  let isEmailJsReady = false;
  if (
    typeof emailjs !== "undefined" &&
    EMAILJS_CONFIG.PUBLIC_KEY &&
    EMAILJS_CONFIG.PUBLIC_KEY !== "public_key_placeholder"
  ) {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      isEmailJsReady = true;
    } catch (e) {
      console.warn("EmailJS init note:", e);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const replyText = textarea.value.trim();
    if (!replyText) {
      feedback.className = "reply-feedback error";
      feedback.textContent = "Please kuch likh do Bhaiyoo ke liye 🥺❤️";
      return;
    }

    // Set loading state
    btnSend.disabled = true;
    sendIcon.textContent = "⏳";
    sendText.textContent = "Sending to Bhaiyoo...";
    feedback.style.display = "none";

    const timestamp = new Date().toLocaleString();

    if (isEmailJsReady) {
      try {
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
          to_email: EMAILJS_CONFIG.FALLBACK_EMAIL,
          from_name: "Motu ❤️",
          message: replyText,
          timestamp: timestamp,
          website: EMAILJS_CONFIG.WEBSITE_TITLE
        });

        // Confirmed Success
        feedback.className = "reply-feedback success";
        feedback.textContent = "Tumhara message Bhaiyoo ko pohanch gaya! 🥺❤️ Shukriya Motu!";
        textarea.value = "";
        createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.7, 50);
      } catch (err) {
        console.error("EmailJS Error:", err);
        fallbackToMailto(replyText);
      } finally {
        btnSend.disabled = false;
        sendIcon.textContent = "💌";
        sendText.textContent = "Send to Bhaiyoo 💌";
      }
    } else {
      // Safe fallback when EmailJS keys have not been configured yet
      fallbackToMailto(replyText);
      btnSend.disabled = false;
      sendIcon.textContent = "💌";
      sendText.textContent = "Send to Bhaiyoo 💌";
    }
  });

  function fallbackToMailto(message) {
    const subject = encodeURIComponent("Motu ka Reply Bhaiyoo ke liye ❤️");
    const body = encodeURIComponent(`Bhaiyoo,\n\n${message}\n\n— Motu ❤️\nSent on: ${new Date().toLocaleString()}`);
    const mailtoLink = `mailto:${EMAILJS_CONFIG.FALLBACK_EMAIL}?subject=${subject}&body=${body}`;

    feedback.className = "reply-feedback success";
    feedback.innerHTML = `Tumhara message tayyar hai! Email app khul raha hai... Agar na khule toh <a href="${mailtoLink}" style="color:#0CA678;text-decoration:underline;">Click Here</a> ❤️`;
    
    window.location.href = mailtoLink;
  }
}


/* ============================================================================
   6. FLOATING PARTICLES & CONFETTI ENGINE
   ============================================================================ */

class ParticleEngine {
  constructor() {
    this.canvas = document.getElementById("bg-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.confetti = [];
    this.resize();

    window.addEventListener("resize", () => this.resize());
    this.initAmbientParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initAmbientParticles() {
    const count = Math.min(30, Math.floor(this.width / 35));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        type: Math.random() > 0.45 ? "heart" : "star",
        color: ["#FFADC6", "#FFCCD5", "#FFE5D9", "#E8D7F1", "#FFD166"][Math.floor(Math.random() * 5)]
      });
    }
  }

  drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawStar(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        Math.cos(((18 + i * 72) * Math.PI) / 180) * size + x,
        -Math.sin(((18 + i * 72) * Math.PI) / 180) * size + y
      );
      ctx.lineTo(
        Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 2) + x,
        -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 2) + y
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  addConfetti(x, y, count = 35) {
    const colors = ["#FF4D6D", "#FF85A2", "#FFD166", "#06D6A0", "#118AB2", "#8338EC", "#FFB703"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 8 + 3;
      this.confetti.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render ambient floating hearts and stars
    for (const p of this.particles) {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -30) {
        p.y = this.height + 20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -30) p.x = this.width + 20;
      if (p.x > this.width + 30) p.x = -20;

      if (p.type === "heart") {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.opacity);
      } else {
        this.drawStar(this.ctx, p.x, p.y, p.size / 2.2, p.color, p.opacity);
      }
    }

    // Render explosive confetti
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.22; // Gravity
      c.vx *= 0.98; // Air resistance
      c.rotation += c.rotationSpeed;
      c.life -= c.decay;

      if (c.life <= 0 || c.y > this.height + 50) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = c.life;
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.fillStyle = c.color;
      this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.7);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

let globalParticleEngine = null;

function createConfettiBurst(x, y, count) {
  if (globalParticleEngine) {
    globalParticleEngine.addConfetti(x, y, count);
  }
}

function triggerGrandCelebration() {
  const bursts = [
    { x: window.innerWidth * 0.2, y: window.innerHeight * 0.4, delay: 0 },
    { x: window.innerWidth * 0.8, y: window.innerHeight * 0.4, delay: 250 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3, delay: 500 },
    { x: window.innerWidth * 0.35, y: window.innerHeight * 0.5, delay: 850 },
    { x: window.innerWidth * 0.65, y: window.innerHeight * 0.5, delay: 1100 }
  ];

  bursts.forEach(({ x, y, delay }) => {
    setTimeout(() => {
      createConfettiBurst(x, y, 50);
    }, delay);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("active");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("active");
  }, 3200);
}


/* ============================================================================
   7. INITIALIZATION ON DOM READY
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🌸 SORRY MOTU! Website initialized with love ❤️");

  // Initialize Particles Canvas
  globalParticleEngine = new ParticleEngine();

  // Initialize Audio & Navigation
  const audioManager = new AudioManager();
  const navigator = new ScreenNavigator(audioManager);

  // Initialize Features
  setupVoiceControls(audioManager);
  setupSecretHeartSurprise(audioManager);
  setupDecisionScreen(navigator, audioManager);
  setupWhatsAppActions();
  setupReplyForm();
});
