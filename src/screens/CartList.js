import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { FlatList } from 'react-native'
import Product from '../components/Product'
import { useSelector } from 'react-redux'
import { selectCartItemsQuantity, selectItems } from '../redux/selectors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LocalColors from '../constant/LocalColors'
import CommonStyles from '../constant/CommonStyle'

const CartList = () => {
  const cartData = useSelector((state) => selectCartItemsQuantity(state));
  const totalPrice = cartData.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const EmptyComponent = () => {
    return (<View style={styles.emptyComponent}>
      <Text style={{ fontSize: 18, fontWeight: '400' }}>Products not available</Text>
    </View>)
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        <Header
          mainComponent={<Text></Text>}
          showLeftButton={true}
          showRightButton={true}
          rightIcon={<Ionicons name="cart-outline" size={30} color="black" />}
          leftIcon={<Ionicons name="menu-outline" size={30} color="black" />}
        />
        <View>
          <Text style={styles.subHeaderText}>Your cart</Text>
        </View>
        <View style={{ flex: 1, marginTop: 16 }}>
          <FlatList
            data={cartData}
            renderItem={({ item }) => (
              <Product item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            scrollEnabled
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={EmptyComponent}
          />
        </View>
      </View>
      <View style={styles.cartViewButton}>
        <View>
          <Text style={styles.footerTitle}>Total amount</Text>
          <Text style={styles.footerSubTitle}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={{ color: LocalColors.white }}>Place order</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CartList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subHeaderText: { fontSize: 23, fontWeight: '500' },
  cartViewButton: {
    backgroundColor: LocalColors.white,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.2,
    padding: 16,
    flexDirection: 'row'
  },
  footerTitle: { color: LocalColors.black, fontWeight: '300' },
  footerSubTitle: { color: LocalColors.black, fontSize: 18, fontWeight: '400' },
  mainButton: {
    backgroundColor: LocalColors.black,
    paddingHorizontal: 36,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CommonStyles.cornerRadius
  },
  emptyComponent: { flex: 1, alignItems: 'center', justifyContent: 'center', },

})