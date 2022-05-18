import {useLayoutEffect, useRef, useState} from "react";

type IUseWindowResizeState = {
    width: number;
    height: number;
};

export function useElementSize() {
    const ref = useRef<HTMLElement>(null);

    const [size, setSize] = useState<IUseWindowResizeState>({
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        console.log("hook was emmited");
        const resizeHandler = () => {
            if (!ref.current) {
                return;
            }
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });
        };

        window.addEventListener("resize", resizeHandler);
        return () => {
            console.log("hook was destroed");
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    useLayoutEffect(() => {
        if (ref.current) {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });
        }
    }, [ref]);

    return {ref, size};
}
