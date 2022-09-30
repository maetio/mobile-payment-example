import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text, Link } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { signOutUser } from 'src/firebase/auth-api';
import { signOut } from 'src/ducks/user-slice';
import { HomeStackParams } from 'src/navigation/home-stack';

/*
    Define Screen Typee
*/
type HomeScreenProps = StackNavigationProp<HomeStackParams, 'Home'>;

export const HomeScreen: React.FC<any> = () => {
    // navigation
    const navigation = useNavigation<HomeScreenProps>();

    // redux handlers
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    // handling button functions
    // const handleLoginButton = async () => {
    //     if (user.loggedIn) {
    //         await signOutUser();
    //         dispatch(signOut());
    //     } else {
    //         navigation.navigate('Auth');
    //     }
    // };

    return (
        <Box
            w="100%"
            h="100%"
            bgColor="background.100"
            flex={1}
            alignItems="center"
            justifyContent="center">
            <Link href="https://nativebase.io">Click here to open documentation.</Link>
            {/* <Box py={3}>
                <Text color="plainText.800" bold>
                    Really fun user data counter: {user.count}
                </Text>
                <Button m={2} onPress={() => dispatch(incrementCount())}>
                    Increment Count
                </Button>
                <Button m={2} onPress={() => dispatch(decrementCount())}>
                    Decrement Count
                </Button>
            </Box> */}
        </Box>
    );
};
