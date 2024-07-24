function filterPlayers() {
  const searchBar = document.getElementById('searchBar');
  const filter = searchBar.value.toLowerCase();
  const playerStats = document.getElementById('playerStats');
  const players = playerStats.getElementsByClassName('player');

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const playerName = player.getElementsByTagName('h2')[0].textContent || player.getElementsByTagName('h2')[0].innerText;
    if (playerName.toLowerCase().indexOf(filter) > -1) {
      player.style.display = '';
    } else {
      player.style.display = 'none';
    }
  }
}
