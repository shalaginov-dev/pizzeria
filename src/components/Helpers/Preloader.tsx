import s from './Preloader.module.scss'

function Preloader () {
    return (
        <div className={s.preloaderWrapper}>
            <div className={s.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Preloader