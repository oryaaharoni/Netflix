import { SpinnerCircular } from 'spinners-react';
import "./loading.css";

const Loading = () => {
    return (
        <div className="loading-container">
            <SpinnerCircular size={80} thickness={100} speed={100} color="#36D7B7" secondaryColor="#2D3436" />
        </div>
    )
}

export default Loading