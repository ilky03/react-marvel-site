import { Link } from 'react-router-dom';

import spiderman from '../../resources/img/spiderman.png'

function Page404() {
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', fontSize: '50px'}}>
                <img src={spiderman} alt="spider man" height='400' width='auto'/>
                <h3>404 <br/> Page not found</h3>
            </div>
            <button className="button button__main button__long">
                <div className="inner"><Link to="/react-marvel-site">Back to main page</Link></div>
            </button>       
        </>
)
}

export default Page404;