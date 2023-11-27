// import '../../Components/Hero/hero.scss'

function Hero({currentArtist}) {

    return(
        <section className='hero'>
            <img className='hero__artist' src={currentArtist.profileImage} alt={currentArtist.name} controls></img>
        </section>
    )
}

export default Hero;