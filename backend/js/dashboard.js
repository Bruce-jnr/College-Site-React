// Check authentication
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

const API_BASE = '/api';

// Handle unauthorized responses
async function checkResponse(response) {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
    return null;
  }
  return response;
}

// Navigation
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = e.currentTarget.getAttribute('data-section');
    document
      .querySelectorAll('.section')
      .forEach((s) => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
  });
});

// Show alert
function showAlert(message, type = 'success') {
  const alert = document.getElementById('alert');
  alert.className = `alert alert-${
    type === 'success' ? 'success' : 'danger'
  } show`;
  alert.textContent = message;
  setTimeout(() => {
    alert.classList.remove('show');
  }, 5000);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Announcement Form Handler
document
  .getElementById('announcementForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    const author = document.getElementById('announcementAuthor').value;
    const date = document.getElementById('announcementDate').value;

    try {
      const response = await fetch(`${API_BASE}/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          author,
          date: date || undefined,
        }),
      });

      if (!await checkResponse(response)) return;

      const data = await response.json();

      if (response.ok) {
        showAlert('Announcement posted successfully!', 'success');
        document.getElementById('announcementForm').reset();
        loadAnnouncementHistory();
      } else {
        showAlert(data.error || 'Failed to post announcement', 'danger');
      }
    } catch (error) {
      showAlert('Error posting announcement', 'danger');
      console.error(error);
    }
  });

// News Form Handler
document.getElementById('newsForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', document.getElementById('newsTitle').value);
  formData.append('content', document.getElementById('newsContent').value);
  formData.append('author', document.getElementById('newsAuthor').value);
  const date = document.getElementById('newsDate').value;
  if (date) formData.append('date', date);
  const image = document.getElementById('newsImage').files[0];
  if (image) formData.append('image', image);

  try {
    const response = await fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!await checkResponse(response)) return;

    const data = await response.json();

    if (response.ok) {
      showAlert('News posted successfully!', 'success');
      document.getElementById('newsForm').reset();
      document.getElementById('imagePreview').innerHTML = '';
      loadNewsHistory();
    } else {
      showAlert(data.error || 'Failed to post news', 'danger');
    }
  } catch (error) {
    showAlert('Error posting news', 'danger');
    console.error(error);
  }
});

// Image Preview
document.getElementById('newsImage').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById(
        'imagePreview'
      ).innerHTML = `<img src="${e.target.result}" class="preview-image" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
});

// Load Announcement History
async function loadAnnouncementHistory() {
  try {
    const response = await fetch(`${API_BASE}/announcements/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!await checkResponse(response)) return;

    const announcements = await response.json();
    const historyDiv = document.getElementById('announcementHistory');

    if (!Array.isArray(announcements)) {
      console.error('Expected array of announcements, got:', announcements);
      return;
    }

    if (announcements.length === 0) {
      historyDiv.innerHTML = '<p class="text-muted">No announcements yet.</p>';
      return;
    }

    historyDiv.innerHTML = announcements
      .map(
        (ann) => `
      <div class="history-item">
        <h5>${ann.title}</h5>
        <p class="text-muted small">${formatDate(ann.date)} | ${ann.author}</p>
        <p>${ann.content.substring(0, 100)}${
          ann.content.length > 100 ? '...' : ''
        }</p>
        <button class="btn btn-sm btn-danger btn-action" onclick="deleteAnnouncement(${
          ann.id
        })">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    `
      )
      .join('');
  } catch (error) {
    console.error('Error loading announcement history:', error);
  }
}

// Load News History
async function loadNewsHistory() {
  try {
    const response = await fetch(`${API_BASE}/news/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!await checkResponse(response)) return;

    const news = await response.json();
    const historyDiv = document.getElementById('newsHistory');

    if (!Array.isArray(news)) {
      console.error('Expected array of news, got:', news);
      return;
    }

    if (news.length === 0) {
      historyDiv.innerHTML = '<p class="text-muted">No news yet.</p>';
      return;
    }

    historyDiv.innerHTML = news
      .map(
        (item) => `
      <div class="history-item">
        ${
          item.imageUrl
            ? `<img src="${item.imageUrl}" class="img-fluid mb-2" style="max-width: 200px;" alt="News image">`
            : ''
        }
        <h5>${item.title}</h5>
        <p class="text-muted small">${formatDate(item.date)} | ${
          item.author
        }</p>
        <p>${item.content.substring(0, 100)}${
          item.content.length > 100 ? '...' : ''
        }</p>
        <button class="btn btn-sm btn-danger btn-action" onclick="deleteNews(${
          item.id
        })">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    `
      )
      .join('');
  } catch (error) {
    console.error('Error loading news history:', error);
  }
}

// Delete Announcement
async function deleteAnnouncement(id) {
  if (!confirm('Are you sure you want to delete this announcement?')) return;

  try {
    const response = await fetch(`${API_BASE}/announcements/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!await checkResponse(response)) return;

    if (response.ok) {
      showAlert('Announcement deleted successfully!', 'success');
      loadAnnouncementHistory();
    } else {
      showAlert('Failed to delete announcement', 'danger');
    }
  } catch (error) {
    showAlert('Error deleting announcement', 'danger');
    console.error(error);
  }
}

// Delete News
async function deleteNews(id) {
  if (!confirm('Are you sure you want to delete this news?')) return;

  try {
    const response = await fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!await checkResponse(response)) return;

    if (response.ok) {
      showAlert('News deleted successfully!', 'success');
      loadNewsHistory();
    } else {
      showAlert('Failed to delete news', 'danger');
    }
  } catch (error) {
    showAlert('Error deleting news', 'danger');
    console.error(error);
  }
}

// SRC Form Handler
document.getElementById('srcForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('srcName').value);
  formData.append('position', document.getElementById('srcPosition').value);
  formData.append('year', document.getElementById('srcYear').value);
  formData.append('isCurrent', document.getElementById('srcIsCurrent').checked);
  const image = document.getElementById('srcImage').files[0];
  if (image) formData.append('image', image);

  try {
    const response = await fetch(`${API_BASE}/src`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!await checkResponse(response)) return;

    const data = await response.json();

    if (response.ok) {
      showAlert('SRC executive added successfully!', 'success');
      document.getElementById('srcForm').reset();
      document.getElementById('srcImagePreview').innerHTML = '';
      document.getElementById('srcIsCurrent').checked = false;
      loadSrcHistory();
    } else {
      showAlert(data.error || 'Failed to add executive', 'danger');
    }
  } catch (error) {
    showAlert('Error adding executive', 'danger');
    console.error(error);
  }
});

// SRC Image Preview
document.getElementById('srcImage').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById(
        'srcImagePreview'
      ).innerHTML = `<img src="${e.target.result}" class="preview-image" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
});

// Load SRC History
async function loadSrcHistory() {
  try {
    const response = await fetch(`${API_BASE}/src/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!await checkResponse(response)) return;

    const executives = await response.json();
    const historyDiv = document.getElementById('srcHistory');

    if (!Array.isArray(executives)) {
      console.error('Expected array of executives, got:', executives);
      return;
    }

    if (executives.length === 0) {
      historyDiv.innerHTML = '<p class="text-muted">No executives yet.</p>';
      return;
    }

    // Group by year
    const grouped = {};
    executives.forEach((exec) => {
      if (!grouped[exec.year]) {
        grouped[exec.year] = [];
      }
      grouped[exec.year].push(exec);
    });

    let html = '';
    Object.keys(grouped)
      .sort()
      .reverse()
      .forEach((year) => {
        html += `<h5 class="mt-3 mb-2">${year} ${
          grouped[year].some((e) => e.isCurrent)
            ? '<span class="badge bg-success">Current</span>'
            : ''
        }</h5>`;
        grouped[year].forEach((exec) => {
          html += `
          <div class="history-item">
            ${
              exec.imageUrl
                ? `<img src="${exec.imageUrl}" class="img-fluid mb-2 rounded-circle" style="max-width: 100px; height: 100px; object-fit: cover;" alt="${exec.name}">`
                : ''
            }
            <h6>${exec.name} - ${exec.position}</h6>
            <button class="btn btn-sm btn-danger btn-action" onclick="deleteSrc(${
              exec.id
            })">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        `;
        });
      });

    historyDiv.innerHTML = html;
  } catch (error) {
    console.error('Error loading SRC history:', error);
  }
}

// Delete SRC Executive
async function deleteSrc(id) {
  if (!confirm('Are you sure you want to delete this executive?')) return;

  try {
    const response = await fetch(`${API_BASE}/src/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!await checkResponse(response)) return;

    if (response.ok) {
      showAlert('Executive deleted successfully!', 'success');
      loadSrcHistory();
    } else {
      showAlert('Failed to delete executive', 'danger');
    }
  } catch (error) {
    showAlert('Error deleting executive', 'danger');
    console.error(error);
  }
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
  }
});

// Load Admission Status
async function loadAdmissionStatus() {
  try {
    const response = await fetch(`${API_BASE}/admissions/status`);
    const status = await response.json();

    document.getElementById('admissionYear').value = status.year || '2025/2026';
    if (status.isOpen) {
      document.getElementById('admissionOpened').checked = true;
    } else {
      document.getElementById('admissionClosed').checked = true;
    }

    // Update status display
    const statusDisplay = document.getElementById('statusDisplay');
    statusDisplay.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>Academic Year:</strong> ${status.year || '2025/2026'}<br>
          <strong>Status:</strong> 
          <span class="badge ${status.isOpen ? 'bg-success' : 'bg-danger'}">
            ${status.isOpen ? 'Opened' : 'Closed'}
          </span>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading admission status:', error);
  }
}

// Admission Status Form Handler
document.getElementById('admissionStatusForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const year = document.getElementById('admissionYear').value;
  const isOpen = document.querySelector('input[name="admissionStatus"]:checked').value === 'opened';

  try {
    const response = await fetch(`${API_BASE}/admissions/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isOpen, year }),
    });

    if (!await checkResponse(response)) return;

    const data = await response.json();

    if (response.ok) {
      showAlert('Admission status updated successfully!', 'success');
      loadAdmissionStatus();
    } else {
      showAlert(data.error || 'Failed to update status', 'danger');
    }
  } catch (error) {
    showAlert('Error updating admission status', 'danger');
    console.error(error);
  }
});

// Load history on page load
loadAnnouncementHistory();
loadNewsHistory();
loadSrcHistory();
loadAdmissionStatus();

// ─────────────────────────────────────────────
//  STAFF DIRECTORY
// ─────────────────────────────────────────────

// Config helpers for the two staff types
const staffConfig = {
  teaching: {
    formId:        'teachingForm',
    editIdEl:      'teachingEditId',
    nameEl:        'teachingName',
    positionEl:    'teachingPosition',
    qualEl:        'teachingQualification',
    deptEl:        'teachingDepartment',
    imageEl:       'teachingImage',
    previewEl:     'teachingImagePreview',
    historyEl:     'teachingHistory',
    titleEl:       'teachingFormTitle',
    btnTextEl:     'teachingBtnText',
    cancelBtnEl:   'teachingCancelBtn',
    type:          'teaching',
    addTitle:      'Add Teaching Staff',
    editTitle:     'Edit Teaching Staff',
    addBtnText:    'Add Staff',
    editBtnText:   'Save Changes',
  },
  'non-teaching': {
    formId:        'nonTeachingForm',
    editIdEl:      'nonTeachingEditId',
    nameEl:        'nonTeachingName',
    positionEl:    'nonTeachingPosition',
    qualEl:        'nonTeachingQualification',
    deptEl:        'nonTeachingDepartment',
    imageEl:       'nonTeachingImage',
    previewEl:     'nonTeachingImagePreview',
    historyEl:     'nonTeachingHistory',
    titleEl:       'nonTeachingFormTitle',
    btnTextEl:     'nonTeachingBtnText',
    cancelBtnEl:   'nonTeachingCancelBtn',
    type:          'non-teaching',
    addTitle:      'Add Non-Teaching Staff',
    editTitle:     'Edit Non-Teaching Staff',
    addBtnText:    'Add Staff',
    editBtnText:   'Save Changes',
  },
};

// Image preview for staff forms
['teaching', 'non-teaching'].forEach((type) => {
  const cfg = staffConfig[type];
  document.getElementById(cfg.imageEl).addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        document.getElementById(cfg.previewEl).innerHTML =
          `<img src="${ev.target.result}" class="preview-image" style="max-width:120px;border-radius:50%;height:120px;object-fit:cover;" alt="Preview">`;
      };
      reader.readAsDataURL(file);
    }
  });
});

// Staff form submit handler (handles both add and update)
['teaching', 'non-teaching'].forEach((type) => {
  const cfg = staffConfig[type];
  document.getElementById(cfg.formId).addEventListener('submit', async (e) => {
    e.preventDefault();

    const editId = document.getElementById(cfg.editIdEl).value;
    const isEdit = !!editId;

    const formData = new FormData();
    formData.append('fullName',      document.getElementById(cfg.nameEl).value);
    formData.append('position',      document.getElementById(cfg.positionEl).value);
    formData.append('qualification', document.getElementById(cfg.qualEl).value);
    formData.append('department',    document.getElementById(cfg.deptEl).value);
    formData.append('type',          cfg.type);
    const image = document.getElementById(cfg.imageEl).files[0];
    if (image) formData.append('image', image);

    try {
      const url    = isEdit ? `${API_BASE}/staff/${editId}` : `${API_BASE}/staff`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!await checkResponse(response)) return;

      const data = await response.json();

      if (response.ok) {
        showAlert(
          isEdit ? 'Staff member updated successfully!' : 'Staff member added successfully!',
          'success'
        );
        cancelStaffEdit(type); // resets form
        loadStaffHistory(type);
      } else {
        showAlert(data.error || 'Failed to save staff member', 'danger');
      }
    } catch (error) {
      showAlert('Error saving staff member', 'danger');
      console.error(error);
    }
  });
});

// Load staff history for a given type
async function loadStaffHistory(type) {
  const cfg = staffConfig[type];
  try {
    const response = await fetch(`${API_BASE}/staff/history?type=${cfg.type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!await checkResponse(response)) return;

    const staff = await response.json();
    const historyDiv = document.getElementById(cfg.historyEl);

    if (!Array.isArray(staff)) {
      console.error('Expected array of staff, got:', staff);
      return;
    }

    if (staff.length === 0) {
      historyDiv.innerHTML = '<p class="text-muted">No staff members yet.</p>';
      return;
    }

    historyDiv.innerHTML = staff.map((member) => `
      <div class="history-item d-flex align-items-center gap-3">
        ${member.imageUrl
          ? `<img src="${member.imageUrl}" alt="${member.full_name}"
               style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,215,0,0.4);">`
          : `<div style="width:60px;height:60px;border-radius:50%;background:rgba(255,215,0,0.15);
               display:flex;align-items:center;justify-content:center;font-size:1.5rem;">
               <i class="bi bi-person-fill" style="color:#ffd700;"></i></div>`
        }
        <div class="flex-grow-1">
          <h6 class="mb-0">${member.full_name}</h6>
          <p class="text-muted small mb-0">${member.position}</p>
          ${member.department ? `<p class="small mb-0" style="color:#ffd700;"><i class="bi bi-diagram-3"></i> ${member.department}</p>` : ''}
          <p class="text-muted small mb-1"><em>${member.qualification}</em></p>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-warning btn-action"
              onclick="editStaff('${type}', ${member.id}, '${member.full_name.replace(/'/g,"\\'")}', '${member.position.replace(/'/g,"\\'")}', '${member.qualification.replace(/'/g,"\\'")}', '${(member.department||'').replace(/'/g,"\\'")}', '${member.imageUrl || ''}'">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger btn-action" onclick="deleteStaff(${member.id}, '${type}')">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading staff history:', error);
  }
}

// Pre-fill form for editing
function editStaff(type, id, fullName, position, qualification, department, imageUrl) {
  const cfg = staffConfig[type];

  // Switch to the correct section if not already active
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(type).classList.add('active');

  document.getElementById(cfg.editIdEl).value    = id;
  document.getElementById(cfg.nameEl).value      = fullName;
  document.getElementById(cfg.positionEl).value  = position;
  document.getElementById(cfg.qualEl).value      = qualification;
  document.getElementById(cfg.deptEl).value      = department || '';

  // Show current photo in preview
  if (imageUrl) {
    document.getElementById(cfg.previewEl).innerHTML =
      `<img src="${imageUrl}" style="max-width:120px;border-radius:50%;height:120px;object-fit:cover;" alt="Current photo">`;
  }

  // Update UI to edit mode
  document.getElementById(cfg.titleEl).textContent    = cfg.editTitle;
  document.getElementById(cfg.btnTextEl).textContent  = cfg.editBtnText;
  document.getElementById(cfg.cancelBtnEl).style.display = 'inline-flex';

  // Scroll form into view
  document.getElementById(cfg.formId).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Cancel edit – reset form back to add mode
function cancelStaffEdit(type) {
  const cfg = staffConfig[type];
  document.getElementById(cfg.formId).reset();
  document.getElementById(cfg.editIdEl).value             = '';
  document.getElementById(cfg.deptEl).value               = '';
  document.getElementById(cfg.previewEl).innerHTML        = '';
  document.getElementById(cfg.titleEl).textContent        = cfg.addTitle;
  document.getElementById(cfg.btnTextEl).textContent      = cfg.addBtnText;
  document.getElementById(cfg.cancelBtnEl).style.display  = 'none';
}

// Delete staff member
async function deleteStaff(id, type) {
  if (!confirm('Are you sure you want to remove this staff member?')) return;

  try {
    const response = await fetch(`${API_BASE}/staff/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!await checkResponse(response)) return;

    if (response.ok) {
      showAlert('Staff member deleted successfully!', 'success');
      loadStaffHistory(type);
    } else {
      showAlert('Failed to delete staff member', 'danger');
    }
  } catch (error) {
    showAlert('Error deleting staff member', 'danger');
    console.error(error);
  }
}

// Load staff history on page load
loadStaffHistory('teaching');
loadStaffHistory('non-teaching');

