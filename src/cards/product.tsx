import React from 'react';

import { Flex, Image, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductStackParam } from 'src/navigation/product-stack';
import { BasicProductData, DetailedProductData } from 'src/types/products';

type ProductScreenProps = StackNavigationProp<ProductStackParam, 'Product'>;

interface props {
    productData: BasicProductData;
    // cartData: DetailedProductData;
}

export const Product: React.FC<props> = ({ productData }) => {
    const navigation = useNavigation<ProductScreenProps>();
    // const locateProduct = (id) => {};

    return (
        <Flex
            // this is the format to make a button
            width="90%"
            // maxHeight="100%"
            borderColor="lightBlue.300"
            backgroundColor="gray.700"
            direction="row"
            alignItems="center"
            // justifyContent="center"
            p="3"
            borderRadius={40}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Product', {
                        id: productData.id,
                    });
                }}
                // onPress={() => locateProduct(props.id)}
                flexDirection="row"
                alignItems="center">
                <Image
                    borderRadius={40}
                    source={{
                        uri: `${productData.img}`,
                    }}
                    alt="Alternate Text"
                    size="xl"
                />

                <Flex direction="row" width="60%" justifyContent="space-between">
                    <Text>{productData.name}</Text>
                    <Text>${productData.price}</Text>
                </Flex>
            </Pressable>
        </Flex>
    );
};
