AOS.init();

const cr = document.getElementById('cr-year');
cr.innerText = new Date().getFullYear();

// Load SRC Executives
async function loadSrcExecutives() {
  try {
    const response = await fetch('/api/src');
    const grouped = await response.json();
    const container = document.getElementById('srcExecutivesContainer');

    if (Object.keys(grouped).length === 0) {
      container.innerHTML =
        '<p class="text-muted">No SRC executives available at this time.</p>';
      return;
    }

    let html = '';
    let collapseIndex = 0;
    const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    years.forEach((year, yearIndex) => {
      const executives = grouped[year];
      const isCurrent = executives.some((e) => e.isCurrent);
      const collapseId = `collapse${collapseIndex}`;
      const isFirst = yearIndex === 0;

      html += `
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button ${isFirst ? '' : 'collapsed'} fs-3 ${
        isCurrent ? 'bg-success' : 'bg-secondary'
      } text-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#${collapseId}"
              ${isFirst ? 'aria-expanded="true"' : ''}
            >
              SRC Executives - ${year}
              ${
                isCurrent
                  ? '<small class="fw-light ms-2" style="font-size: 9pt"><i>(Current)</i></small>'
                  : ''
              }
              ${
                !isFirst
                  ? '<small class="fw-light ms-2" style="font-size: 9pt"><i>(Tap to view)</i></small>'
                  : ''
              }
            </button>
          </h2>
          <div
            id="${collapseId}"
            class="accordion-collapse collapse ${isFirst ? 'show' : ''}"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="row">
      `;

      executives.forEach((exec) => {
        html += `
          <div class="col-md-4 col-6 text-center mb-4">
            ${
              exec.imageUrl
                ? `
              <img
                src="${exec.imageUrl}"
                class="img-fluid rounded-circle"
                style="height: 150px; width: 150px; object-fit: cover;"
                alt="${exec.name}"
                onerror="this.style.display='none'"
              />
            `
                : `
              <div class="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center" 
                   style="height: 150px; width: 150px;">
                <i class="bi bi-person-fill text-white" style="font-size: 4rem;"></i>
              </div>
            `
            }
            <h5 class="mt-2 mb-0 text-main">${exec.name}</h5>
            <p class="fw-bold">${exec.position}</p>
          </div>
        `;
      });

      html += `
              </div>
            </div>
          </div>
        </div>
      `;

      collapseIndex++;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading SRC executives:', error);
    document.getElementById('srcExecutivesContainer').innerHTML =
      '<p class="text-danger">Error loading SRC executives.</p>';
  }
}

// Load executives on page load
loadSrcExecutives();
