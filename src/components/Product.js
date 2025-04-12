import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, } from '../redux/cartSlice';
import { selectItemById } from '../redux/selectors';
import LocalColors from '../constant/LocalColors';
import CommonStyles from '../constant/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../constant/ScreenNames';

const Product = ({ item = [] }) => {
  const navigation = useNavigation();
  const count = useSelector((state) => selectItemById(state, item?.id));

  const dispatch = useDispatch()

  const handleAddItem = async () => {
    dispatch(addToCart(item))
  };

  const handlerRemoveItem = async () => {
    dispatch(removeFromCart(item))
  };

  const navToDetails = () => {
    navigation.navigate(ScreenNames.ProductDetails, { product: item });
  };

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={navToDetails}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.image}
          resizeMode='contain'
        />
        <View style={styles.touchableContent}>
          <Text style={{ fontWeight: '600' }}>{item?.title}</Text>
          <Text style={{ fontWeight: '400' }}>${item?.price}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.productData}>
        <TouchableOpacity style={styles.productButton} onPress={handleAddItem} disabled={count?.quantity > 0}>
          {count?.quantity > 0 && <TouchableOpacity onPress={handlerRemoveItem} style={styles.buttonText}>
            <Icon name="minus" size={12} color={LocalColors.textColor} />
          </TouchableOpacity>}
          <Text style={styles.buttonText}>{count?.quantity ? count?.quantity : 'Add Item'} </Text>
          {count?.quantity > 0 && <TouchableOpacity onPress={handleAddItem} style={styles.buttonText}>
            <Icon name="plus" size={12} color={LocalColors.textColor} />
          </TouchableOpacity>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Product

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 12,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: CommonStyles.cornerRadius,
    gap: 8,
    justifyContent: 'space-around'
  },
  image: {
    width: '100%',
    height: 140
  },
  productData: { alignItems: 'center', justifyContent: 'center', gap: 8, },
  productButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LocalColors.black,
    borderRadius: CommonStyles.cornerRadius,
    width: '80%',

  },
  buttonText: {
    color: LocalColors.textColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  touchableContent:{ alignItems: 'center', justifyContent: 'center', marginTop:8 }
});