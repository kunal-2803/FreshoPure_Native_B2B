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

      <View className="flex w-full items-center mt-4">
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
      <Accordion title="What products do you offer?" content="We offer a wide variety of fresh fruits and vegetables, including seasonal and year-round options." />
      <Accordion title="Where do you source your produce?" content="We source our produce from local farmers, as well as regional and international suppliers to ensure the highest quality and variety." />
      <Accordion title="Are your products organic or conventional?" content="We offer both organic and conventional options. You can choose according to your preferences." />

      <Accordion title="How do you ensure the freshness of your products?" content="Our products are carefully harvested, stored, and transported in temperature-controlled environments to maintain freshness. We also have a quick turnover to ensure you receive the freshest produce." />

      <Accordion title="How can I place an order?" content="You can place an order through our website, mobile app, or by contacting our customer service. We also accept orders through phone and email." />

      <Accordion title="What is your return or refund policy?" content="We have a customer-friendly return and refund policy. If you are not satisfied with your order, please contact us within 2 days, and we will assist you with returns or refunds." />
            </View>
    </View>
  );
};

export default FAQ;
