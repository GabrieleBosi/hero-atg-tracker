import { renderHistory, renderSessionDetail } from './screens/history';
import { renderHome } from './screens/home';
import { renderSettings } from './screens/settings';
import { renderWorkout } from './screens/workout';
import './style.css';

const app = document.getElementById('app')!;
let cleanup: (() => void) | void;

async function route(): Promise<void> {
  if (typeof cleanup === 'function') cleanup();
  cleanup = undefined;

  const hash = location.hash.replace(/^#\/?/, '');
  const [head, arg] = hash.split('/');

  if (head === 'workout' && arg) {
    cleanup = await renderWorkout(app, arg);
  } else if (head === 'history' && arg) {
    await renderSessionDetail(app, Number(arg));
  } else if (head === 'history') {
    await renderHistory(app);
  } else if (head === 'settings') {
    renderSettings(app);
  } else {
    renderHome(app);
  }

  updateNav();
  window.scrollTo(0, 0);
}

function updateNav(): void {
  const head = location.hash.replace(/^#\/?/, '').split('/')[0] || 'home';
  document.querySelectorAll<HTMLElement>('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.route === head);
  });
}

window.addEventListener('hashchange', () => void route());
void route();

// Registrazione service worker per l'uso offline
if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
