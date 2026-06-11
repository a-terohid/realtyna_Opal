import Image from "next/image"
import React, { useEffect, useState } from 'react';

import PlaceholderImage from "../../assets/images/placeholder.png";


const ImageWithFallback = ({priority , src, alt , sizes , style , fill , onClick , placeholder , blurDataURL }: any) => {

    const fallbackSrc = PlaceholderImage
    const [imgSrc, setImgSrc] = useState(fallbackSrc);

    useEffect(() => {
        const clean = src;
        if (clean && clean !== "" && clean !== "undefined") {
        setImgSrc(clean);
        } else {
        setImgSrc(fallbackSrc);
        }
    }, [src, fallbackSrc]);

    const handleError = () => {
        if (imgSrc !== fallbackSrc)  setImgSrc(fallbackSrc);
    }

    return (
        <>
        <Image
            onClick={onClick}
            priority={priority}
            placeholder={placeholder}
            src={imgSrc}
            alt={alt}
            sizes={sizes}
            fill={fill}
            className={style}
            blurDataURL={blurDataURL}
            onError={handleError}
        />
        </>
    );
};

export default ImageWithFallback;