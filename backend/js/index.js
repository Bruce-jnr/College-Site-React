AOS.init();

const cr = document.getElementById('cr-year');
cr.innerText = new Date().getFullYear();

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Load Announcements
async function loadAnnouncements() {
  try {
    const response = await fetch('/api/announcements');
    const announcements = await response.json();
    const container = document.getElementById('announcementsContainer');

    if (announcements.length === 0) {
      container.innerHTML =
        '<p class="text-muted text-center">No announcements at this time.</p>';
      return;
    }

    // Show latest announcement in the same style as hardcoded
    const latest = announcements[0];
    container.innerHTML = `
      <div class="alert bg-success-subtle no-radius border-0 border-start border-success border-4" role="alert">
        <h5 class="alert-heading fw-bold">${latest.title}</h5>
        <p class="small mb-0">${latest.content}</p>
        <p class="mt-1 mb-0 txt-sm text-secondary">
          <i class="bi bi-calendar-month"></i> ${formatDate(latest.date)} |
          <i class="bi bi-person"></i> ${latest.author}
        </p>
      </div>
    `;
  } catch (error) {
    console.error('Error loading announcements:', error);
    document.getElementById('announcementsContainer').innerHTML =
      '<p class="text-danger text-center">Error loading announcements.</p>';
  }
}

// Load News
async function loadNews() {
  try {
    const response = await fetch('/api/news');
    const news = await response.json();
    const container = document.getElementById('newsContainer');

    if (news.length === 0) {
      container.innerHTML =
        '<p class="text-muted text-center">No news at this time.</p>';
      return;
    }

    // Get news with images for featured and right column
    const newsWithImages = news.filter((item) => item.imageUrl);
    const featured = newsWithImages[0] || news[0];
    const rightColumnNews = newsWithImages.slice(1, 3);
    const simpleNews = news
      .filter((item) => !rightColumnNews.includes(item) && item !== featured)
      .slice(0, 3);

    let html = '<div class="row">';

    // Left column - Featured news (col-md-5)
    html += '<div class="col-md-5">';
    if (featured) {
      html += `
        <div class="card no-radius border-0">
          <a href="news-detail.html?id=${
            featured.id
          }" class="text-decoration-none">
            ${
              featured.imageUrl
                ? `<img src="${featured.imageUrl}" class="img-fluid" alt="${featured.title}" />`
                : ''
            }
            <div class="mt-2">
              <p class="card-text mb-0 fs-5 text-secondary fw-bold">${
                featured.title
              }</p>
              <p>${featured.content.substring(0, 150)}${
        featured.content.length > 150 ? '...' : ''
      }</p>
              <span class="text-main small">
                <i class="bi bi-calendar-month text-warning"></i> ${formatDate(
                  featured.date
                )} | 
                <i class="bi bi-person text-warning"></i> ${featured.author} |
                <i class="bi bi-eyeglasses text-warning"></i> Read more
              </span>
            </div>
          </a>
        </div>
      `;
    }
    html += '</div>';

    // Right column - Other news (col-md-7)
    html += '<div class="col-md-7 mt-4 ps-3">';

    // First 2 news with images in card layout
    rightColumnNews.forEach((item, index) => {
      html += `
        <a href="news-detail.html?id=${item.id}" class="text-decoration-none">
          <div class="card mb-3 border-0 border-bottom">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${item.imageUrl}" class="img-fluid" alt="${
        item.title
      }" style="height: 200px; width: auto; object-fit: cover;" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title ${index === 0 ? 'cal-sans' : ''}">${
        item.title
      }</h5>
                  <p class="card-text">
                    <small class="text-body-secondary">
                      <i class="bi bi-calendar-month-fill text-warning"></i> ${formatDate(
                        item.date
                      )} | 
                      <i class="bi bi-person-fill text-warning"></i> ${
                        item.author
                      }
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      `;
    });

    // Remaining news as simple list items
    simpleNews.forEach((item) => {
      html += `
        <hr />
        <a href="news-detail.html?id=${item.id}" class="text-decoration-none">
          <h6 class="mb-0 fs-5">${item.title}</h6>
          <span class="text-secondary">
            <i class="bi bi-calendar-month text-warning"></i> ${formatDate(
              item.date
            )} | 
            <i class="bi bi-person text-warning"></i> ${item.author}
          </span>
        </a>
      `;
    });

    html += '</div>';
    html += '</div>';

    // Add "Explore more news" button
    html += `
      <div class="text-center mt-4">
        <a href="news.html" class="btn btn-outline-primary no-radius">
          Explore more News
        </a>
      </div>
    `;

    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading news:', error);
    document.getElementById('newsContainer').innerHTML =
      '<p class="text-danger text-center">Error loading news.</p>';
  }
}

function loadAllAnnouncements() {
  // This could navigate to a full announcements page
  alert('Full announcements page coming soon!');
}

// Load Admission Status
async function loadAdmissionStatus() {
  try {
    const response = await fetch('/api/admissions/status');
    const status = await response.json();

    const statusContainer = document.getElementById('admissionStatusContainer');
    if (statusContainer) {
      statusContainer.innerHTML = `
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <label class="display-4 text-warning fw-bold ${status.isOpen ? '' : 'd-none'}">
            <i class="bi bi-check-circle"></i> Opened
          </label>
          <label class="display-4 text-warning fw-bold ${status.isOpen ? 'd-none' : ''}">
            <i class="bi bi-x-circle"></i> Closed
          </label>
        </div>
        <label class="fs-5 text-warning">${status.year || '2025/2026'} Admissions ${status.isOpen ? 'Opened' : 'Closed'}</label>
      `;
    }
  } catch (error) {
    console.error('Error loading admission status:', error);
  }
}

// Load content on page load
loadAnnouncements();
loadNews();
loadAdmissionStatus();
