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

// Load All News
async function loadAllNews() {
  try {
    const response = await fetch('/api/news');
    const news = await response.json();
    const container = document.getElementById('newsContainer');

    if (news.length === 0) {
      container.innerHTML =
        '<p class="text-muted text-center">No news at this time.</p>';
      return;
    }

    let html = '<div class="row">';

    news.forEach((item, index) => {
      if (item.imageUrl) {
        // News with image
        html += `
                <div class="col-md-6 mb-4">
                  <div class="card no-radius border-0">
                    <a href="news-detail.html?id=${
                      item.id
                    }" class="text-decoration-none">
                      <img src="${item.imageUrl}" class="img-fluid" alt="${
          item.title
        }" />
                      <div class="mt-2">
                        <p class="card-text mb-0 fs-5 text-secondary fw-bold">${
                          item.title
                        }</p>
                        <p>${item.content.substring(0, 150)}${
          item.content.length > 150 ? '...' : ''
        }</p>
                        <span class="text-main small">
                          <i class="bi bi-calendar-month text-warning"></i> ${formatDate(
                            item.date
                          )} | 
                          <i class="bi bi-person text-warning"></i> ${
                            item.author
                          }
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              `;
      } else {
        // News without image
        html += `
                <div class="col-md-6 mb-4">
                  <a href="news-detail.html?id=${
                    item.id
                  }" class="text-decoration-none">
                    <div class="card border-0 border-bottom">
                      <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
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
                        <button class="btn btn-outline-primary btn-sm">Read More</button>
                      </div>
                    </div>
                  </a>
                </div>
              `;
      }
    });

    html += '</div>';
    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading news:', error);
    document.getElementById('newsContainer').innerHTML =
      '<p class="text-danger text-center">Error loading news.</p>';
  }
}

// Load news on page load
loadAllNews();
