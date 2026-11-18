/**
 * ============================================================================
 * A SPECIAL SORRY WEBSITE FOR MY SISTER ❤️
 * Pure Vanilla JavaScript Module
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CONFIGURATION
     -------------------------------------------------------------------------- */
  /**
   * FORMSPREE CONFIGURATION:
   * Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree endpoint URL.
   * Example: 'https://formspree.io/f/xyzabk'
   */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mljbbvke';

  /**
   * WhatsApp Configuration:
   * International format for 032322682176 -> 9232322682176
   */
  const WHATSAPP_PHONE = '9232322682176';
  const WHATSAPP_MESSAGE = 'Bhaiyoo maaf kia ❤️';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  /* --------------------------------------------------------------------------
     2. DOM ELEMENTS
     -------------------------------------------------------------------------- */
  const screens = {
    '1': document.getElementById('screen-1'),
    '2': document.getElementById('screen-2'),
    '3': document.getElementById('screen-3'),
    '4a': document.getElementById('screen-4a'),
    '4b': document.getElementById('screen-4b')
  };

  const navBackBtn = document.getElementById('nav-back-btn');
  const stepper = document.getElementById('stepper');
  const stepDots = stepper ? stepper.querySelectorAll('.step-dot') : [];
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  // Screen 1 Elements
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const btnScreen1Forward = document.getElementById('btn-screen1-forward');

  // Screen 2 Elements
  const btnScreen2Reveal = document.getElementById('btn-screen2-reveal');

  // Screen 3 Elements
  const btnForgive = document.getElementById('btn-forgive');
  const btnNotForgive = document.getElementById('btn-not-forgive');

  // Screen 4A Elements
  const btnSendWhatsapp = document.getElementById('btn-send-whatsapp');
  const waPreviewCard = document.getElementById('wa-preview-card');
  const waCopyBadge = document.getElementById('wa-copy-badge');
  const waBadgeText = document.getElementById('wa-badge-text');

  // Screen 4B Elements
  const sisterForm = document.getElementById('sister-message-form');
  const sisterTextarea = document.getElementById('sister-message-text');
  const charCounter = document.getElementById('char-counter');
  const formAlert = document.getElementById('form-alert');
  const btnSendMessage = document.getElementById('btn-send-message');
  const btnSpinner = document.getElementById('btn-spinner');
  const btnText = document.getElementById('btn-text');
  const formSuccessCard = document.getElementById('form-success-card');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');

  /* --------------------------------------------------------------------------
     3. APP STATE & NAVIGATION
     -------------------------------------------------------------------------- */
  let currentScreenId = '1';
  const screenHistory = ['1'];
  let isEnvelopeOpening = false;
  let isSubmittingMessage = false;

  /**
   * Update the visual step indicator
   */
  function updateStepper(screenId) {
    let stepNum = 1;
    if (screenId === '1') stepNum = 1;
    else if (screenId === '2') stepNum = 2;
    else if (screenId === '3') stepNum = 3;
    else if (screenId === '4a' || screenId === '4b') stepNum = 4;

    stepDots.forEach((dot) => {
      const dotStep = parseInt(dot.getAttribute('data-step'), 10);
      dot.classList.remove('active', 'completed');
      if (dotStep === stepNum) {
        dot.classList.add('active');
      } else if (dotStep < stepNum) {
        dot.classList.add('completed');
      }
    });

    // Toggle Back button visibility
    if (screenHistory.length > 1) {
      navBackBtn.classList.remove('hidden');
    } else {
      navBackBtn.classList.add('hidden');
    }
  }

  /**
   * Transition smoothly to a screen
   */
  function goToScreen(targetId, isBackNavigation = false) {
    if (!screens[targetId] || targetId === currentScreenId) return;

    const fromScreen = screens[currentScreenId];
    const toScreen = screens[targetId];

    // Fade out current screen
    fromScreen.style.opacity = '0';
    fromScreen.style.transform = isBackNavigation ? 'translateY(16px)' : 'translateY(-16px)';

    setTimeout(() => {
      fromScreen.classList.remove('active');
      fromScreen.style.display = 'none';

      // Prepare target screen
      toScreen.style.display = 'block';
      toScreen.style.opacity = '0';
      toScreen.style.transform = isBackNavigation ? 'translateY(-16px)' : 'translateY(16px)';

      // Trigger reflow
      void toScreen.offsetWidth;

      toScreen.classList.add('active');
      toScreen.style.opacity = '1';
      toScreen.style.transform = 'translateY(0)';

      currentScreenId = targetId;

      if (!isBackNavigation) {
        screenHistory.push(targetId);
      }

      updateStepper(targetId);

      // Trigger screen-specific special effects
      if (targetId === '4a') {
        launchCelebrationConfetti();
      }

      // Smooth scroll back to top of container
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 280);
  }

  /**
   * Handle Back Navigation
   */
  function goBack() {
    if (screenHistory.length <= 1) return;
    screenHistory.pop(); // Remove current
    const previousScreenId = screenHistory[screenHistory.length - 1];
    goToScreen(previousScreenId, true);
  }

  navBackBtn.addEventListener('click', goBack);

  /* --------------------------------------------------------------------------
     4. SCREEN 1: ENVELOPE OPENING INTERACTION
     -------------------------------------------------------------------------- */
  function openEnvelopeAndProceed() {
    if (isEnvelopeOpening) return;
    isEnvelopeOpening = true;

    // Trigger visual envelope opening
    envelopeWrapper.classList.add('opened');

    // Create heart burst at envelope position
    const rect = envelopeWrapper.getBoundingClientRect();
    createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Audio chime if enabled
    playChime();

    // After animation finishes, transition to Screen 2
    setTimeout(() => {
      goToScreen('2');
      isEnvelopeOpening = false;
    }, 850);
  }

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', openEnvelopeAndProceed);
    envelopeWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelopeAndProceed();
      }
    });
  }

  if (btnScreen1Forward) {
    btnScreen1Forward.addEventListener('click', openEnvelopeAndProceed);
  }

  /* --------------------------------------------------------------------------
     5. SCREEN 2: SORRY MOTU INTERACTIONS
     -------------------------------------------------------------------------- */
  if (btnScreen2Reveal) {
    btnScreen2Reveal.addEventListener('click', () => {
      playChime();
      goToScreen('3');
    });
  }

  /* --------------------------------------------------------------------------
     6. SCREEN 3: DECISION (FORGIVE / NOT FORGIVE)
     -------------------------------------------------------------------------- */
  if (btnForgive) {
    btnForgive.addEventListener('click', () => {
      playChime(true);
      goToScreen('4a');
    });
  }

  if (btnNotForgive) {
    btnNotForgive.addEventListener('click', () => {
      playSadChime();
      goToScreen('4b');
    });
  }

  /* --------------------------------------------------------------------------
     7. SCREEN 4A: FORGIVENESS & WHATSAPP INTEGRATION
     -------------------------------------------------------------------------- */
  /**
   * Copy message to clipboard and open WhatsApp
   */
  async function handleWhatsAppShare() {
    let copySuccess = false;

    // Attempt Clipboard Copy
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(WHATSAPP_MESSAGE);
        copySuccess = true;
      } else {
        // Fallback for older browsers / non-HTTPS
        const tempInput = document.createElement('textarea');
        tempInput.value = WHATSAPP_MESSAGE;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        copySuccess = document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }

    // Feedback UI
    if (waBadgeText) {
      waBadgeText.textContent = 'Copied! ✨';
      waCopyBadge.style.background = '#15803d';
      setTimeout(() => {
        waBadgeText.textContent = 'Tap to copy 📋';
        waCopyBadge.style.background = '#22c55e';
      }, 3000);
    }

    showToast('Message copied! Opening WhatsApp for Bhaiyoo... 💚');

    // Slight delay to show feedback then open WhatsApp
    setTimeout(() => {
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
    }, 400);
  }

  if (btnSendWhatsapp) {
    btnSendWhatsapp.addEventListener('click', handleWhatsAppShare);
  }

  if (waPreviewCard) {
    waPreviewCard.addEventListener('click', handleWhatsAppShare);
  }

  /* --------------------------------------------------------------------------
     8. SCREEN 4B: FORMSPREE MESSAGE SUBMISSION
     -------------------------------------------------------------------------- */
  if (sisterTextarea) {
    // Live Character Counter
    sisterTextarea.addEventListener('input', () => {
      const len = sisterTextarea.value.length;
      charCounter.textContent = len;
      if (formAlert.classList.contains('alert-error')) {
        formAlert.classList.add('hidden');
      }
    });
  }

  /**
   * Show alert inside the form
   */
  function showFormAlert(message, type = 'error') {
    formAlert.textContent = message;
    formAlert.className = `form-alert alert-${type}`;
    formAlert.classList.remove('hidden');
  }

  /**
   * Handle Sister's Apology Message Submission
   */
  if (sisterForm) {
    sisterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (isSubmittingMessage) return;

      const messageContent = (sisterTextarea.value || '').trim();

      // 1. Validation: Message cannot be empty
      if (!messageContent) {
        showFormAlert('Please Motu, Bhaiyoo ke liye kuch to likho... 🥺 Khali message mat bhejo.', 'error');
        sisterTextarea.focus();
        return;
      }

      // 2. Check if Formspree endpoint is configured
      const isEndpointConfigured =
        FORMSPREE_ENDPOINT &&
        FORMSPREE_ENDPOINT !== 'YOUR_FORMSPREE_ENDPOINT' &&
        FORMSPREE_ENDPOINT.startsWith('http');

      if (!isEndpointConfigured) {
        showFormAlert(
          '⚠️ Formspree endpoint configure nahi hai abhi! Website owner: Please replace YOUR_FORMSPREE_ENDPOINT in script.js with your actual Formspree endpoint to receive messages in your email.',
          'warning'
        );
        return;
      }

      // 3. Initiate submission state
      isSubmittingMessage = true;
      btnSendMessage.disabled = true;
      btnSpinner.classList.remove('hidden');
      btnText.textContent = 'Sending your message to Bhaiyoo... 💌';
      formAlert.classList.add('hidden');

      const payload = {
        message: messageContent,
        subject: 'A Message From Motu ❤️',
        submission_time: new Date().toLocaleString(),
        sender: 'Meri Pyari Motu'
      };

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          // Success: hide form, show beautiful success card
          sisterForm.classList.add('hidden');
          formSuccessCard.classList.remove('hidden');
          playChime(true);
          createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
          showToast('Message sent successfully to Bhaiyoo! 💌');
        } else {
          // Server returned error status
          const data = await response.json().catch(() => null);
          const errorMsg = data && data.errors && data.errors.length
            ? data.errors.map(err => err.message).join(', ')
            : 'Oops Motu! Message send nahi hua. 🥺 Ek baar phir try karo please.';
          showFormAlert(errorMsg, 'error');
        }
      } catch (networkError) {
        console.error('Submission network error:', networkError);
        showFormAlert('Oops Motu! Message send nahi hua. 🥺 Ek baar phir try karo please.', 'error');
      } finally {
        isSubmittingMessage = false;
        btnSendMessage.disabled = false;
        btnSpinner.classList.add('hidden');
        btnText.textContent = '💌 Send Message To Bhaiyoo';
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  function showToast(text) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     10. AMBIENT PARTICLES (CANVAS BACKGROUND)
     -------------------------------------------------------------------------- */
  const ambientCanvas = document.getElementById('ambient-canvas');
  let ambientCtx = null;
  let particles = [];
  let animFrameId = null;

  function initAmbientCanvas() {
    if (!ambientCanvas) return;
    ambientCtx = ambientCanvas.getContext('2d');
    resizeAmbientCanvas();
    window.addEventListener('resize', resizeAmbientCanvas);

    // Generate floating hearts & sparkles
    const count = window.innerWidth < 600 ? 18 : 32;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    animateAmbientParticles();
  }

  function resizeAmbientCanvas() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }

  function createParticle(randomY = false) {
    const isHeart = Math.random() > 0.35;
    return {
      x: Math.random() * ambientCanvas.width,
      y: randomY ? Math.random() * ambientCanvas.height : ambientCanvas.height + 20,
      size: isHeart ? Math.random() * 12 + 8 : Math.random() * 4 + 2,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.25,
      isHeart: isHeart,
      color: getRandomPastelColor(),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.01
    };
  }

  function getRandomPastelColor() {
    const colors = [
      'rgba(251, 111, 146, 0.45)', // Pink
      'rgba(200, 182, 255, 0.45)', // Lavender
      'rgba(255, 209, 179, 0.45)', // Peach
      'rgba(189, 224, 254, 0.45)', // Soft Blue
      'rgba(255, 179, 198, 0.5)'   // Rose
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Left curve
    ctx.bezierCurveTo(
      -size / 2, -topCurveHeight,
      -size, size / 3,
      0, size
    );
    // Right curve
    ctx.bezierCurveTo(
      size, size / 3,
      size / 2, -topCurveHeight,
      0, topCurveHeight
    );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function animateAmbientParticles() {
    if (!ambientCtx) return;
    ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.6 + p.speedX;

      if (p.isHeart) {
        drawHeart(ambientCtx, p.x, p.y, p.size, p.color);
      } else {
        // Star / sparkle circle
        ambientCtx.beginPath();
        ambientCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ambientCtx.fillStyle = p.color;
        ambientCtx.fill();
      }

      // Respawn particle when it exits top of screen
      if (p.y < -30 || p.x < -30 || p.x > ambientCanvas.width + 30) {
        particles[i] = createParticle(false);
      }
    }

    animFrameId = requestAnimationFrame(animateAmbientParticles);
  }

  /* --------------------------------------------------------------------------
     11. CELEBRATION CONFETTI & BALLOONS (SCREEN 4A)
     -------------------------------------------------------------------------- */
  const confettiCanvas = document.getElementById('confetti-canvas');
  let confettiCtx = null;
  let confettiPieces = [];
  let confettiAnimId = null;

  function launchCelebrationConfetti() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    confettiPieces = [];
    const colors = ['#fb6f92', '#c8b6ff', '#ffd166', '#ffccd5', '#70d6ff', '#06d6a0'];

    // Spawn 100 confetti pieces + 12 balloons
    for (let i = 0; i < 90; i++) {
      confettiPieces.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height * 0.3 - 50,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        isHeart: Math.random() > 0.4
      });
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let activePieces = 0;

    for (let i = 0; i < confettiPieces.length; i++) {
      const p = confettiPieces[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y < confettiCanvas.height + 40) {
        activePieces++;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);

        if (p.isHeart) {
          drawHeart(confettiCtx, 0, 0, p.size, p.color);
        } else {
          confettiCtx.fillStyle = p.color;
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        }
        confettiCtx.restore();
      }
    }

    if (activePieces > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  /**
   * Screen tap burst of heart sparkles
   */
  function createHeartBurst(x, y) {
    if (!ambientCtx) return;
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 / 14) * i;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x: x,
        y: y,
        size: Math.random() * 10 + 6,
        speedY: Math.sin(angle) * speed,
        speedX: Math.cos(angle) * speed,
        opacity: 0.9,
        isHeart: true,
        color: '#fb6f92',
        wobble: 0,
        wobbleSpeed: 0
      });
    }
  }

  /* --------------------------------------------------------------------------
     12. SWEET MUSIC BOX CHIME (WEB AUDIO API - ZERO EXTERNAL ASSET DEPENDENCY)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let isSoundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  /**
   * Gentle, cheerful chime sound
   */
  function playChime(isHappyEnding = false) {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const notes = isHappyEnding ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25, 783.99]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.12);
        osc.stop(audioCtx.currentTime + idx * 0.12 + 0.65);
      });
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  /**
   * Gentle, soft sad chime
   */
  function playSadChime() {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const notes = [659.25, 587.33, 523.25]; // E5, D5, C5
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.18);

        gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.18);
        gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + idx * 0.18 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.18 + 0.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.18);
        osc.stop(audioCtx.currentTime + idx * 0.18 + 0.85);
      });
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        soundToggleBtn.classList.add('playing');
        soundIcon.textContent = '🔊';
        showToast('Sweet chimes enabled 🎵');
        playChime();
      } else {
        soundToggleBtn.classList.remove('playing');
        soundIcon.textContent = '🎵';
        showToast('Sound muted 🔇');
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. INITIALIZATION ON DOM READY
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    updateStepper('1');
  });

})();

