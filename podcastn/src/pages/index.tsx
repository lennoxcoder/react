import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { ptBR } from 'date-fns/locale';
import { GetStaticProps } from 'next';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import styles from './home.module.scss';
import Link from 'next/link';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  episodes: Episode[];
}




export default function Home({episodes}: HomeProps) {

  const {play} = useContext(PlayerContext);
   
  
  return (
    <div className={styles.homepage}>
      
      <section className={styles.allEpisodes}>

        <table cellSpacing="0">

          <thead>

            <tr>
              <th></th>
              <th>PodCast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {episodes.map(episode => {

              return (
                <tr key={episode.id}>
                  <td style={{ width: 100 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      objectFit="cover"
                    />
                  </td>



                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>

                  </td>
                
                  

                  <td>{episode.members}</td>
                  <td style={{ width: 140 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>

                  <td>
                    <button type="button" onClick={() => play(episode)}>
                      <img src="/play-green.svg" />
                    </button>
                  </td>


                </tr>
              )
            })}
          </tbody>


        </table>



      </section>

    </div>
  )
}



export const getStaticProps: GetStaticProps = async () => {

  const response = await api.get('episodes', {
    params: {
      _limit: 10,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const data = response.data;

  // Formatando dados para estarem prontos para o renderizamento
  const episodes = data.map(episode => {

    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url

    };

  })


  return {
    props: {
      episodes,
    },

    revalidate: 60 * 5,
  }

}

