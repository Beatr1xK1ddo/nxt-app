import * as React from "react";
import CircularProgress, {CircularProgressProps} from "@mui/material/CircularProgress";
import "./index.css";

export function CircularProgressWithLabel(props: CircularProgressProps & {value: number}) {
    return (
        <div className="progressbar">
            <CircularProgress variant="determinate" className="progress" thickness={7} size={48} {...props} />
            <div className="progress-info">
                QOS
                <strong>{`${Math.round(props.value)}`}</strong>
            </div>
        </div>
    );
}

function CircularStatic() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return <CircularProgressWithLabel value={progress} />;
}
