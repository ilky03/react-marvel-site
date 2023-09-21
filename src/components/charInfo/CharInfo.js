import { useState, useEffect } from 'react';

import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = ({charId}) => {

    const marvelServices = new MarvelServices();

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateChar = () => {
        if (!charId) {
            return;
        }
        setLoading(true);
        marvelServices.getCharacter(charId).then(loadingChar);
    }

    const loadingChar = (char) => {
        setChar(char);
        setLoading(false);
    }

    useEffect(() => {
        updateChar();
    }, [charId]);

    const skeleton = loading || char ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const view = !loading && char ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {view}
        </div>
    )
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;
    const comicList = comics.length === 0 ? 'Not found comics with' : comics.map((item, i) => {
        if (i > 10) {
            return null;
        }
        return (
            <li className="char__comics-item" key={i}>
                {item.name}
            </li>
        )
    });
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;
    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicList}
            </ul>
        </>
    )
}
export default CharInfo;