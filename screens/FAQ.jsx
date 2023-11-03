import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
import Accordion from "../components/Accordion.jsx";
const bg = require("./../assets/bg-texture.png");
const address = require("./../assets/address.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const FAQ = () => {
  return (
    <View className="flex">
      <CustomHeader
        title={"FAQ"}
        backButton={true}
        height={0.14}
        headerBar={false}
      />
      <Image
        source={bg}
        className="absolute"
        style={{ height: windowHeight * 1.4 }}
        resizeMode="repeat"
      />

      <View className="flex w-full items-center">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="text-2xl">
            We’re here to help you with anything and everyting on Fresh O pure
          </Text>

          <Text className="mt-4 text-lightText">
            At Viral Pitch we expect at a day’s start is you, better and happier
            than yesterday. We have got you covered share your concern or check
            our frequently asked questions listed below.
          </Text>
          <Text className="text-green font-semibold mt-2">
            support@freshopure.com
          </Text>
        </View>
      </View>

      <View><Text className="ml-4 mt-8 font-bold text-lg">FAQ</Text>
      <Accordion title="What is Viral Pitch?" content="Content for section 1" />
      <Accordion title="What is Viral Pitch?" content="Content for section 1" />
      <Accordion title="What is Viral Pitch?" content="Content for section 1" />

      <Accordion title="What is Viral Pitch?" content="Content for section 1" />

      <Accordion title="What is Viral Pitch?" content="Content for section 1" />

      <Accordion title="What is Viral Pitch?" content="Content for section 1" />
            </View>
    </View>
  );
};

export default FAQ;
