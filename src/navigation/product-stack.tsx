import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductViewScreen } from 'src/screens/product-view-screen';

export type ProductStackParam = {
    Product: any;
};

const StackNav = createNativeStackNavigator();

// export const ProductStack: React.FC<any> = () => {
//     return (
//         <StackNav.Navigator screenOptions={{ gestureEnabled: true }}>
//             <StackNav.Screen
//                 name="Product"
//                 component={ProductViewScreen}
//                 options={{ headerShown: false, animationTypeForReplace: 'pop' }}
//             />
//         </StackNav.Navigator>
//     );
// };
