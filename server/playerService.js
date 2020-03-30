const Lobby = require('./lobby');
const Player = require('./Player');

class PlayerService {
  constructor() {
    this.players = {};
    this.lobbies = {};
  }

  createPlayer(socket) {
    let player = new Player(socket);
    this.players[player.id] = player;
  }

  destroyPlayer(socket) {
    let player = this.players[socket.id];
    if (player.lobby != undefined) {
      leaveLobby(socket);
    }
    delete this.players[socket.id];
  }

  createLobby() {
    let lobby = new Lobby(this);
    this.lobbies[lobby.id] = lobby;
    return lobby;
  }

  joinLobby(socket, lobbyId) {
    let player = this.players[socket.id];
    player.lobby = lobbyId;
    this.lobbies[lobbyId].addPlayer(socket, player);
  }

  leaveLobby(socket) {
    let player = this.players[socket.id];
    this.lobbies[player.lobby].removePlayer(socket)
  }

  updatePerson(socket) {

  }

  emitData() {
    let data = {};
    for (var [id, player] of Object.entries(this.players)) {
      data[player.id] = player.lobby;
    }
    return data;
  }
}

module.exports = PlayerService;