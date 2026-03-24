// Simple drag and drop for tier lists
document.addEventListener('DOMContentLoaded', function() {
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
});