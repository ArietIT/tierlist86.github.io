// Simple drag and drop for tier lists
function initDragAndDrop() {
    const items = document.querySelectorAll('.items img');
    const tiers = document.querySelectorAll('.tier .items');

    items.forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', dragStart);
    });

    tiers.forEach(tier => {
        tier.addEventListener('dragover', dragOver);
        tier.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.src);
        e.dataTransfer.effectAllowed = 'move';
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function drop(e) {
        e.preventDefault();
        const src = e.dataTransfer.getData('text/plain');
        const img = document.querySelector(`img[src="${src}"]`);
        if (img && e.target.classList.contains('items')) {
            e.target.appendChild(img);
        }
    }
}

function getTierPoints(badge) {
    const pointsMap = {
        'HT1': 70,
        'HT2': 60,
        'HT3': 50,
        'LT1': 40,
        'LT2': 30,
        'LT3': 20,
        'LT4': 10,
        'LT5': 5
    };
    return pointsMap[badge] || 0;
}

function getRankByPoints(points) {
    if (points >= 400) return 'S';
    if (points >= 300) return 'A';
    if (points >= 250) return 'B';
    if (points >= 200) return 'C';
    return 'D';
}

function applyRankSystem() {
    console.log('Applying rank system...');
    const playerRows = document.querySelectorAll('.rank-row');
    console.log('Found player rows:', playerRows.length);

    playerRows.forEach((row, index) => {
        const tierBadges = row.querySelectorAll('.tier-badge');
        let totalPoints = 0;

        tierBadges.forEach(badge => {
            const badgeText = badge.textContent.trim();
            const points = getTierPoints(badgeText);
            console.log(`Player ${index + 1}, badge: ${badgeText}, points: ${points}`);
            totalPoints += points;
        });

        const rank = getRankByPoints(totalPoints);
        console.log(`Player ${index + 1}, total points: ${totalPoints}, rank: ${rank}`);

        let rankEl = row.querySelector('.player-rank');
        if (!rankEl) {
            rankEl = document.createElement('div');
            rankEl.className = 'player-rank';
            row.querySelector('.rank-player').appendChild(rankEl);
        }

        rankEl.innerHTML = `<span class="rank-badge ${rank.toLowerCase()}">Rank: ${rank}</span> <span class="rank-points">(${totalPoints} pts)</span>`;
    });
    console.log('Rank system applied.');
}

function sortByPointsDescending() {
    const list = document.querySelector('.rankings-list');
    if (!list) return;

    const rows = Array.from(list.querySelectorAll('.rank-row'));

    rows.sort((a, b) => {
        const tierBadgesA = a.querySelectorAll('.tier-badge');
        const tierBadgesB = b.querySelectorAll('.tier-badge');
        let pointsA = 0, pointsB = 0;

        tierBadgesA.forEach(badge => {
            pointsA += getTierPoints(badge.textContent.trim());
        });
        tierBadgesB.forEach(badge => {
            pointsB += getTierPoints(badge.textContent.trim());
        });

        return pointsB - pointsA;
    });

    rows.forEach(row => list.appendChild(row));
}

function initRankControls() {
    const applyButton = document.getElementById('apply-ranks');
    const sortButton = document.getElementById('sort-points');

    console.log('Initializing rank controls...');
    console.log('Apply button found:', !!applyButton);
    console.log('Sort button found:', !!sortButton);

    if (applyButton) {
        applyButton.addEventListener('click', () => {
            console.log('Apply ranks button clicked');
            applyRankSystem();
            applyButton.textContent = 'Ранги установлены';
            applyButton.disabled = true;
        });
    }

    if (sortButton) {
        sortButton.addEventListener('click', () => {
            console.log('Sort points button clicked');
            sortByPointsDescending();
            sortButton.textContent = 'Отсортировано';
            sortButton.disabled = true;
        });
    }
}

function initSearch() {
    const searchInput = document.querySelector('.search-block input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const rows = document.querySelectorAll('.rank-row');

        rows.forEach(row => {
            const playerName = row.querySelector('.player-name');
            if (!playerName) return;

            const nameText = playerName.textContent.toLowerCase();
            if (nameText.includes(query)) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    initRankControls();
    initSearch();
});