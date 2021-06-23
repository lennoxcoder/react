import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


export function Player() {


    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay
    } = useContext(PlayerContext);    

    const episode = episodeList[currentEpisodeIndex]

    
    useEffect( () => {

        if(!audioRef.current) {
            return;
        }

        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [isPlaying]

    )


    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg"/>
                <strong>Tocando agora</strong>
            </header>

            {episode ? (

                <div className={styles.currentEpisode}>
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
                </div>


            ) : (
                
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>

            ) }



            <footer className={!episode ? styles.empty: ''}>
                <div className={styles.progress}>

                    <span>00:00</span>                    
                    <div className={styles.slider}>            
                        
                        {episode ? (
                            <Slider 
                                trackStyle={{backgroundColor: '#04d361'}}/>    
                        ) : (
                            <div className={styles.emptySlider} />
                        ) }

                    </div>
                </div>





                 {episode && ( <audio src={episode.url} ref={audioRef} autoPlay /> )}               



                <div className={styles.buttons}>
                   

                    <button type="button" className={styles.playButton } disabled={!episode} onClick={togglePlay}>

                        {isPlaying ? <img src="/pause.svg"/> : <img src="/play.svg"/> }

                    </button>

                    
                </div>


            </footer>

        </div>
    );
}