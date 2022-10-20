import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductViewScreen } from 'src/screens/product-view-screen';
import { ExploreScreen } from 'src/screens/explore-screen';

export type ExploreStackParams = {
    ExploreProducts: undefined,
    Product: {
        id: string;
    };
};

const ExploreNav = createNativeStackNavigator<ExploreStackParams>();

export const ExploreStack: React.FC<{}> = () => {
    return (
        <ExploreNav.Navigator screenOptions={{ gestureEnabled: true }}>
            <ExploreNav.Screen
                name="ExploreProducts"
                component={ExploreScreen}
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
