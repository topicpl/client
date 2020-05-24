import React from 'react';
import { useParams } from "react-router-dom";

const Video = (props) => {
    const { category } = useParams();
    console.log('category: ', category);

    return <div>
        video
    </div>
}

export default Video;
