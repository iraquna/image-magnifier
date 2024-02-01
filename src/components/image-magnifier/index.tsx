import { useState } from "react";
import { Icon } from "components";
import cls from "./styles.module.scss";

type Props = {
    image: string | null;
    setImage: (image:string | null) => void;
}


export function ImageMagnifier({ image, setImage }: Props) {
    const [background, setBackground] = useState<"blur" | "dark">("blur");
    const [imageWidth, setImageWidth] = useState<number>(100);
    const [imageRotation, setImageRotation] = useState<number>(0);

    return (
        image ?
            <div className={cls[background]}>
                <img
                    alt="Image not found"
                    src={image}
                    className={cls.image}
                    width={imageWidth + "%"}
                    style={{transform: `rotate(${imageRotation}deg)`}}
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
                            onClick={() => setImageRotation(imageRotation + 90)} title={("Rotate the image")}
                            className={cls.button}
                        >
                            <Icon name="rotate-right-solid" color="white" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageWidth(imageWidth > 10 ? imageWidth - 5 : imageWidth)} title={("Zoom out")}
                            className={cls.button}
                        >
                            <Icon color="white" name="magnifying-glass-minus-solid" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageWidth(imageWidth < 150 ? imageWidth + 5 : imageWidth)} title={("Zoom in")}
                            className={cls.button}
                        >
                            <Icon color="white" name="magnifying-glass-plus-solid" />
                        </button>
                    </div>

                </div>
            </div> : null
    )
}