import { useState } from 'react'
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'

import { styles } from './styles'
import { THEME } from '../../theme'

import { Heading } from '../Heading'

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false)

  async function handleCopyToClipboard() {
    setIsCopying(true)
    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord copiado', 'Usuário do discord copiado')
    setIsCopying(false)
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      {...rest}>
      <View style={styles.container}>

        <View style={styles.content}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity
            onPress={handleCopyToClipboard}
            disabled={isCopying}
            style={styles.discordButton}>
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}