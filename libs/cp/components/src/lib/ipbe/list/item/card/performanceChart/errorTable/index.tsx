import {FC, useMemo} from "react";

import {IMonitoringErrorState, Optional} from "@nxt-ui/cp/types";

import "./index.css";

type ComponentProps = {
    data: Optional<IMonitoringErrorState>;
};

const ErrorTable: FC<ComponentProps> = ({data}) => {
    const {withErrors, errors} = useMemo(() => {
        if (data) {
            const {cc, syncLosses, moment} = data;
            const withErrors = !syncLosses || !cc;
            const errors = [
                {
                    key: "ccErrors",
                    count: cc,
                    date: moment,
                },
                {
                    key: "syncLosses",
                    count: syncLosses,
                    date: moment,
                },
            ];
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
