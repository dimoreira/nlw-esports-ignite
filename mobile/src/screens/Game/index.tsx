import { useEffect, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View, ScrollView, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'

import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'
import { DuoMatch } from '../../components/DuoMatch'

import { THEME } from '../../theme'
import { styles } from './styles'
import { GameParams } from '../../types/navigation'
import logoImage from '../../assets/logo-nlw-esports.png'
import { API_SERVER_URL } from '../../utils/contants'



export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [duoSelected, setDuoSelected] = useState('');
  const route = useRoute()
  const game = route.params as GameParams

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetchAds()
  }, [])

  async function fetchAds() {
    const res = await axios(`${API_SERVER_URL}/games/${game.id}/ads`)
    setDuos(res.data)
  }

  async function getDiscordUser(adId: string) {
    const res = await axios(`${API_SERVER_URL}/ads/${adId}/discord`)
    setDuoSelected(res.data.discord)
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <ScrollView
          alwaysBounceHorizontal={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          contentInset={{ bottom: 64 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo
                name="chevron-thin-left"
                size={20}
                color={THEME.COLORS.CAPTION_300}
              />
            </TouchableOpacity>

            <Image
              source={logoImage}
              style={styles.logo}
            />

            <View style={styles.emptyRight} />
          </View>

          <Image
            source={{ uri: game.bannerUrl }}
            resizeMode="cover"
            style={styles.cover}
          />

          <Heading
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
          />

          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyContentList]}
            renderItem={({ item, index }) => (
              <DuoCard
                data={duos[index]}
                onConnect={() => getDiscordUser(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
          />

          <DuoMatch
            visible={duoSelected.length > 0}
            discord={duoSelected}
            onClose={() => setDuoSelected('')}
          />
        </ScrollView>

      </SafeAreaView>
    </Background>
  )
}