import {FC, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeApplicationType, IVideoEncoderListItem, Optional} from "@nxt-ui/cp/types";

interface ISelectApplicationType extends IDropdownProps<IVideoEncoderListItem> {
    value: Optional<string>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectEncoderVersion: FC<ISelectApplicationType> = ({value, onChange, ...rest}) => {
    const {sdi2web, ipbe, avds2} = useSelector(ipbeEditSelectors.selectEncoderVersions);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);

    const item = useMemo(() => {
        let item;
        if (applicationType === EIpbeApplicationType.AVDS2) {
            item = avds2;
        } else if (applicationType === EIpbeApplicationType.Sdi2Web) {
            item = sdi2web;
        } else {
            item = ipbe;
        }
        return item;
    }, [applicationType, avds2, sdi2web, ipbe]);

    const selectItems = useMemo(() => {
        if (item) {
            const {keys, values} = item;
            return keys.map((key, i) => (
                <MenuItem key={values[i]} value={values[i]} selected={key === value}>
                    {key}
                </MenuItem>
            ));
        }
        return null;
    }, [item, value]);

    const renderEncoder = useCallback(
        (encoderKey) => {
            if (item) {
                let index;
                item.values.forEach((key, i) => {
                    if (key === encoderKey) {
                        index = i;
                    }
                });
                if (typeof index === "number") {
                    return item.keys[index];
                }
            }
            if (value === "default") {
                return "System Default";
            }
            return value || "";
        },
        [item, value]
    );

    return (
        <Dropdown renderValue={renderEncoder} onChange={onChange} value={value} {...rest}>
            <MenuItem key="default" value={"default"} selected={"default" === value}>
                System Default
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
