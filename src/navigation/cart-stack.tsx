import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductViewScreen } from 'src/screens/product-view-screen';
import { ExploreScreen } from 'src/screens/explore-screen';
import { MapViewScreen } from 'src/screens/map-view-screen';
import { CartScreen } from 'src/screens/cart-screen';

export type CartStackParams = {
    CartProducts: undefined;
    Product: {
        id: string;
    };
};

const ExploreNav = createNativeStackNavigator<CartStackParams>();

export const CartStack: React.FC<{}> = () => {
    return (
        <ExploreNav.Navigator screenOptions={{ gestureEnabled: true }}>
            <ExploreNav.Screen
                name="CartProducts"
                component={CartScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <ExploreNav.Screen
                name="Product"
                component={ProductViewScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
        </ExploreNav.Navigator>
    );
};
