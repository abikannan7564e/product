import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItemsQuantity, getAllProductCategories, getProductsByCategory } from '../redux/selectors';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../constant/ScreenNames';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fetchProducts } from '../redux/productsSlice';
import LocalColors from '../constant/LocalColors';

const ProductList = () => {
  const [choosedCategory, setChoosedCategory] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const countCheck = useSelector((state) => selectCartItemsQuantity(state));
  const categories = useSelector((state) => getAllProductCategories(state));
  const filteredProducts = useSelector((state) => getProductsByCategory(state, choosedCategory));
  const { items: products, loading, error } = useSelector((state) => state.products)
  console.log('Products in list: ', filteredProducts);

  const chooseCategory = (category) => {
    if(category === choosedCategory) setChoosedCategory(null);
    else setChoosedCategory(category);
  };

  const EmptyComponent = () => {
    return (<View style={styles.emptyComponent}>
      <Text style={{ fontSize: 18, fontWeight: '400' }}>Products not available</Text>
    </View>)
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Header
          mainComponent={<Text></Text>}
          showLeftButton={true}
          showRightButton={true}
          rightIcon={<Ionicons name="cart-outline" size={30} color="black" />}
          leftIcon={<Ionicons name="menu-outline" size={30} color="black" />}
        />
        <View>
          <Text style={styles.subHeaderText}>Discover products</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={
                  [styles.filterBatch,
                  { backgroundColor: item === choosedCategory ? LocalColors.black : LocalColors.lightGray }]
                }
                onPress={() => chooseCategory(item)}>
                <Text style={
                  { fontSize: 14, color: item === choosedCategory 
                  ? LocalColors.white 
                  : LocalColors.black 
                  }}>{item}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            refreshing={loading}
          />
        </View>

        <View style={{ flex: 1, marginTop: 8 }}>
          {loading
            ? <ActivityIndicator size={'large'} color={'black'} />
            : <FlatList
              data={choosedCategory ? filteredProducts : products}
              renderItem={({ item }) => (
                <Product item={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              scrollEnabled
              ListEmptyComponent={EmptyComponent}
              onRefresh={() => dispatch(fetchProducts())}
              refreshing={loading}
              contentContainerStyle={{ paddingBottom: 100 }}
            />}
        </View>

      </View>
      {countCheck && countCheck.length > 0 && <TouchableOpacity style={styles.cartViewButton} onPress={() => navigation.navigate(ScreenNames.CartList)}>
        <View style={styles.cartButtonContainer}>
          <Text style={{ color: 'white', fontSize: 18 }}> {countCheck.length} items added</Text>
          <Icon name="angle-right" size={30} color="white" />
        </View>
        <Text style={{ color: 'white', fontSize: 12 }}>Click to view the added items</Text>
      </TouchableOpacity>}
    </View>
  )
};

export default ProductList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartViewButton: {
    backgroundColor: LocalColors.brown, height: 70, borderTopLeftRadius: 20,
    borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center',
  },
  cartButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  subHeaderText: { fontSize: 23, fontWeight: '500' },
  contentContainer: { flex: 1, padding: 16, gap: 16 },
  emptyComponent: { flex: 1, alignItems: 'center', justifyContent: 'center', },
  filterBatch: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10
  }
})