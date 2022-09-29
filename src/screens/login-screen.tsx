// import React, { useState } from 'react';
// import {
//     Box,
//     VStack,
//     Button,
//     Text,
//     useToast,
//     FormControl,
//     Heading,
//     HStack,
//     Icon,
// } from 'native-base';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { signupSchema, loginSchema } from 'src/utils/schemas';
// import { FormInput } from 'src/components/user-input';
// import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
// import {
//     resetPassword,
//     signInWithEmail,
//     signUpWithEmail,
//     verifyEmail,
// } from 'src/firebase/auth-api';
// import { AuthStackParams } from 'src/navigation/auth-stack';
// import { ScreenParams } from 'src/types/screen';
// import { AlertToast } from 'src/components/feedback/alert-toast';
// import { User } from 'src/types/user';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useAppDispatch } from 'src/hooks/useful-ducks';
// import { emailSignIn } from 'src/ducks/user-slice';

// type LoginScreenProps = StackNavigationProp<AuthStackParams, 'AuthEmail'>;

// export const LoginScreen: React.FC<ScreenParams> = ({ route }) => {
//     // route params
//     const { signInMethods } = route.params;
//     const { email } = route.params;

//     // hooks
//     const navigation = useNavigation<LoginScreenProps>();
//     const dispatch = useAppDispatch();
//     const toast = useToast();
//     const schema = signInMethods.length ? loginSchema : signupSchema;
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     // react states
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');

//     // rendering functions
//     const renderPasswordToast = () => (
//         <AlertToast
//             title="Email Sent!"
//             type="success"
//             message={`Password reset instructions sent to ${email}.`}
//             toExit={() => toast.close('resetToast')}
//         />
//     );
//     const renderVerificationToast = () => (
//         <AlertToast
//             title="Email Sent!"
//             type="success"
//             message={`Verification email sent to ${email}.`}
//             toExit={() => toast.close('verificationToast')}
//         />
//     );

//     // navigate back if not root auth screen
//     const handleNavigation = () => {
//         const parentNavigator = navigation.getParent();
//         if (parentNavigator?.getId() !== 'root') {
//             parentNavigator?.goBack();
//         }
//     };

//     // handle login
//     const handleLogin = async (data: any) => {
//         setIsLoading(true);
//         try {
//             const { user } = await signInWithEmail(email, data.password);
//             const newUser: User = {
//                 uid: user.uid,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 isAnonymous: false,
//                 emailVerified: user.emailVerified,
//                 loggedIn: true,
//             };
//             dispatch(emailSignIn(newUser));
//             reset();
//             handleNavigation();
//         } catch (e: any) {
//             console.log(`Error with login: ${e}`);
//             setError(e.message);
//             setIsLoading(false);
//         }
//     };

//     // handle sign up
//     const handleSignup = async (data: any) => {
//         setIsLoading(true);
//         try {
//             const { user } = await signUpWithEmail(email, data.password);
//             const newUser: User = {
//                 uid: user.uid,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 isAnonymous: false,
//                 emailVerified: user.emailVerified,
//                 loggedIn: true,
//             };
//             dispatch(emailSignIn(newUser));
//             await verifyEmail();
//             toast.show({
//                 placement: 'top',
//                 render: renderVerificationToast,
//                 id: 'verificationToast',
//             });
//             reset();
//             handleNavigation();
//         } catch (e: any) {
//             console.log(`Error with sign up: ${e}`);
//             setError(e.message);
//             setIsLoading(false);
//         }
//     };

//     // handle password reset
//     const handlePasswordReset = async () => {
//         try {
//             await resetPassword(email);
//             toast.show({
//                 placement: 'top',
//                 render: renderPasswordToast,
//                 id: 'resetToast',
//             });
//             reset();
//         } catch (e: any) {
//             console.log(`Error with password reset: ${e}`);
//             setError(e.message);
//             setIsLoading(false);
//         }
//     };

//     return (
//         <KeyboardBehaviorWrapper bounces={false} centerVertically>
//             <Box px="10" w="100%" h="100%" bgColor="background.100" safeArea>
//                 <VStack space={3} w="100%">
//                     <FormControl>
//                         <HStack
//                             alignItems="center"
//                             justifyContent="space-between"
//                             w="100%"
//                             flex={1}
//                             py={5}>
//                             <Box pr={3}>
//                                 <Icon
//                                     as={MaterialIcons}
//                                     name="lock-outline"
//                                     size={50}
//                                     color="plainText.800"
//                                 />
//                             </Box>
//                             <Heading
//                                 flex={1}
//                                 textAlign="left"
//                                 color="plainText.800"
//                                 alignSelf="center">
//                                 {!signInMethods.length
//                                     ? 'Please create your account password.'
//                                     : 'Enter your password to login.'}
//                             </Heading>
//                         </HStack>
//                         {!signInMethods.length ? (
//                             <>
//                                 <FormInput
//                                     key="password"
//                                     name="password"
//                                     control={control}
//                                     isInvalid={'password' in errors}
//                                     password
//                                     label="Enter your password"
//                                     placeholder="Password"
//                                     defaultValue=""
//                                     errorMessage={errors?.password?.message}
//                                 />
//                                 <FormInput
//                                     key="confirm-password"
//                                     name="confirmPassword"
//                                     control={control}
//                                     isInvalid={'confirmPassword' in errors}
//                                     password
//                                     label="Confirm your password"
//                                     placeholder="Confirm Password"
//                                     defaultValue=""
//                                     errorMessage={errors?.confirmPassword?.message}
//                                     py={3}
//                                 />
//                                 <Button
//                                     key="Password-Button"
//                                     w="100%"
//                                     mt={3}
//                                     colorScheme="primary"
//                                     onPress={handleSubmit(handleSignup)}
//                                     isLoading={isLoading}
//                                     isLoadingText="Signing Up">
//                                     Sign Up
//                                 </Button>
//                             </>
//                         ) : null}
//                         {signInMethods.includes('password') ? (
//                             <>
//                                 <FormInput
//                                     key="password"
//                                     name="password"
//                                     control={control}
//                                     isInvalid={'password' in errors}
//                                     password
//                                     label="Enter your password"
//                                     placeholder="Password"
//                                     defaultValue=""
//                                     errorMessage={errors?.password?.message}
//                                 />
//                                 <Button
//                                     alignSelf="flex-end"
//                                     variant="link"
//                                     mb={6}
//                                     onPress={handlePasswordReset}>
//                                     Forget Password?
//                                 </Button>
//                                 <Button
//                                     key="Password-Button"
//                                     w="100%"
//                                     colorScheme="primary"
//                                     onPress={handleSubmit(handleLogin)}
//                                     isLoading={isLoading}
//                                     isLoadingText="Logging In">
//                                     Login
//                                 </Button>
//                             </>
//                         ) : null}
//                         {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
//                         Send me a sign-in link
//                     </Button> */}
//                     </FormControl>
//                     <Text color="danger.600">{error}</Text>
//                     <Button
//                         w="100%"
//                         colorScheme="primary"
//                         variant="link"
//                         p={0}
//                         onPress={() => navigation.goBack()}>
//                         Return to previous screen
//                     </Button>
//                 </VStack>
//             </Box>
//         </KeyboardBehaviorWrapper>
//     );
// };

// NEW

import React from 'react';
import {
    Box,
    VStack,
    Button,
    Text,
    useToast,
    FormControl,
    Heading,
    HStack,
    Icon,
} from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema, passwordSchema } from 'src/utils/schemas';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { ScreenParams } from 'src/types/screen';
import { AlertToast } from 'src/components/feedback/alert-toast';
import { MaterialIcons } from '@expo/vector-icons';
import {
    useLazySendPasswordResetQuery,
    useLazySendVerificationEmailQuery,
    useLazySignInQuery,
    useLazySignUpQuery,
} from 'src/services/auth-queries';
import { useAppSelector } from 'src/hooks/useful-ducks';

type AuthEmailProps = StackNavigationProp<AuthStackParams, 'AuthEmail'>;
type AuthRouteProp = RouteProp<AuthStackParams, 'AuthEmail'>;

export const LoginScreen: React.FC<ScreenParams> = ({ route }) => {
    // route params
    const { signInMethods, email, title } = route.params;
    const isSignInScreen = signInMethods ? Boolean(signInMethods.length) : false;

    // hooks
    const navigation = useNavigation<AuthEmailProps>();
    const toast = useToast();
    const schema = isSignInScreen ? passwordSchema : signupSchema;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const user = useAppSelector((state) => state.user);

    // redux query hooks
    const queryHook = isSignInScreen ? useLazySignInQuery : useLazySignUpQuery;
    const [triggerLogin, { isFetching, error }] = queryHook();
    const [triggerPasswordReset, { isFetching: sendingEmail }] = useLazySendPasswordResetQuery();
    const [triggerVerificationEmail] = useLazySendVerificationEmailQuery();

    // rendering functions
    const renderPasswordToast = () => (
        <AlertToast
            title="Email Sent!"
            type="success"
            message={`Password reset instructions sent to ${email}.`}
            toExit={() => toast.close('resetToast')}
        />
    );
    const renderVerificationToast = () => (
        <AlertToast
            title="Email Sent!"
            type="success"
            message={`Verification email sent to ${email}.`}
            toExit={() => toast.close('verificationToast')}
        />
    );

    // navigate back if not root auth screen
    const navigateBack = () => {
        const parentNavigator = navigation.getParent();
        if (parentNavigator?.getId() !== 'root') {
            parentNavigator?.goBack();
        }
    };

    // handle sign up
    const handleLogin = async ({ password, firstName, lastName }: any) => {
        const { isSuccess } = await triggerLogin({
            email,
            password,
            firstName,
            lastName,
        });
        // navigate back screen if in stack
        if (isSuccess) {
            navigateBack();
            reset();
        }

        // send verification email if sign up
        if (!isSignInScreen && isSuccess) {
            const { isSuccess: sentEmail } = await triggerVerificationEmail(undefined);
            sentEmail
                ? toast.show({
                      placement: 'bottom',
                      render: renderVerificationToast,
                      id: 'verificationToast',
                  })
                : null;
        }
    };

    // handle password reset
    const handlePasswordReset = async () => {
        const { isSuccess } = await triggerPasswordReset(email);
        isSuccess
            ? toast.show({
                  placement: 'bottom',
                  render: renderPasswordToast,
                  id: 'resetToast',
              })
            : null;
        reset();
    };

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically>
            <Box
                px="10"
                w="100%"
                h="100%"
                bgColor="background.100"
                safeArea={user.loggedIn ? undefined : true}>
                <VStack space={3} w="100%">
                    <FormControl>
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            w="100%"
                            flex={1}
                            py={5}>
                            <Box pr={3}>
                                <Icon
                                    as={MaterialIcons}
                                    name="lock-outline"
                                    size={50}
                                    color="plainText.800"
                                />
                            </Box>
                            <Heading
                                flex={1}
                                textAlign="left"
                                color="plainText.800"
                                alignSelf="center">
                                {title ||
                                    (!isSignInScreen
                                        ? 'Please create your account password.'
                                        : 'Enter your password to login.')}
                            </Heading>
                        </HStack>
                        {!isSignInScreen ? (
                            <VStack pb={3}>
                                <FormInput
                                    key="password"
                                    name="password"
                                    control={control}
                                    isInvalid={'password' in errors}
                                    password
                                    label="Enter your password"
                                    placeholder="Password"
                                    defaultValue=""
                                    errorMessage={String(errors?.password?.message)}
                                />
                                <FormInput
                                    key="confirm-password"
                                    name="confirmPassword"
                                    control={control}
                                    isInvalid={'confirmPassword' in errors}
                                    password
                                    label="Confirm your password"
                                    placeholder="Confirm Password"
                                    defaultValue=""
                                    errorMessage={String(errors?.confirmPassword?.message)}
                                    py={1}
                                />
                                <FormInput
                                    key="firstName"
                                    name="firstName"
                                    control={control}
                                    isInvalid={'firstName' in errors}
                                    label="Enter your first name"
                                    placeholder="First name"
                                    defaultValue=""
                                    errorMessage={String(errors?.firstName?.message)}
                                    py={1}
                                />
                                <FormInput
                                    key="lastName"
                                    name="lastName"
                                    control={control}
                                    isInvalid={'lastName' in errors}
                                    label="Enter your last name"
                                    placeholder="Last name"
                                    defaultValue=""
                                    errorMessage={String(errors?.lastName?.message)}
                                    py={1}
                                />
                            </VStack>
                        ) : null}
                        {signInMethods && signInMethods.includes('password') ? (
                            <>
                                <FormInput
                                    key="password"
                                    name="password"
                                    control={control}
                                    isInvalid={'password' in errors}
                                    password
                                    label="Enter your password"
                                    placeholder="Password"
                                    defaultValue=""
                                    errorMessage={String(errors?.password?.message)}
                                />
                                <Button
                                    alignSelf="flex-end"
                                    variant="link"
                                    mb={6}
                                    isLoading={sendingEmail}
                                    isLoadingText="Sending Email"
                                    onPress={handlePasswordReset}>
                                    Forget Password?
                                </Button>
                            </>
                        ) : null}
                        <Button
                            key="submit-button"
                            w="100%"
                            mt={isSignInScreen ? 0 : 3}
                            colorScheme="primary"
                            onPress={handleSubmit(handleLogin)}
                            isLoading={isFetching}
                            isLoadingText={isSignInScreen ? 'Logging In' : 'Signing Up'}>
                            {isSignInScreen ? 'Login' : 'Sign Up'}
                        </Button>
                        {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    </FormControl>
                    <Box w="100%" alignItems="center" justifyContent="center">
                        <Text textAlign="center" color="danger.600">
                            {error?.message}
                        </Text>
                    </Box>
                    <Button
                        w="100%"
                        colorScheme="primary"
                        variant="link"
                        p={0}
                        onPress={() => navigation.goBack()}>
                        Return to previous screen
                    </Button>
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
    );
};