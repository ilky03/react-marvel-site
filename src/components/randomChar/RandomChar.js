import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import useMarvelServices from '../../services/MarvelServices';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {loading, getCharacter} = useMarvelServices();

    useEffect(() => {
       updateChar();
    }, []);

    const onCharLoaded = (newChar) => {
        setChar(newChar);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(onCharLoaded)
    }

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
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

function ViewBlock({char}) {
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgStyle = thumbnail ? thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null : null;
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