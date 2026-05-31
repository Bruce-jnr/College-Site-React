// Staff Directory – public page JS
// Fetches teaching staff from /api/staff?type=teaching and renders filterable cards.

(function () {
  'use strict';

  const API_URL      = '/api/staff?type=teaching';
  const grid         = document.getElementById('staffGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState   = document.getElementById('emptyState');
  const searchInput  = document.getElementById('searchInput');
  const deptFilter   = document.getElementById('deptFilter');
  const staffCount   = document.getElementById('staffCount');
  const clearBtn     = document.getElementById('clearFilters');

  let allStaff = [];

  // ── Fetch ─────────────────────────────────────────────────────────────────
  async function fetchStaff() {
    try {
      const res  = await fetch(API_URL, { cache: 'no-store' });
      const data = await res.json();
      allStaff   = Array.isArray(data) ? data : [];
      buildDeptFilter(allStaff);
      render(allStaff);
    } catch (err) {
      console.error('Failed to load staff:', err);
      loadingState.innerHTML = '<p class="text-muted text-center w-100">Could not load staff. Please try again later.</p>';
    }
  }

  // ── Department filter options ──────────────────────────────────────────────
  function buildDeptFilter(staff) {
    const depts = [...new Set(staff.map(m => m.department).filter(Boolean))].sort();
    depts.forEach(dept => {
      const opt   = document.createElement('option');
      opt.value   = dept;
      opt.textContent = dept;
      deptFilter.appendChild(opt);
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function render(staff) {
    // Hide loading spinner
    loadingState.style.display = 'none';

    if (staff.length === 0) {
      grid.innerHTML     = '';
      emptyState.style.display = 'block';
      staffCount.textContent   = '0 staff';
      return;
    }

    emptyState.style.display = 'none';
    staffCount.textContent   = `${staff.length} staff member${staff.length !== 1 ? 's' : ''}`;

    grid.innerHTML = staff.map((m, i) => `
      <div class="col-sm-6 col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay="${(i % 8) * 50}">
        <div class="staff-card">
          <div class="staff-card-img-wrap">
            ${m.imageUrl
              ? `<img src="${m.imageUrl}" alt="${esc(m.full_name)}" loading="lazy">`
              : `<i class="bi bi-person-circle no-photo"></i>`
            }
          </div>
          <div class="staff-card-body">
            <h5>${esc(m.full_name)}</h5>
            <p class="position">${esc(m.position)}</p>
            ${m.qualification ? `<p class="qual-text"><i class="bi bi-award"></i> ${esc(m.qualification)}</p>` : ''}
            ${m.department ? `<span class="dept-tag"><i class="bi bi-diagram-3-fill"></i> ${esc(m.department)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Re-init AOS for newly rendered cards
    if (window.AOS) AOS.refresh();
  }

  // ── Filter logic ──────────────────────────────────────────────────────────
  function applyFilters() {
    const q    = searchInput.value.trim().toLowerCase();
    const dept = deptFilter.value;

    const filtered = allStaff.filter(m => {
      const matchSearch = !q ||
        m.full_name.toLowerCase().includes(q) ||
        (m.position  && m.position.toLowerCase().includes(q));
      const matchDept = !dept || m.department === dept;
      return matchSearch && matchDept;
    });

    clearBtn.style.display = (q || dept) ? 'inline-flex' : 'none';
    render(filtered);
  }

  function clearFilters() {
    searchInput.value = '';
    deptFilter.value  = '';
    clearBtn.style.display = 'none';
    render(allStaff);
  }

  // ── HTML escape helper ────────────────────────────────────────────────────
  function esc(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Event listeners ───────────────────────────────────────────────────────
  searchInput.addEventListener('input', applyFilters);
  deptFilter.addEventListener('change', applyFilters);
  clearBtn.addEventListener('click', clearFilters);

  // ── Init ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) AOS.init({ duration: 600, once: true });
    fetchStaff();
  });
})();
