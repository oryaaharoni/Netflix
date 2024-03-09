import ContentSlider from "../ContentSlider/Slider"

const SliderList = ({ contentList }) => {

    if (contentList == null) {
        return null
    }

    return (
        <div style={{ position: 'relative', zIndex: '20' }}>
            {contentList.map((item, index) => (
                <ContentSlider title={item.name} data={item.contentList} key={index} />
            ))}
        </div>
    )
}

export default SliderList