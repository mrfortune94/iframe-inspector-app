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

// Create and add download button after #sourceView if not existing
if (!document.getElementById('downloadBtn')) {
  const downloadBtn = document.createElement('button');
  downloadBtn.id = 'downloadBtn';
  downloadBtn.textContent = 'Download HTML Source';
  const sourceView = document.getElementById('sourceView');
  sourceView.parentNode.insertBefore(downloadBtn, sourceView.nextSibling);

  downloadBtn.onclick = () => {
    const htmlSource = document.getElementById('sourceView').textContent;
    const blob = new Blob([htmlSource], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `iframe_source_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
}
