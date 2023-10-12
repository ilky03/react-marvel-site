import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';

import './SingleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, getComic } = useMarvelServices();
    const navigate = useNavigate();

    const updateComic = () => {
        if (!comicId) {
            return;
        }
        getComic(comicId)
            .then(loadingComic)
            .catch(() => {
                navigate('/react-marvel-site/404');
            });
    }

    const loadingComic = (comicData) => {
        setComic(comicData);
    }

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const spinner = loading ? <Spinner /> : null;
    const view = !loading && comic ? <View comic={comic} /> : null;

    return (
        <div className='single-comic'>
            {spinner}
            {view}
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

function View({ comic }) {
    const { title, thumbnail, price, description, pageCount, language } = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComicPage;
