import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Header = ({
  mainComponent = null,
  showLeftButton = false,
  showRightButton = false,
  onPressLeft,
  onPressRight,
  leftIcon,
  rightIcon
}) => {

  return (
    <View style={styles.container}>
      <View>
        {showLeftButton &&
          <TouchableOpacity
            onPress={onPressLeft}
            style={styles.leftRightButtons}>
            {leftIcon}
          </TouchableOpacity>
        }
      </View>
      <View style={styles.centerContainer}>
        {mainComponent}
      </View>
      <View>
        {showRightButton &&
          <TouchableOpacity
            onPress={onPressRight}
            style={styles.leftRightButtons}>
            {rightIcon}
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centerContainer:{ justifyContent: 'center', },
  leftRightButtons:{

  }
})