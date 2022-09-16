import { useEffect, useState } from 'react'
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import logoImage from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Heading } from '../../components/Heading'

import { API_SERVER_URL } from '../../utils/contants'
import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation();

  useEffect(() => {
    fetchGames()
  }, [])

  async function fetchGames() {
    try {
      const res = await axios(`${API_SERVER_URL}/games`)
      setGames(res.data)
    } catch (err) {
      console.log(err)
      setGames([])
    }
  }


  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImage}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )} />
      </SafeAreaView>
    </Background>
  )
}