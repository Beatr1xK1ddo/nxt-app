import "./index.css";
import {IBitrateMonitoring, Optional} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";

type ComponentProps = {
    data: Optional<IBitrateMonitoring>;
};

const ErrorTable: FC<ComponentProps> = ({data}) => {
    const errors = useMemo(() => {
        const dataErrors = data?.errors;
        if (dataErrors) {
            const keys = Object.keys(dataErrors);
            const result = keys.map((key) => {
                return {
                    key,
                    count: dataErrors[key].errorCount,
                    date: dataErrors[key].LastErrorTime,
                };
            });
            return result;
        }
        return [];
    }, [data]);

    return (
        <table className="error-table-wrap">
            <thead className="error-table-header">
                <tr>
                    <th className="error-table-title">Indicator</th>
                    <th className="error-table-title">#</th>
                    <th className="error-table-title">Last error time</th>
                </tr>
            </thead>
            <tbody className="error-table-errors">
                {errors.map((error) => (
                    <tr className="error-table-error">
                        <td>{error.key}</td>
                        <td>{error.count}</td>
                        <td>{error.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ErrorTable;
