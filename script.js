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

function getRankByPoints(points) {
    if (points >= 400) return 'S';
    if (points >= 300) return 'A';
    if (points >= 250) return 'B';
    if (points >= 200) return 'C';
    return 'D';
}

function applyRankSystem() {
    const playerRows = document.querySelectorAll('.rank-row');

    playerRows.forEach(row => {
        const roleEl = row.querySelector('.player-role');
        if (!roleEl) return;

        const pointMatch = roleEl.textContent.match(/(\d+)\s*points?/i);
        const points = pointMatch ? parseInt(pointMatch[1], 10) : 0;
        const rank = getRankByPoints(points);

        let rankEl = row.querySelector('.player-rank');
        if (!rankEl) {
            rankEl = document.createElement('div');
            rankEl.className = 'player-rank';
            row.querySelector('.rank-player').appendChild(rankEl);
        }

        rankEl.innerHTML = `<span class="rank-badge ${rank.toLowerCase()}">Rank: ${rank}</span> <span class="rank-points">(${points} pts)</span>`;
    });
}

function sortByPointsDescending() {
    const list = document.querySelector('.rankings-list');
    if (!list) return;

    const rows = Array.from(list.querySelectorAll('.rank-row'));

    rows.sort((a, b) => {
        const pa = (a.querySelector('.player-role').textContent.match(/(\d+)\s*points?/i) || [0, 0])[1];
        const pb = (b.querySelector('.player-role').textContent.match(/(\d+)\s*points?/i) || [0, 0])[1];
        return parseInt(pb, 10) - parseInt(pa, 10);
    });

    rows.forEach(row => list.appendChild(row));
}

function initRankControls() {
    const applyButton = document.getElementById('apply-ranks');
    const sortButton = document.getElementById('sort-points');

    if (applyButton) {
        applyButton.addEventListener('click', () => {
            applyRankSystem();
            applyButton.textContent = 'Ранги установлены';
            applyButton.disabled = true;
        });
    }

    if (sortButton) {
        sortButton.addEventListener('click', () => {
            sortByPointsDescending();
            sortButton.textContent = 'Отсортировано';
            sortButton.disabled = true;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initDragAndDrop();
    initRankControls();
});