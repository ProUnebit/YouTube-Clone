import React, { useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/videoLength";

import avatarAutor from '../assets/avatar.png'

const VideoCard = ({ video }) => {

    const [isHovering, setIsHovering] = useState(false);
    // const [isOpacityActive, setIsOpacityActive] = useState(false);

    const handleMouseOver = () => {
        if (video.movingThumbnails) {
            // setIsOpacityActive(true);
            setTimeout(() => setIsHovering(true), 250);
        }
    };
    
    const handleMouseOut = () => {
        // setIsOpacityActive(false);
        setTimeout(() => setIsHovering(false), 300);
    };

    return (
        <Link to={`/video/${video?.videoId}`}>
            <div className="flex flex-col mb-8 opacity-hover">
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                    {!isHovering && (
                        <React.Fragment>
                            <img
                                className={`h-full w-full object-cover`}
                                src={video?.thumbnails[0]?.url}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                            />
                            <img
                                className="h-full w-full object-cover hidden"
                                src={video.movingThumbnails ? video?.movingThumbnails[0]?.url : ''}
                            />
                        </React.Fragment>
                    )}
                    {(video.movingThumbnails && isHovering) && (
                        <img
                            className="h-full w-full object-cover"
                            src={video?.movingThumbnails[0]?.url}
                            onMouseOut={() =>  setIsHovering(false)}
                        />
                    )}
                    {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )}
                </div>
                <div className="flex text-white mt-3">
                    <div className="flex items-start">
                        <div className="relative flex h-9 w-9 grayscale rounded-full overflow-hidden bg-gray-900">
                            <img
                                className="h-full w-full object-cover"
                                src={avatarAutor}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2">
                            {video?.title}
                        </span>
                        <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                            {video?.author?.title}
                            {video?.author?.badges[0]?.type ===
                                "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                        </span>
                        <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            <span>{`${abbreviateNumber(
                                video?.stats?.views,
                                2
                            )} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                .
                            </span>
                            <span className="truncate">
                                {video?.publishedTimeText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;