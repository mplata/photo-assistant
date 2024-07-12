"use client"
import React, { useMemo, useState } from 'react';
import ConfirmButton from '../ConfirmButton';

const URL_REGEX = /^https:\/\/drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]+$/;

interface PhotoUploadProps {
    onProcessUrl: (url: string) => void;
}

const PhotoUpload = ({ onProcessUrl }: PhotoUploadProps) => {

    const [ url, setUrl ] = useState('');

    const handleUpload = () => {
        console.log('Upload');
        onProcessUrl(url);
    }

    const isValidUrl = useMemo(() => {
        return URL_REGEX.test(url);
    }, [url]);

    return  <>
        <section id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 items-center mx-auto text-center cursor-pointer rounded-lg shadow-[0rem_0rem_0rem_0.125rem_#222]">
            <input id="upload" type="file" className="hidden" accept="image/*" />
            <label className="cursor-pointer">
                <input
                    type='text'
                    className='p-2 rounded border-2 border-black'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <p className="font-normal text-sm text-gray-400 md:px-6">Link should be a valid and public google drive folder</p>
            </label>
        </section>
        <ConfirmButton
            text='Process'
            disabled={!isValidUrl}
            onClick={handleUpload}
        />
    </>
};

export default PhotoUpload;