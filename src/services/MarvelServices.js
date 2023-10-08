import {useHttp} from '../hooks/http.hook';

const useMarvelServices = () => {
    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=5c5875686f63a1b3e10b92eb15ddf87c';
    const _offset = 210;

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        let res;
        let idChar = id;
        while(!res) {
            try {
                res = await request(`${_apiBase}characters/${idChar}?${_apiKey}`);
            } catch(e) {
                console.log(e);
                idChar === 1011000 ? idChar = 1011400 : idChar++;
            }
        }
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (char) => {
        console.log(char.prices[0].price);
        return {
            id: char.id,
            title: char.title,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            price: char.prices[0].price
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getComics};
}

export default useMarvelServices;


