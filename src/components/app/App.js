import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

function App() {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path='/react-marvel-site' element={<MainPage />} />
                        <Route path='/react-marvel-site/comics' element={<ComicsPage />} />
                        <Route path='/react-marvel-site/comics/:comicId' element={<SingleComicPage />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
        </Router>
    )

}


export default App;