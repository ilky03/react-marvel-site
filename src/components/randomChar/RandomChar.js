import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    componentDidMount() {
        this.updateChar();
    }
    state = {
        char: {},
        loading: true
    }
 
    marvelServices = new MarvelServices();

    onCharLoaded = (newChar) => {
        this.setState({
            char: newChar,
            loading: false
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({loading: true})
        this.marvelServices
            .getCharacter(id)
            .then(this.onCharLoaded)
    }

    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner /> : <ViewBlock char={char} />}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

function ViewBlock({char}) {
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={imgStyle} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description.length > 150 ? description.slice(0, 150) + '... Full description at the link below.' : description : 'No description available'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;