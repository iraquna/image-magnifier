import { useEffect, useState } from "react";
import { Icon } from "components";
import cls from "./styles.module.scss";

type Props = {
    image: string | null;
    setImage: (image: string | null) => void;
}


export function ImageMagnifier({ image, setImage }: Props) {
    const [background, setBackground] = useState<"blur" | "dark">("blur");
    const [imageWidth, setImageWidth] = useState<number>(100);
    const [imageRotation, setImageRotation] = useState<number>(0);


    useEffect(() => {
        const body = document.body;
        image && (body.style.overflowY = 'hidden');

        document.onkeydown = function (e) {

            if (e.key === '-' || e.key === 'ArrowDown') {
                setImageWidth(imageWidth > 10 ? imageWidth - 5 : imageWidth);
                if (image) e.preventDefault();
            }
            else if (e.key === '+' || e.key === 'ArrowUp') {
                setImageWidth(imageWidth < 150 ? imageWidth + 5 : imageWidth)
                if (image) e.preventDefault();
            }
            else if (e.key === 'Escape') {
                setImage(null);
            }
            else if (e.key === 'Backspace') {
                setImageWidth(90)
            }
        }
        document.onwheel = function (e) {
            e.preventDefault();
            const zoomOut = imageWidth > 10 ? imageWidth - 5 : imageWidth
            const zoomIn = imageWidth < 150 ? imageWidth + 5 : imageWidth
            setImageWidth(e.deltaY < 0 ? zoomIn : zoomOut);
        }
        return ()=> {
            body.style.overflowY = 'auto';
        }

    }, [image, setImage, imageWidth, setImageWidth]);

    return (
        image ?
            <div className={cls[background]}>
                <img
                    alt="Image not found"
                    src={image}
                    className={cls.image}
                    width={imageWidth + "%"}
                    style={{ transform: `rotate(${imageRotation}deg)` }}
                    onClick={() => { setImage(null); document.body.style.overflowY = 'auto'; }}
                />
                <div className={cls.controllers}>
                    <div className={cls.buttons}>
                        <button
                            type="button"
                            onClick={() => setBackground(background === "blur" ? "dark" : "blur")}
                            title={('Blur background/dark background')}
                            className={cls.button}
                        >
                            <Icon name="half-circle-stroke-solid" color="white" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageRotation(imageRotation + 90)} 
                            title={("Rotate the image")}
                            className={cls.button}
                        >
                            <Icon name="rotate-right-solid" color="white" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageWidth(imageWidth > 10 ? imageWidth - 5 : imageWidth)} 
                            title={("Zoom out")}
                            className={cls.button}
                        >
                            <Icon color="white" name="magnifying-glass-minus-solid" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageWidth(imageWidth < 150 ? imageWidth + 5 : imageWidth)} 
                            title={("Zoom in")}
                            className={cls.button}
                        >
                            <Icon color="white" name="magnifying-glass-plus-solid" />
                        </button>
                    </div>

                </div>
            </div> : null
    )
}