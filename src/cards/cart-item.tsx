import React from 'react';
import { Flex, Image, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductStackParam } from 'src/navigation/product-stack';
import { DetailedProductData } from 'src/types/products';
import { AntDesign } from '@expo/vector-icons';
import { removeFromCart } from 'src/ducks/cart-slice';
import { useAppDispatch } from 'src/hooks/useful-ducks';

type ProductScreenProps = StackNavigationProp<ProductStackParam, 'Product'>;

interface props {
    cartData: DetailedProductData;
}

export const CartItem: React.FC<props> = ({ cartData }) => {
    const navigation = useNavigation<ProductScreenProps>();

    const dispatch = useAppDispatch();

    return (
        <Flex
            width="90%"
            mt="4"
            height="280"
            borderColor="lightBlue.300"
            backgroundColor="gray.700"
            direction="row"
            alignItems="center"
            justifyContent="center"
            p="3"
            borderRadius={40}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Product', {
                        id: cartData.id,
                    });
                }}
                flexDirection="row"
                alignItems="center">
                <Image
                    borderRadius={40}
                    source={{
                        uri: `${cartData.img}`,
                    }}
                    alt="Alternate Text"
                    size="xl"
                />

                <Flex direction="row" width="60%" justifyContent="space-between">
                    <Text>{cartData.name}</Text>
                    <Text>${cartData.price}</Text>
                    <AntDesign
                        onPress={() => dispatch(removeFromCart(cartData.id))}
                        name="shoppingcart"
                        size={24}
                        color="black"
                    />
                </Flex>
            </Pressable>
        </Flex>
    );
};
