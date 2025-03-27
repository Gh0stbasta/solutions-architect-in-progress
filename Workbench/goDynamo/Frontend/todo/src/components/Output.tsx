import React from 'react';

interface OutputProps {
    message: string;
}

const Output: React.FC<OutputProps> = ({ message }) => {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default Output;