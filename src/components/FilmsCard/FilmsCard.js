import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import s from './FilmsCard.module.css';

function FilmsCard({ propsForRender, url, onClick, location }) {
    const { genres, overview, title, score, img, release } = propsForRender;

    return (
        <>
            <div className={s.filmsCard_box}>
                <div className={s.poster_box}>
                    <button
                        type="button"
                        className={s.button}
                        onClick={onClick}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/60/60577.png"
                            alt="go back"
                            width='10'
                            hight="10"
                            className={s.button_img}
                        />
                        Go Back
                    </button>
                    <img src={img} alt={title} width='250'></img>
                </div>
                <div className={s.text_box}>
                    <h2>{title} ({release})</h2>
                    <p>User score: {score}</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <p>{genres}</p>
                </div>
            </div>

            <div>
                <NavLink
                    to={{
                        pathname: `${url}/cast`,
                        state: {from: location?.state?.from ?? null}
                    }}
                    exact
                    className={s.link}
                    activeClassName ={s.activeLink}
                >
                    Cast
                </NavLink>

                <NavLink
                    to={{
                        pathname: `${url}/reviews`,
                        state: { from: location?.state?.from ?? null}
                    }}
                    className={s.link}
                    activeClassName ={s.activeLink}
                >
                    Reviews
                </NavLink>
            </div>
        </>
        
    )
}

FilmsCard.propTypes = {
    propsForRender: PropTypes.shape({
        genres: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        score: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        release: PropTypes.string.isRequired
    }),
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default FilmsCard;