// import { View, Text } from 'react-native'
// import React,{useRef,useMemo} from 'react'
// import RBSheet from "react-native-raw-bottom-sheet";
// import { GestureHandlerRootView } from 'react-native-gesture-handler'

// const BottomSheetPage = ({bottomSheetRef,snapPoints,index}) => {
//     // const bottomSheetRef = useRef(null);
//     // const snapPoints = useMemo(() => ['1%', '80%'], []);

//   return (
//     <GestureHandlerRootView>
//    <RBSheet
//         ref={bottomSheetRef}
//         closeOnDragDown={true}
//         closeOnPressMask={false}
//         customStyles={{
//           wrapper: {
//             backgroundColor: "transparent"
//           },
//           draggableIcon: {
//             backgroundColor: "#000"
//           }
//         }}
//       >
//         <View><Text>hii</Text></View>
//       </RBSheet>
//   </GestureHandlerRootView>
//   )
// }

// export default BottomSheetPage
import { View, Text } from 'react-native'
import React from 'react'

const BottomSHeet = () => {
  return (
    <View>
      <Text>BottomSHeet</Text>
    </View>
  )
}

export default BottomSHeet