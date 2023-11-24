import { View, Text,Image,Dimensions,ScrollView ,TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import React,{useEffect,useState} from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import InputFeild from '../components/InputFeild.jsx'
const bg = require('./../assets/bg-texture.png')
const profile = require('./../assets/profile.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native'
import {useDispatch,useSelector} from 'react-redux'
import {getProfile,setUserProfile,setUserProfileImage} from '../redux/slices/UserProfile/index.js'
import Icon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker';
// import { KeyboardAvoidingView } from 'react-native-web'

const UserProfile = () => {
  const navigation = useNavigation()
  const {data} = useSelector(state=>state.profile)
  const dispatch = useDispatch()

  const user = data?.hotelData;

  const [image, setImage] = useState(user?.image);
  const [profileData,setProfileData] = useState({fullName:'',hotelName:'',email:'',mobileNo:'',alternateMobileNo:'',update:true})

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    hotelName: '',
    email: '',
    mobileNo: '',
    alternateMobileNo: ''
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
    // Add similar validation for other fields

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if(image && validateForm()){
       // All fields are valid, proceed with submission
       dispatch(setUserProfile({userData:profileData}))
       const userData = new FormData();
       userData.update =true;
       userData.append('file', { uri: image, name: 'image.jpg', type: 'image/jpeg' });
       dispatch(setUserProfileImage(userData))
       navigation.navigate('parent')
    }
    else if(image){
      const userData = new FormData();
      userData.update =true;
      userData.append('file', { uri: image, name: 'image.jpg', type: 'image/jpeg' });
      dispatch(setUserProfileImage(userData))
      navigation.navigate('parent')
    }
    else if (validateForm()) {
      // All fields are valid, proceed with submission
      dispatch(setUserProfile({userData:profileData}))
      navigation.navigate('parent')
    } 
    else{}  
  };

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


  useEffect(()=>{
   dispatch(getProfile())
  },[])

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);


  return (
    <View className="flex" >
      <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>
      <CustomHeader title={'Update Profile'} backButton={true} height={0.20} headerBar={false}/>

     <View className="border-2 border-white rounded-full absolute left-1/2 top-20 z-10" style={{transform:[{translateX:-50}]}}>
 <Image source={{uri:image}} className="w-24 h-24 bg-white rounded-full border"/> 
     <TouchableOpacity className="absolute right-0 bottom-0 bg-white rounded-full p-1" onPress={pickImage}><Icon name="plus" size={16}/></TouchableOpacity>

     </View>
      <KeyboardAvoidingView behavior="height" className="flex">
    <ScrollView alwaysBounceVertical={true} className="flex" style={{height:windowHeight*0.84}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
    <View className="flex w-full justify-center items-center my-2 mt-14">
      <InputFeild width={windowWidth*0.85} keyboardType='default'  handleChange={(text)=>handleInputChange('fullName',text)} name="fullName" placeHolder="Name"/>
      <Text className="text-left text-xs text-red">{formErrors.fullName}</Text>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='default' handleChange={(text)=>handleInputChange('hotelName',text)} name="hotelName" placeHolder='Hotel Name'/>
      <Text className="text-left text-xs text-red">{formErrors.hotelName}</Text>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='email-address' handleChange={(text)=>handleInputChange('email',text)} name="email" placeHolder='Email'/>
      <Text className="text-left text-xs text-red">{formErrors.email}</Text>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='phone-pad' handleChange={(text)=>handleInputChange('mobileNo',text)} name="mobileNo" placeHolder='mobile No.'/>
      <Text className="text-left text-xs text-red">{formErrors.mobileNo}</Text>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='phone-pad' handleChange={(text)=>handleInputChange('alternateMobileNo',text)} name="alternateMobileNo" placeHolder='Alternate Number'/>
      <Text className="text-left text-xs text-red">{formErrors.alternateMobileNo}</Text>
      </View>
 
      <View className="flex w-full justify-center items-center my-2">
      <CustomButton width={windowWidth*0.85} text={'Update'} handlePress={handleSubmit} isLoading={false}/>
      </View>
      
    </ScrollView>
    </KeyboardAvoidingView>

    </View>
  )
}

export default UserProfile