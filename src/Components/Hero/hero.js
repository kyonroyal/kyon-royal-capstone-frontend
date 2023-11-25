// import '../../Components/Hero/hero.scss'

function Hero({currentArtist}) {

    return(
        <section className='hero'>
            <img className='hero__artist' poster={currentArtist.url} alt={currentArtist.name} controls></img>
        </section>
    )
}

export default Hero;