import { View, Text,Image,Dimensions,ScrollView, KeyboardAvoidingView, Platform ,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import InputFeild from '../components/InputFeild.jsx'
const bg = require('./../assets/bg-texture.png')
const profile = require('./../assets/profile.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native'
import { setUserProfile,setUserProfileImage } from "../redux/slices/UserProfile/index.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker';

const SetProfile = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [image, setImage] = useState(null);
  const [profileData,setProfileData] = useState({fullName:'',hotelName:'',email:'',mobileNo:'',alternateMobileNo:'',addressLine1:'',addressLine2:'',city:'',state:'',pinCode:''})
  
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    hotelName: '',
    email: '',
    mobileNo: '',
    alternateMobileNo: '',
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    pinCode:''
  });



  const handleInputChange =(name,value)=>{
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic for each field
    if (profileData.email.trim() === '') {
      newErrors.email = '*Email is required';
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profileData.email)) {
      newErrors.email = '*Please Enter a valid email.';
      isValid = false;
    }

    if (profileData.fullName.trim() === '') {
      newErrors.fullName = '*FullName is required';
      isValid = false;
    }
    if (profileData.hotelName.trim() === '') {
      newErrors.hotelName = '*HotelName is required';
      isValid = false;
    }
    if (profileData.mobileNo.trim() === '') {
      newErrors.mobileNo = '*Mobile Number is required';
      isValid = false;
    }else if(profileData.mobileNo.length !== 10){
      newErrors.mobileNo = '*Mobile Number must be of 10 digits';
      isValid = false;

    }
    if (profileData.alternateMobileNo.trim() === '') {
      newErrors.alternateMobileNo = '*Alternate is required';
      isValid = false;
    }else if(profileData.alternateMobileNo.length !== 10){
      newErrors.alternateMobileNo = '*Alternate Mobile Number must be of 10 digits';
      isValid = false;

    }

    if (profileData.addressLine1.trim() === '') {
      newErrors.addressLine1 = '*Address Line One is required';
      isValid = false;
    }
    if (profileData.addressLine2.trim() === '') {
      newErrors.addressLine2 = '*Address Line Two is required';
      isValid = false;
    }

    if (profileData.state.trim() === '') {
      newErrors.state = '*State is required';
      isValid = false;
    }

    if (profileData.city.trim() === '') {
      newErrors.city = '*City is required';
      isValid = false;
    }
    if (profileData.pinCode.trim() === '') {
      newErrors.pinCode = '*Pin Code is required';
      isValid = false;
    }else if(profileData.pinCode.length !== 6){
      newErrors.pinCode = '*Pin Code must be of 6 digits';
      isValid = false;
    }

    // Add similar validation for other fields

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // All fields are valid, proceed with submission
      dispatch(setUserProfile({userData:profileData}))
      if(image){
        const userData = new FormData();
        userData.append('file', { uri: image, name: 'image.jpg', type: 'image/jpeg' });

        dispatch(setUserProfileImage(userData))
      }
    } else {
      // Display an error or take appropriate action
      console.log('Form validation failed!');
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2,2],
      quality: 1,
    });

    if (result.canceled === false) {
      setImage(result.assets[0]?.uri);
    }
  };


  return (
    <View className="flex" >
          

      <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>

      <CustomHeader title={'Profile'} backButton={true} height={0.20} headerBar={false}/>

     <View className="border-2 border-white rounded-full absolute left-1/2 top-20 z-10" style={{transform:[{translateX:-50}]}}>
     {!image ? <Image source={profile} className="w-24 h-24 bg-white rounded-full border"/> : <Image source={{uri:image}} className="w-24 h-24 bg-white rounded-full border"/> }
     <TouchableOpacity className="absolute right-0 bottom-0 bg-white rounded-full p-1" onPress={pickImage}><Icon name="plus" size={16}/></TouchableOpacity>
     </View>

     <KeyboardAvoidingView behavior="height" className="flex">
   <ScrollView alwaysBounceVertical={true} className="flex" style={{height:windowHeight*0.84}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      
      <View className="flex w-full items-center">
      <View style={{width:windowWidth*0.85}} className="flex w-full justify-center  my-2 mt-14">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('fullName',text)} name="fullName" keyboardType='default' placeHolder='Full Name'/>
        <Text className="text-left text-xs text-red">{formErrors.fullName}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center  my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('hotelName',text)} name="hotelName" keyboardType='default' placeHolder='Hotel Name'/>
        <Text className="text-left text-xs text-red">{formErrors.hotelName}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center  my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('email',text)} name="email" keyboardType='email-address' placeHolder='Email'/>
        <Text className="text-left text-xs text-red">{formErrors.email}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center  my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('mobileNo',text)} name="mobileNo" keyboardType='phone-pad' maxLength={10} placeHolder='Phone Number'/>
        <Text className="text-left text-xs text-red">{formErrors.mobileNo}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('alternateMobileNo',text)} name="alternateMobileNo" keyboardType='phone-pad' maxLength={10} placeHolder='Alternate Number'/>
        <Text className="text-left text-xs text-red">{formErrors.alternateMobileNo}</Text>
        </View>
  
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('addressLine1',text)} name="addressLine1" keyboardType='default' placeHolder='Address Line 1'/>
        <Text className="text-left text-xs text-red">{formErrors.addressLine1}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('addressLine2',text)} name="addressLine2" keyboardType='default' placeHolder='Address Line 2'/>
        <Text className="text-left text-xs text-red">{formErrors.addressLine2}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('city',text)} name="city" keyboardType='default' placeHolder='City'/>
        <Text className="text-left text-xs text-red">{formErrors.city}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('state',text)} name="state" keyboardType='default' placeHolder='State'/>
        <Text className="text-left text-xs text-red">{formErrors.state}</Text>
        </View>
        <View style={{width:windowWidth*0.85}} className="flex w-full justify-center my-2">
        <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('pinCode',text)} name="pinCode" keyboardType='numeric' placeHolder='Pin Code'/>
        <Text className="text-left text-xs text-red">{formErrors.pinCode}</Text>
        </View>
  
        <View className="flex w-full justify-center items-center my-2">
        <CustomButton width={windowWidth*0.85} text={'Proceed'} handlePress={handleSubmit}/>
        </View>
      </View>
  
      </ScrollView>
      </KeyboardAvoidingView>

    </View>

  )
}

export default SetProfile