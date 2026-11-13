/* ===============================================================
   MELLOFI SETUP — Replace the empty strings with YOUR real links.
   Example: youtube: 'https://www.youtube.com/@YourActualHandle'
   Empty links display a friendly reminder rather than sending
   visitors to the wrong artist.
   =============================================================== */
const MELLOFI_LINKS = {
  youtube: '',
  soundcloud: '',
  spotify: '',
  instagram: '',
};

const $ = (sel) => document.querySelector(sel);
const toast = $('#toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3300);
}

document.querySelectorAll('[data-link]').forEach(link => {
  const key = link.dataset.link;
  if (MELLOFI_LINKS[key]) {
    link.href = MELLOFI_LINKS[key];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.addEventListener('click', e => {
      e.preventDefault();
      notify(`Add your ${key[0].toUpperCase() + key.slice(1)} URL in script.js to activate this link.`);
    });
  }
});

const menuToggle = $('.menu-toggle');
const nav = $('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .10 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

$('#year').textContent = new Date().getFullYear();

// The local music player only uses audio selected by the visitor.
// No track is embedded because no audio file has been supplied.
const audio = $('#audio');
const fileInput = $('#audio-file');
const playButton = $('#toggle-play');
const seek = $('#seek');
let audioURL;
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}
fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  if (audioURL) URL.revokeObjectURL(audioURL);
  audioURL = URL.createObjectURL(file);
  audio.src = audioURL;
  $('#player-title').textContent = file.name.replace(/\.[^.]+$/, '');
  $('#player-subtitle').textContent = 'Playing locally from your device';
  playButton.disabled = false;
  seek.disabled = false;
  playButton.textContent = '▶';
  notify('Track loaded. Press play to listen.');
});
playButton.addEventListener('click', () => {
  if (!audio.src) return;
  if (audio.paused) audio.play().catch(() => notify('Unable to play this audio file.'));
  else audio.pause();
});
audio.addEventListener('play', () => { playButton.textContent = 'Ⅱ'; playButton.setAttribute('aria-label', 'Pause music'); });
audio.addEventListener('pause', () => { playButton.textContent = '▶'; playButton.setAttribute('aria-label', 'Play music'); });
audio.addEventListener('loadedmetadata', () => { $('#duration').textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => {
  $('#current-time').textContent = formatTime(audio.currentTime);
  if (audio.duration) seek.value = String((audio.currentTime / audio.duration) * 100);
});
seek.addEventListener('input', () => { if (audio.duration) audio.currentTime = (Number(seek.value) / 100) * audio.duration; });
document.querySelector('.player-trigger').addEventListener('click', () => {
  $('#player').scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (!audio.src) { fileInput.click(); } else if (audio.paused) { audio.play().catch(() => notify('Unable to play this audio file.')); }
});
