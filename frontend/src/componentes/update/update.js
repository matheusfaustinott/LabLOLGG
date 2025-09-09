import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { loading, nickName, tag } from '../../signals/signalsUser';
import { handleSearch } from '../../util/util';
import LoadingComponent from '../loading/loading';
import { useSignals } from '@preact/signals-react/runtime';

const UpdateButton = () => {
    useSignals();
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const handleUpdate = async () => {
        loading.value = true;
        await handleSearch(nickName.value, tag.value);
        loading.value = false;
        setIsDisabled(true);
        setTimeLeft(1 * 60); 
    };

    useEffect(() => {
        let timer;
        if (isDisabled) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsDisabled(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isDisabled]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleUpdate}
                disabled={loading.value || isDisabled}
                sx={{ marginTop: 2 }}
            >
                {isDisabled ? `Update in ${formatTime(timeLeft)}` : 'Update'}
            </Button>
            <LoadingComponent open={loading.value} />
        </>
    );
};

export default UpdateButton;
