import {FC, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {txrEditSelectors} from "@nxt-ui/cp-redux";
import {ETxrApplicationType, IVideoEncoderListItem, Optional} from "@nxt-ui/cp/types";

interface ISelectApplicationType extends IDropdownProps<IVideoEncoderListItem> {
    value: Optional<string>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectEncoderVersion: FC<ISelectApplicationType> = ({value, onChange, ...rest}) => {
    const {sdi2web, txr, avds2} = useSelector(txrEditSelectors.selectEncoderVersions);
    const applicationType = useSelector(txrEditSelectors.main.applicationType);

    const item = useMemo(() => {
        let item;
        if (applicationType === ETxrApplicationType.AVDS2) {
            item = avds2;
        } else if (applicationType === ETxrApplicationType.Sdi2Web) {
            item = sdi2web;
        } else {
            item = txr;
        }
        return item;
    }, [applicationType, avds2, sdi2web, txr]);

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
