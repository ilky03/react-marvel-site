import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import useMarvelServices from '../../services/MarvelServices';

const CharList = ({onSelectedChar, selectedId}) => {
    
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210); 
    const {loading, getAllCharacters} = useMarvelServices();

    useEffect(() => {
        onLoading();
    }, []);

    const onLoading = () => {
        getAllCharacters(offset).then(res => {setCharList([...charList, ...res])});
        setOffset(offset + 9);
    }

    const charListArr = charList.map(char => {
        const imgStyle = char.thumbnail.includes('image_not_available') 
                         || char.thumbnail.includes('http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') 
                         ? {objectFit: 'contain'} 
                         : null;
        return (
            <li 
                tabIndex={0}
                className={char.id === selectedId ? "char__item char__item_selected" : "char__item"}
                key={char.id}
                onClick={() => onSelectedChar(char.id)}>
                <img 
                    src={char.thumbnail} 
                    style={imgStyle} 
                    alt={char.name}
                />
                <div className="char__name">
                    {char.name}
                </div>
            </li>
        )
    });

    return (
        <div className="char__list">
            {loading && <Spinner />}
            <ul className="char__grid">
                {charListArr}
            </ul>
            <button 
                className="button button__main button__long" 
                disabled={loading} 
                style={{display: offset > 1563 ? 'none' : 'block'}}
                onClick={onLoading} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    selectedId: PropTypes.number,
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;