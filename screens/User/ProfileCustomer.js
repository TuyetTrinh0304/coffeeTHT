import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useMyContextProvider } from "../../index";
import firestore from "@react-native-firebase/firestore";

const ProfileCustomer = ({navigation}) =>{
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('USERS')
            .doc(userLogin.email)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setUserData(documentSnapshot.data());
                } else {
                    setUserData(null);
                }
            });

        return () => unsubscribe();
    }, []);

    const handleUpdateProfile = () => {
        navigation.navigate("ProfileUpdate", { userData: userData });
    };    

    const handleChangePassword = () => {
        navigation.navigate("ChangePassword");
    };

    return(
        <View style={{ flex: 1 }}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold" }}>Profile</Text>
            {userData !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email: </Text>
                    <Text style={{ fontSize: 20}}>{userData.email}</Text>
                </View>
            )}
            {userData !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mật khẩu: </Text>
                    <Text style={{ fontSize: 20}}>{userData.password}</Text>
                </View>
            )}
            {userData !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Họ tên: </Text>
                    <Text style={{ fontSize: 20}}>{userData.fullName}</Text>
                </View>
            )}
            {userData !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Địa chỉ: </Text>
                    <Text style={{ fontSize: 20}}>{userData.address}</Text>
                </View>
            )}
            {userData !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Điện thoại: </Text>
                    <Text style={{ fontSize: 20}}>{userData.phone}</Text>
                </View>
            )}
            {userData !== null && (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Vai trò: </Text>
                    <Text style={{ fontSize: 20}}>{userData.role}</Text>
                </View>
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 35 }}>
                <Button textColor="white" buttonColor="#ff555b" onPress={handleChangePassword} mode="contained" style={{ flex: 1, margin: 10 }}>
                    Đổi mật khẩu
                </Button>
                <Button textColor="white" buttonColor="#ff555b" onPress={handleUpdateProfile} mode="contained" style={{ flex: 1, margin: 10 }}>
                    Đổi thông tin
                </Button>
            </View>
        </View>
    );
};
export default ProfileCustomer;