import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ScreenNames from '../constant/ScreenNames';
import LocalColors from '../constant/LocalColors';
import CommonStyles from '../constant/CommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemById } from '../redux/selectors';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome6';


const ProductDetails = () => {
  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();
  const count = useSelector((state) => selectItemById(state, product?.id));
  const dispatch = useDispatch()

  const [isLiked, setIsLiked] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddItem = async () => {
    dispatch(addToCart(product))
  };

  const handlerRemoveItem = async () => {
    dispatch(removeFromCart(product))
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <ScrollView>
        <Header
          showLeftButton={true}
          showRightButton={true}
          leftIcon={<Ionicons name="arrow-back-outline" size={30} color="black" />}
          rightIcon={<Ionicons name={isLiked ? 'heart' : "heart-outline"} size={30} color={isLiked ? 'red' : "black"} />}
          onPressLeft={handleBack}
          onPressRight={() => setIsLiked(!isLiked)}
        />
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product?.image,
            }}
            style={styles.image}
            resizeMode='contain'
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.reviewData}>
            <Text><Ionicons name="star" size={16} color={LocalColors.orangeColor} /></Text>
            <Text style={styles.ratingText}>{product?.rating?.rate}</Text>
          </View>
          <View style={styles.reviewBatch}>
            <Text style={styles.reviewCount}>{product?.rating?.count} Reviews</Text>
          </View>
        </View>
        <View style={styles.aboutProject}>
          <Text style={styles.productTitle}>{product?.title}</Text>
          <Text style={styles.desc}>{product?.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text style={{ fontSize: 24, fontWeight: '500' }}>${product?.price}</Text>
        <TouchableOpacity style={styles.mainButton} onPress={handleAddItem} disabled={count?.quantity > 0}>
          {count?.quantity > 0 && <TouchableOpacity onPress={handlerRemoveItem} style={styles.buttonText}>
            <Icon name="minus" size={12} color={LocalColors.textColor} />
          </TouchableOpacity>}
          <Text style={styles.buttonText}>{count?.quantity ? count?.quantity : 'Add to cart'} </Text>
          {count?.quantity > 0 && <TouchableOpacity onPress={handleAddItem} style={styles.buttonText}>
            <Icon name="plus" size={12} color={LocalColors.textColor} />
          </TouchableOpacity>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: '90%',
  },
  imageContainer: { alignItems: 'center', marginTop: 18 },
  contentContainer: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center'
  },
  ratingText: { fontWeight: '300', color: LocalColors.orangeColor },
  reviewBatch: {
    backgroundColor: LocalColors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: CommonStyles.cornerRadius
  },
  reviewCount: { fontWeight: '300', color: LocalColors.black },
  reviewData: { flexDirection: 'row', gap: 8 },
  aboutProject: {
    marginTop: 16,
    gap: 8
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '500'
  },
  desc: {
    fontSize: 13,
    fontWeight: '300'
  },
  buttonContainer: { height: 48, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
  mainButton: {
    backgroundColor: LocalColors.black,
    width:140,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: CommonStyles.cornerRadius,
    flexDirection:'row',
  },
  buttonText: {
    color: LocalColors.textColor,
    padding:10
  }
})