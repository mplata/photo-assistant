"use client"
import React, { useMemo, useState } from 'react';
import ConfirmButton from '../ConfirmButton';

const URL_REGEX = /^https:\/\/drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]+$/;

interface PhotoUploadProps {
  onProcessUrl: (url: string) => void;
  isLoading: boolean;
}

const PhotoUpload = ({ onProcessUrl, isLoading }: PhotoUploadProps) => {

    const [ url, setUrl ] = useState('');

    const handleUpload = () => {
        onProcessUrl(url);
    }
    
    const isValidUrl = useMemo(() => {
        return URL_REGEX.test(url);
    }, [url]);

    return  <>
        <section id="image-preview" className="max-w-sm p-6 mb-16 bg-violet-400 items-center mx-auto text-center border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <label>
                <input
                    type='text'
                    className='p-2 rounded border-2 border-black'
                    disabled={isLoading}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <p className="font-bold text-md text-black md:px-6 mt-2">
                    El enlace debe ser una carpeta publica de Google Drive
                </p>
            </label>
            <ConfirmButton
              text='¡Adelante!'
              disabled={!isValidUrl || isLoading}
              onClick={handleUpload}
            />
        </section>
    </>
};

export default PhotoUpload;