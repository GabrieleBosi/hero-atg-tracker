// Timer di riposo: barra fissa sopra la nav, con suono e vibrazione al termine.
import { el, fmtRest } from './ui';

let interval: number | undefined;
let endsAt = 0;
let totalSec = 0;

function beep(): void {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    [0, 0.25, 0.5].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + 0.22);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {
    /* audio non disponibile */
  }
  navigator.vibrate?.([200, 100, 200, 100, 400]);
}

function root(): HTMLElement {
  return document.getElementById('timer-root')!;
}

export function stopTimer(): void {
  if (interval) clearInterval(interval);
  interval = undefined;
  root().innerHTML = '';
}

function render(remaining: number): void {
  const pct = totalSec > 0 ? Math.max(0, (remaining / totalSec) * 100) : 0;
  const r = root();
  let bar = r.querySelector<HTMLElement>('.timer');
  if (!bar) {
    r.innerHTML = '';
    bar = el(`
      <div class="timer">
        <div class="timer-progress"></div>
        <span class="timer-label">Riposo</span>
        <span class="timer-time"></span>
        <button class="timer-btn" data-act="plus">+30s</button>
        <button class="timer-btn" data-act="close">✕</button>
      </div>`);
    bar.querySelector('[data-act="plus"]')!.addEventListener('click', () => {
      endsAt += 30_000;
      totalSec += 30;
    });
    bar.querySelector('[data-act="close"]')!.addEventListener('click', stopTimer);
    r.appendChild(bar);
  }
  bar.querySelector<HTMLElement>('.timer-time')!.textContent = fmtRest(Math.max(0, Math.ceil(remaining)));
  bar.querySelector<HTMLElement>('.timer-progress')!.style.width = `${pct}%`;
}

export function startTimer(seconds: number): void {
  stopTimer();
  totalSec = seconds;
  endsAt = Date.now() + seconds * 1000;
  render(seconds);
  interval = window.setInterval(() => {
    const remaining = (endsAt - Date.now()) / 1000;
    if (remaining <= 0) {
      stopTimer();
      beep();
      const r = root();
      r.innerHTML = '';
      const doneBar = el(`<div class="timer timer-done"><span class="timer-label">Riposo finito — vai!</span><button class="timer-btn" data-act="close">✕</button></div>`);
      doneBar.querySelector('[data-act="close"]')!.addEventListener('click', stopTimer);
      r.appendChild(doneBar);
      setTimeout(() => {
        if (r.contains(doneBar)) r.innerHTML = '';
      }, 5000);
      return;
    }
    render(remaining);
  }, 250);
}
