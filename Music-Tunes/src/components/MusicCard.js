import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
    this.saveFavSong = this.saveFavSong.bind(this);
    this.verifyLocalStorage = this.verifyLocalStorage.bind(this);
  }

  componentDidMount() {
    this.verifyLocalStorage();
  }

  async saveFavSong({ target }) {
    this.setState({ loading: true });
    const { allSongs } = this.props;
    const objFavSong = allSongs
      .slice(1).find((sound) => sound.trackId === Number(target.name));
    await addSong(objFavSong);
    this.setState({ loading: false, check: true });
  }

  verifyLocalStorage() {
    const { music: { trackId } } = this.props;
    const local = JSON.parse(localStorage.getItem('favorite_songs'));
    const checkLocal = local.some((music) => music.trackId === trackId);
    if (checkLocal) {
      this.setState({ check: true });
    }
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, check } = this.state;
    if (loading) return <Carregando />;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="inputFav">
          Favorita
          <input
            type="checkbox"
            checked={ check }
            id="inpuFav"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.saveFavSong }
            name={ trackId }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
  allSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
