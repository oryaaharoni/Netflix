import Slider1 from "../Slider/Slider"

const SliderList = ({ contentList }) => {

    if (contentList == null) {
        return null
    }

    return (
        <div style={{ marginBottom: '60px' }}>
            {contentList.map((item, index) => (
                <Slider1 title={item.name} data={item.contentList} key={index} />
            ))}
        </div>
    )
}

export default SliderList