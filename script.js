const data = {
    "market_status": {
        "vc_survival_rate": "10%",
        "funds_decrease": "90%",
        "active_vcs_count": "400개 미만"
    },
    "strategy": [
        {
            "phase": "Phase 1: Foundation",
            "title": "생존자 기반 구축",
            "description": "최근 90% 하락장에서도 생존한 VC들이 집중하는 AI 및 Infra 섹터 초기 프로젝트 선점.",
            "focus": ["AI Infrastructure", "Modular Blockchain", "DePIN"]
        },
        {
            "phase": "Phase 2: Alpha",
            "title": "알파 수익 극대화",
            "description": "a16z, Paradigm 등 Tier-1 VC의 신규 포트폴리오를 추적하여 상장 전 초기 투입 전략.",
            "focus": ["AI Agents", "Zk-ML", "Liquid Restaking"]
        },
        {
            "phase": "Phase 3: Scaling",
            "title": "글로벌 엑시트 및 확장",
            "description": "Hashed 등 아시아-글로벌 가교 VC 네트워크를 통해 글로벌 시장으로 사업 확장 및 이익 확정.",
            "focus": ["Global Expansion", "M&A", "Institutional Exit"]
        }
    ],
    "vcs": [
        {
            "name": "a16z crypto",
            "tier": "Tier 1",
            "focus": "Infrastructure, AI-Crypto",
            "portfolios": ["Optimism", "Lido", "Worldcoin"]
        },
        {
            "name": "Paradigm",
            "tier": "Tier 1",
            "focus": "Frontier Tech, AI",
            "portfolios": ["Uniswap", "Flashbots", "EVMbench"]
        },
        {
            "name": "Hashed",
            "tier": "Tier 1",
            "focus": "Gaming, Modular, L2",
            "portfolios": ["Aptos", "Kroma", "Ondo Finance"]
        },
        {
            "name": "Dragonfly",
            "tier": "Tier 1",
            "focus": "Liquid Tokens",
            "portfolios": ["Celestia", "Monad", "Ethena"]
        },
        {
            "name": "Polychain",
            "tier": "Tier 1",
            "focus": "DePIN, Privacy",
            "portfolios": ["Helium", "Render", "EigenLayer"]
        },
        {
            "name": "Multicoin Capital",
            "tier": "Tier 2",
            "focus": "Solana, DePIN",
            "portfolios": ["Helium", "Render", "Hivemapper"]
        },
        {
            "name": "1kx",
            "tier": "Tier 2",
            "focus": "Web3 Apps, DeFi",
            "portfolios": ["Kulipa", "Cryptio", "Bluff"]
        },
        {
            "name": "Spartan Group",
            "tier": "Tier 2",
            "focus": "APAC, DeFi, Gaming",
            "portfolios": ["LayerZero", "Polygon", "Mythical Games"]
        }
    ],
    "sectors": [
        { "name": "AI + Crypto", "icon": "🤖", "growth": "High" },
        { "name": "DePIN", "icon": "🛰️", "growth": "High" },
        { "name": "Modular Infra", "icon": "🏗️", "growth": "Consistent" },
        { "name": "RWA", "icon": "🏠", "growth": "Rising" },
        { "name": "DeFi 2.0", "icon": "💰", "growth": "Mature" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    renderRoadmap();
    renderVCs(data.vcs);
    renderSectors();

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
