import React from 'react';
import { Box, Button, ScrollView, Flex, Text } from 'native-base';
import { CartItem } from 'src/cards/cart-item';
import { useAppSelector } from 'src/hooks/useful-ducks';

export const CartScreen = () => {
   

    const cart = useAppSelector((state) => state.cart);

    return (
        <>
            {cart.cart.length > 0 ? (
                <ScrollView h="100%">
                    <Flex justifyContent="space-between">
                        <>
                            <Box alignItems="center" justifyContent="center">
                                {cart.cart.map((el) => {
                                    return <CartItem key={el.id} cartData={el} />;
                                })}
                            </Box>
                            <Button mt="10">CheckOut</Button>
                        </>
                    </Flex>
                </ScrollView>
            ) : (
                <Box
                    w="100%"
                    h="100%"
                    bgColor="background.100"
                    flex={1}
                    alignItems="center"
                    justifyContent="center">
                    <Text>Please Add something to Cart</Text>
                </Box>
            )}
        </>
    );
};
