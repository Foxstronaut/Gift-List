// 1) Paste your deployed Web App URL here:
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzhw7NDZkacB-12NFoXePIoVEI1bI5lWPeCnBzrtd9tqaPjUwlYBWMTaErKvFe8_jZ9/exec';

async function fetchGifts() {
  const res = await fetch(`${GAS_URL}?action=list`);
  const items = await res.json();
  const ul = document.getElementById('gift-list');
  ul.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${item.title}</strong><br/>
        ${item.description} — $${item.price}
      </div>
      <button data-id="${item.id}">Reserve</button>
    `;
    ul.appendChild(li);
  });

  ul.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', onReserve);
  });
}

async function onReserve(e) {
  const id = e.target.dataset.id;
  const name = prompt('Your name:');
  const contact = prompt('Your contact info:');
  if (!name || !contact) return;

  const res = await fetch(`${GAS_URL}?action=reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, contact })
  });
  const result = await res.json();
  alert(result.success ? '✅ Reserved!' : `❌ ${result.error}`);
  if (result.success) fetchGifts();
}

document.addEventListener('DOMContentLoaded', fetchGifts);
