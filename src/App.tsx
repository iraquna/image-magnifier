import { useState } from 'react';
import { ImageMagnifier } from './components';

function App() {
    const [image, setImage] = useState<string | null>(null);
    const [magnified, setMagnified] = useState<boolean>(false);

    return (
        <>
            <ImageMagnifier
                image={magnified ? image : null}
                setImage={(image: string | null) => { setMagnified(false); setImage(image) }}
            />

            <main className='main_app'>

                <div className="main_app__form">
                    <input
                        type='url'
                        required
                        placeholder='https://domain.com/image.png'
                        value={image ?? ''}
                        onChange={(e) => setImage((e.target as HTMLInputElement).value)}
                    />
                    <button
                        onClick={() => setMagnified(true)}
                        type='button'
                    >
                        Magnify
                    </button>
                </div>
            </main >
        </>
    )
}

export default App
