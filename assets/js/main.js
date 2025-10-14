
// small script that gracefully populates the publication list (creates a friendly fallback if data is missing)
document.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('publication-list');
    if (!list) return;

    try {
        const resp = await fetch('data/publications.json');
        if (!resp.ok) throw new Error('No publications.json (HTTP ' + resp.status + ')');
        const pubs = await resp.json();
        if (!Array.isArray(pubs) || pubs.length === 0) throw new Error('Empty or invalid publications.json');

        pubs.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.authors || 'Unknown'} (${p.year || 'n.d.'}). ${p.title || 'Untitled'}${p.journal ? '. ' + p.journal : ''}`;
            list.appendChild(li);
        });
    } catch (err) {
        list.innerHTML = '<li>No publications found. Create data/publications.json or check console for errors.</li>';
        console.warn('Could not load publications.json:', err);
    }
});
// ...existing code...