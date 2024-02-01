import { FormEvent, useState } from 'react';
import { ImageMagnifier } from './components';

function App() {
    const [images, setImages] = useState<string[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [value, setValue] = useState<string>('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isFound = images.find(item => item.trim() === value.trim())

        if (!isFound) {
            setImages(prev => [value.trim(), ...prev]);
        }
        setValue('');
    }

    return (
        <>
            <ImageMagnifier
                image={image}
                setImage={setImage}
            />

            <main className='main_app'>
                <form className="main_app__form" onSubmit={submitHandler}>
                    <div className="main_app__form__container">
                        <input
                            type='url'
                            required
                            placeholder='https://example.com/image.png'
                            value={value}
                            onChange={e => setValue((e.target as HTMLInputElement).value)}
                        />
                        <button type='submit'>
                            Add
                        </button>
                    </div>
                </form>
                <div className={'main_app__images'}>
                    {images.map((url, i) => (
                        <img key={`image_${url}_${i}`}
                            onClick={() => setImage(url)}
                            src={url}
                            alt=''
                        />
                    ))}
                </div>
            </main >
        </>
    )
}

export default App
