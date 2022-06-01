import {FC, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {ipbeEditSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {IVideoEncoderListItem} from "@nxt-ui/cp/types";

interface ISelectApplicationType extends IDropdownProps<IVideoEncoderListItem> {
    value?: string;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectEncoderVersion: FC<ISelectApplicationType> = ({value, onChange, ...rest}) => {
    // const [filter, setFilter] = useState<string>("");
    const encoderVersions = useSelector<CpRootState, Array<IVideoEncoderListItem>>(
        ipbeEditSelectors.selectEncoderVersionsValues
    );
    const selectItems = useMemo(() => {
        return encoderVersions.map((encoders) => (
            <MenuItem key={encoders.key} value={encoders.key} selected={encoders.key === value}>
                {encoders.value}
            </MenuItem>
        ));
    }, [encoderVersions, value]);

    const renderApplication = useCallback(
        (applicationKey) => {
            const application = encoderVersions.find((app) => app.key === applicationKey);
            if (application) {
                return application.value;
            }
            return value || "";
        },
        [encoderVersions, value]
    );

    // const handleSelect = useCallback(
    //     (e: SelectChangeEvent<unknown>) => {
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         e.target.value = e.target.value.id ? e.target.value.id : null;
    //         onChange && onChange(e);
    //     },
    //     [onChange]
    // );

    // const handleFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
    //     event.stopPropagation();
    //     setFilter(event.currentTarget.value);
    // }, []);

    return (
        <Dropdown
            // withSearch
            // searchValue={filter}
            renderValue={renderApplication}
            onChange={onChange}
            value={value}
            // onSearch={handleFilterChange}
            {...rest}>
            {selectItems}
        </Dropdown>
    );
};
