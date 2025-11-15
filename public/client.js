document.getElementById('loadBtn').addEventListener('click', async () => {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) {
    alert('Please enter a URL');
    return;
  }

  try {
    const response = await fetch(`/fetch?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const html = await response.text();

    // Show raw HTML in preformatted text
    document.getElementById('sourceView').textContent = html;

    // Inject proxied HTML into iframe using a blob URL
    const blobUrl = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    document.getElementById('liveView').src = blobUrl;

  } catch (error) {
    alert('Error loading page: ' + error.message);
  }
});
