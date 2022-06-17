import {FC, useMemo} from "react";

import {IBitrateMonitoring, Optional} from "@nxt-ui/cp/types";

import "./index.css";

type ComponentProps = {
    data: Optional<IBitrateMonitoring>;
};

const ErrorTable: FC<ComponentProps> = ({data}) => {
    const {withErrors, errors} = useMemo(() => {
        const dataErrors = data?.errors;
        if (dataErrors) {
            const keys = Object.keys(dataErrors);
            let withErrors = false;
            const errors = keys.map((key) => {
                if (dataErrors[key].errorCount > 0) withErrors = true;
                return {
                    key,
                    count: dataErrors[key].errorCount,
                    date: dataErrors[key].LastErrorTime,
                };
            });
            return {withErrors, errors};
        }
        return {withErrors: false, errors: []};
    }, [data]);

    return withErrors ? (
        <table className="error-table-wrap">
            <thead className="error-table-header">
                <tr>
                    <th className="error-table-title">Indicator</th>
                    <th className="error-table-title">#</th>
                    <th className="error-table-title">Last error time</th>
                </tr>
            </thead>
            <tbody className="error-table-errors">
                {errors.map((error) =>
                    error.count ? (
                        <tr className="error-table-error">
                            <td>{error.key}</td>
                            <td>{error.count}</td>
                            <td>{error.date}</td>
                        </tr>
                    ) : null
                )}
            </tbody>
        </table>
    ) : null;
};

export default ErrorTable;
