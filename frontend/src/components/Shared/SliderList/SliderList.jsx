import React from 'react'
import Slider from 'react-slick'

const SliderList = ({contentList}) => {
  return (
    <div>
        {contentList.map((item, index) => (
            <Slider title={item.title} data={item.data} key={index} />
        ))}
    </div>
  )
} [[genre 'shrek, harry', [movies]],[]]

export default SliderList