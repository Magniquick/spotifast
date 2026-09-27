// Shared comparison page logic: <body data-pr="..." data-states="a,b">.
const pr = document.body.dataset.pr;
const states = document.body.dataset.states.split(',');
const sel = { state: states[0], theme: 'dark', width: 'normal', side: 'after', mode: 'toggle' };
const $ = id => document.getElementById(id);
function src(side) { return `${pr}-${sel.state}-${side}-${sel.theme}-${sel.width}.png`; }
function render() {
  $('single').src = src(sel.side);
  $('slideBefore').src = src('before');
  $('slideAfter').src = src('after');
  $('single').style.display = sel.mode === 'toggle' ? 'block' : 'none';
  $('slider').style.display = sel.mode === 'slider' ? 'block' : 'none';
  $('label').textContent = sel.mode === 'toggle' ? (sel.side === 'before' ? 'Before (baseline)' : 'After (candidate)') : 'Left: before, right: after';
  document.querySelectorAll('[data-k]').forEach(b => b.classList.toggle('on', sel[b.dataset.k] === b.dataset.v));
}
document.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { sel[b.dataset.k] = b.dataset.v; render(); });
$('range').oninput = e => { $('slideAfterWrap').style.clipPath = `inset(0 0 0 ${e.target.value}%)`; };
document.addEventListener('keydown', e => { if (e.key === 'b') { sel.side = 'before'; render(); } if (e.key === 'a') { sel.side = 'after'; render(); } });
render();
