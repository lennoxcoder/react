import {Children, createContext, useState, ReactNode} from 'react';

type Episode = {
    title:string;
    members:string;
    thumbnail:string;
    duration: number;
    url: string; 
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    togglePlay: () => void;
    play: (episode: Episode) => void;
};



export const PlayerContext = createContext({} as PlayerContextData);


type PropsType = {
  children: ReactNode;
};

export function PlayerContextProvider({children}:PropsType) {

const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);


  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }


  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
        <PlayerContext.Provider 
        value={{ 
          episodeList, 
          currentEpisodeIndex, 
          play, 
          isPlaying,
          togglePlay}}>

            {children}

        </PlayerContext.Provider>
    )

}