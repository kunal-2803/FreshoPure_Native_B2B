import { View, Text } from 'react-native'
import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'

const LineChartJS = () => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  return (
    <View className="w-full">
       <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
                animate={true}
            >
                <Grid />
            </LineChart>
    </View>
  )
}

export default LineChartJS


// Order for Freshopure

// Date: {{date}}  

// Item List: 

// {{#items}}
// {{item_number}}. {{item_name}} - {{item_quantity}}
// {{/items}}

// Total: {{total}} 

// Please confirm the order and provide the total cost.
  
// Thank you!

// 402992AcFeNjWk864da072aP1