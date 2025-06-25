const API_URL = 'http://localhost:3000/api/faltas';
const faltaForm = document.getElementById('faltaForm');
const faltasTable = document.querySelector('#faltasTable tbody');
const cancelBtn = document.getElementById('cancelBtn');

let editingId = null;

// Load all records on page load
document.addEventListener('DOMContentLoaded', loadFaltas);

// Form submit handler
faltaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const falta = {
    nome: document.getElementById('nome').value,
    dia: document.getElementById('dia').value,
    valor: parseFloat(document.getElementById('valor').value)
  };

  try {
    if (editingId) {
      await updateFalta(editingId, falta);
    } else {
      await createFalta(falta);
    }
    resetForm();
    loadFaltas();
  } catch (err) {
    console.error('Error saving record:', err);
    alert('Erro ao salvar registro');
  }
});

// Cancel button handler
cancelBtn.addEventListener('click', resetForm);

// Load all records
async function loadFaltas() {
  try {
    const response = await fetch(API_URL);
    const faltas = await response.json();
    renderFaltas(faltas);
  } catch (err) {
    console.error('Error loading records:', err);
    alert('Erro ao carregar registros');
  }
}

// Create new record
async function createFalta(falta) {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(falta)
  });
}

// Update existing record
async function updateFalta(id, falta) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(falta)
  });
}

// Delete record
async function deleteFalta(id) {
  if (!confirm('Tem certeza que deseja excluir este registro?')) return;
  
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    loadFaltas();
  } catch (err) {
    console.error('Error deleting record:', err);
    alert('Erro ao excluir registro');
  }
}

// Edit record
function editFalta(falta) {
  editingId = falta.id;
  document.getElementById('nome').value = falta.nome;
  document.getElementById('dia').value = falta.dia;
  document.getElementById('valor').value = falta.valor;
  document.getElementById('faltaId').value = falta.id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset form
function resetForm() {
  editingId = null;
  faltaForm.reset();
  document.getElementById('faltaId').value = '';
}

// Render records in table
function renderFaltas(faltas) {
  faltasTable.innerHTML = '';
  faltas.forEach(falta => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${falta.id}</td>
      <td>${falta.nome}</td>
      <td>${new Date(falta.dia).toLocaleDateString('pt-BR')}</td>
      <td>${falta.valor.toFixed(2)}</td>
      <td>
        <button onclick="editFalta(${JSON.stringify(falta)})">Editar</button>
        <button onclick="deleteFalta(${falta.id})">Excluir</button>
      </td>
    `;
    faltasTable.appendChild(tr);
  });
}

// Make functions available globally
window.editFalta = editFalta;
window.deleteFalta = deleteFalta;