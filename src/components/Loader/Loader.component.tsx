import { FC, useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { BackDropShadow } from './Loader.style';

interface ILoaderComponentProops {
    isOpen?: boolean;
}

const LoaderComponent: FC<ILoaderComponentProops> = ({ isOpen = false }) => {
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState<boolean>(false);

    const timer = useRef(
        setTimeout(() => {
            return null;
        }, 0)
    );

    useEffect(() => {
        if (isOpen !== isRendered) changeAnimation(isOpen);
    }, [isOpen]);

    const changeAnimation = async (isOpen: boolean) => {
        clearTimeout(timer.current);
        if (isOpen) {
            setIsRendered(true);
            timer.current = setTimeout(async () => {
                setIsOpenAnimation(true);
            }, 1);
        } else {
            setIsOpenAnimation(false);
            timer.current = setTimeout(async () => {
                setIsRendered(false);
            }, 300);
        }
    };

    return (
        <div>
            {isRendered ? (
                <BackDropShadow $isOpen={isOpenAnimation}>
                    <CircularProgress />
                </BackDropShadow>
            ) : null}
        </div>
    );
};

export default LoaderComponent;
