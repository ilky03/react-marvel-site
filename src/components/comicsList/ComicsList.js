import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';

import Spinner from '../spinner/Spinner';
import './comicsList.scss';



const ComicsList = () => {

    const [comicsList, setComicList] = useState([]);
    const [offset, setOffset] = useState(216); 
    const {loading, getComics} = useMarvelServices();

    useEffect(() => {
        onLoading();
    }, [])

    const onLoading = () => {
        getComics(offset).then(res => {setComicList([...comicsList, ...res])});
        setOffset(offset + 8);
    }


    const comicsListArr = comicsList.map(comics => {
        const {id, title, price, thumbnail} = comics;
        const imgStyle = thumbnail.includes('image_not_available') 
                         || thumbnail.includes('http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') 
                         ? {objectFit: 'cover'} 
                         : null;

        return (
            <li className="comics__item" key={id}>
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={title} className="comics__item-img" style={imgStyle}/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price ? price + '$' : 'NOT AVAILABLE'}</div>
                </Link>
            </li>
        )
    })

    return (
        <div className="comics__list">
            {loading && <Spinner />}
            <ul className="comics__grid">
                {comicsListArr}
            </ul>
            <button className="button button__main button__long">
                <div className="inner" disabled={loading} onClick={onLoading}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;