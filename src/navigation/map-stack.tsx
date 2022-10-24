import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductViewScreen } from 'src/screens/product-view-screen';
import { ExploreScreen } from 'src/screens/explore-screen';
import { MapViewScreen } from 'src/screens/map-view-screen';

export type MapStackParams = {
    MapExploreProducts: undefined;
    Product: {
        id: string;
    };
};

const ExploreNav = createNativeStackNavigator<MapStackParams>();

export const MapStack: React.FC<{}> = () => {
    return (
        <ExploreNav.Navigator screenOptions={{ gestureEnabled: true }}>
            <ExploreNav.Screen
                name="MapExploreProducts"
                component={MapViewScreen}
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
