// import React, {useState, useEffect} from 'react';
// import { Box, Text } from 'native-base';
// import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
// import { ExploreScreenItem } from 'src/';
// import { db } from 'src/firebase/firebase-config';
// import { collection, getDocs } from 'firebase/firestore';

// export const ExploreScreen: React.FC<any> = () => {
//    const[data, setData] = useState();
//    const colRef = collection(db, "basic-product-data")

//    useEffect(()=>{
//         const getProducts = async () => {
//             const prod:any = [];
//             const productData = await getDocs(colRef);
//             productData.docs.forEach((doc) => {
//                 prod.push({...doc.data(), id: doc.id})
//             })
//             setData(prod)
//         }
//         getProducts()
//    }, []);

//     const user = useAppSelector((state) => state.user);
//     const dispatch = useAppDispatch();

    

//     return (
//         <Box w="100%" bg="primary.500" flex={1} justifyContent="space-around">
//             {user.cart ? user.cart.map((el: any) => {
//                 return <ExploreScreenItem key={el.id} props={el} />;
//             }) : <Text>Nothing in cart</Text>}
//         </Box>
//     );
// };
