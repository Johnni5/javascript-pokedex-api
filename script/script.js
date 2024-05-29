async function fetchData() {
  const resp = await fetch(
    `https://www.openthesaurus.de/synonyme/search?q=test&format=application/json`
  );
  const dataJSON = await resp.json();

  displayData(dataJSON['synsets'][0]['terms']);
}

function displayData(data) {
  const content = document.getElementById('result');
  content.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    content.innerHTML += `<p class="term"></p>`;
  }
}
