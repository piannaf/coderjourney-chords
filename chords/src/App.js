import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { base } from './base';
import Header from './components/Header';
import Footer from './components/Footer';
import ChordEditor from './components/ChordEditor';

class App extends Component {
  constructor() {
    super();
    this.addSong = this.addSong.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.state = {
      songs: { }
    };
  }

  componentWillMount() {
    this.songsRef = base.syncState('songs', {
      context: this,
      state: 'songs'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.songsRef);
  }

  addSong(title) {
    const songs = {...this.state.songs};
    const id = Date.now()
    songs[id] = {
      id: id,
      title: title,
      chordpro: ''
    };

    this.setState({songs});
  }

  updateSong(song) {
    const songs = {...this.state.songs};
    songs[song.id] = song

    this.setState({songs});
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="workspace">
          <BrowserRouter>
            <div className="main-content">
              <Route exact path="/songs" render={(props) => {
                const songIds = Object.keys(this.state.songs)
                return (
                  <ul>
                    {songIds.map((id) => {
                      return (
                        <li key={id}>
                          <Link to={`/songs/${id}`}>Song {id}</Link>
                        </li>
                      )
                    })}
                  </ul>
                )
              }} />
              <Route path="/songs/:songId" render={(props) => {
                const song = this.state.songs[props.match.params.songId];
                return (
                  song
                  ? <ChordEditor song={song} updateSong={this.updateSong} />
                  : <h1>Song not found</h1>
                )
              }} />
            </div>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
