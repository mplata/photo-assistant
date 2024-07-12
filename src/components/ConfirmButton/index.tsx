import React from 'react';

interface ConfirmButtonProps {
    text: string;
    onClick: () => void;
    disabled: boolean;
}

const ConfirmButton = ({ text, disabled, onClick }: ConfirmButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className='bg-[#FDC671] text-[#222E49] py-2 px-8
                align-middle text-sm font-semibold rounded-full
                shadow-[0rem_0rem_0rem_0.125rem_#222]
                disabled:bg-slate-50 opacity-80'
            >
            {text}
        </button>
    )
};

export default ConfirmButton;