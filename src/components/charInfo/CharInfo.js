import { useState, useEffect } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);

    const {loading, getCharacter} = useMarvelServices();
    
    const updateChar = () => {
        if (!charId) {
            return;
        }
        getCharacter(charId).then(loadingChar);
    }

    const loadingChar = (char) => {
        setChar(char);
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
    const comicList = comics.length === 0 ? 'Not found comics with this character :(' : comics.map((item, i) => {
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