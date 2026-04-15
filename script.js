let data = {};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        
        renderStatus();
        renderRoadmap();
        renderVCs(data.vcs);
        renderSectors();
        renderRecentInvestments(); // 신규 추가
    } catch (error) {
        console.error('Data load failed:', error);
    }

    // Search Interaction
    document.getElementById('vcSearch').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = data.vcs.filter(vc => 
            vc.name.toLowerCase().includes(term) || 
            vc.focus.toLowerCase().includes(term)
        );
        renderVCs(filtered);
    });
});

function renderStatus() {
    const statusCards = document.querySelectorAll('.status-card .value');
    if (statusCards.length >= 3) {
        statusCards[0].textContent = data.market_status.vc_survival_rate;
        statusCards[1].textContent = data.market_status.funds_decrease + ' ↓';
        statusCards[2].textContent = data.market_status.active_vcs_count;
    }
    document.querySelector('.last-updated').textContent = `최종 업데이트: ${data.market_status.last_updated}`;
}

function renderRoadmap() {
    const grid = document.querySelector('.roadmap-grid');
    grid.innerHTML = data.strategy.map(item => `
        <div class="roadmap-card glass">
            <span class="phase">${item.phase}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="focus-tags">
                ${item.focus.map(f => `<span>${f}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderVCs(vclist) {
    const grid = document.getElementById('vcGrid');
    grid.innerHTML = vclist.map(vc => `
        <div class="vc-card glass">
            <h4>${vc.name} <span class="tier-badge">${vc.tier}</span></h4>
            <div class="focus-tags">
                <span>${vc.focus}</span>
            </div>
            <div class="portfolio-list">
                <strong>Main Portfolios:</strong><br>
                <span>${vc.portfolios.join(', ')}</span>
            </div>
        </div>
    `).join('');
}

function renderSectors() {
    const list = document.getElementById('sectorList');
    list.innerHTML = data.sectors.map(s => `
        <div class="sector-item">
            <span>${s.icon} ${s.name}</span>
            <span class="growth-badge">${s.growth}</span>
        </div>
    `).join('');
}

function renderRecentInvestments() {
    if (!data.recent_investments || data.recent_investments.length === 0) return;
    
    // Check if recent investments section exists, if not create it
    let recentSection = document.getElementById('recentInvestments');
    if (!recentSection) {
        const mainContent = document.querySelector('.vc-explorer');
        const header = document.createElement('div');
        header.className = 'section-header';
        header.style.marginTop = '2rem';
        header.innerHTML = '<h2>🚀 최근 시장 투자 현황 (Market-wide)</h2>';
        
        recentSection = document.createElement('div');
        recentSection.id = 'recentInvestments';
        recentSection.className = 'vc-grid';
        
        mainContent.appendChild(header);
        mainContent.appendChild(recentSection);
    }
    
    recentSection.innerHTML = data.recent_investments.slice(0, 8).map(inv => `
        <div class="vc-card glass" style="border-left: 3px solid var(--active-color)">
            <h4>${inv.project} <span class="tier-badge" style="background:#2ecc71">${inv.amount}</span></h4>
            <div class="focus-tags">
                <span>${inv.category}</span>
            </div>
            <div class="portfolio-list">
                <strong>Investors:</strong><br>
                <span>${inv.investors.join(', ')}</span><br>
                <small style="color:#7f8c8d">${inv.date}</small>
            </div>
        </div>
    `).join('');
}
