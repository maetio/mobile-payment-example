import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ExploreScreen } from 'src/screens';
import { ProfileScreen } from 'src/screens/profile-screen';
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { CartScreen } from 'src/screens/cart-screen';
import { HomeStackNavigator } from './home-stack';

import { ExploreStack } from 'src/navigation/explore-stack';
import { MapViewScreen } from 'src/screens/map-view-screen';

import { MapStack } from 'src/navigation/map-stack';
import { CartStack } from 'src/navigation/cart-stack';

export type BottomTabParams = {
    HomeTab: undefined;
    Explore: undefined;
    Profile: undefined;
    Cart: undefined;
    Map: undefined;
    MapTest: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabParams>();

/*
    Define Icons
*/
interface TabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}
const HomeIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
);

const ExploreIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialIcons name={focused ? 'search' : 'search'} color={color} size={size} />
);

const ProfileIcon = ({ focused, color, size }: TabBarIconProps) => (
    <AntDesign name={focused ? 'user' : 'user'} color={color} size={size} />
);

const CartIcon = ({ focused, color, size }: TabBarIconProps) => (
    <AntDesign name={focused ? 'shoppingcart' : 'shoppingcart'} color={color} size={size} />
);

const MapIcon = ({ focused, color, size }: TabBarIconProps) => (
    <Entypo name={focused ? 'map' : 'map'} color={color} size={size} />
);

export const BottomTabNavigator: React.FC<{}> = () => {
    return (
        <Tabs.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
            {/* <Tabs.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{
                    title: 'Home',
                    headerTitle: 'Home',
                    headerShown: false,
                    tabBarIcon: HomeIcon,
                }}
            /> */}

            {/* <Tabs.Screen
                name="Explore"
                component={ExploreStack}
                options={{
                    headerTitle: 'Explore',
                    tabBarIcon: ExploreIcon,
                }}
            /> */}

            {/* <Tabs.Screen
                name="Cart"
                component={CartStack}
                options={{
                    headerTitle: 'Cart',
                    tabBarIcon: CartIcon,
                }}
            /> */}

            <Tabs.Screen
                name="MapTest"
                component={MapStack}
                options={{
                    headerTitle: 'MapTest',
                    tabBarIcon: MapIcon,
                }}
            />

            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitle: 'Profile',
                    tabBarIcon: ProfileIcon,
                }}
            />
        </Tabs.Navigator>
    );
};
