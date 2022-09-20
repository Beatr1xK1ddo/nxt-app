import {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeApplicationType} from "@nxt-ui/cp/types";

interface ISelectApplicationType extends IDropdownProps<Array<string>> {
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectEncoderVersion: FC<ISelectApplicationType> = ({onChange, ...rest}) => {
    const {sdi2web, ipbe, avds2} = useSelector(ipbeEditSelectors.selectEncoderVersions);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);
    const value = useSelector(ipbeEditSelectors.main.encoderVersion);

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
                <MenuItem key={values[i]} value={values[i]} selected={values[i] === value}>
                    {key}
                </MenuItem>
            ));
        }
        return null;
    }, [item, value]);

    return (
        <Dropdown onChange={onChange} value={value} {...rest}>
            <MenuItem key="default" value={"default"} selected={"default" === value}>
                System Default
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
