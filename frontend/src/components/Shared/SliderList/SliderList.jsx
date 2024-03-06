import Slider1 from "../Slider/Slider"

const SliderList = ({ contentList }) => {
    // console.log('content list: ', contentList)
    
    if (contentList == null) {
        return null
    }

    return (
        <div>
            {contentList.map((item, index) => (
                <Slider1 title={item.name} data={item.contentList} key={index} />
            ))}
        </div>
    )
}

export default SliderList