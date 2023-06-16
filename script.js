document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.getElementById('filter-btn');
  const inputText = document.getElementById('input-text');
  const filteredText = document.getElementById('filtered-text');
  const copyBtn = document.getElementById('copy-btn');

  filterBtn.addEventListener('click', () => {
    const text = inputText.value;
    filterInappropriateWords(text)
      .then(filtered => {
        filteredText.innerText = filtered;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  copyBtn.addEventListener('click', () => {
    const textToCopy = filteredText.innerText;
    if (textToCopy) {
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = textToCopy;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
    }
  });

  async function filterInappropriateWords(text) {
    const encodedText = encodeURIComponent(text);
    const response = await fetch(`https://www.purgomalum.com/service/json?text=${encodedText}`);
    const data = await response.json();
    return data.result;
  }
});
