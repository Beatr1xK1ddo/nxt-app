import {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeApplicationType, EIpbeApplicationTypeKeys, IVideoEncoderListItem} from "@nxt-ui/cp/types";

interface ISelectApplicationTypeProps extends IDropdownProps<IVideoEncoderListItem> {
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectApplicationType: FC<ISelectApplicationTypeProps> = ({value, onChange, ...rest}) => {
    const {
        values: {sdi2web, ipbe, avds2},
    } = useSelector(ipbeEditSelectors.selectEncoderVersions);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);

    const values = useMemo(() => {
        const sdi2webData = {
            key: EIpbeApplicationTypeKeys.Sdi2Web,
            value: `${EIpbeApplicationType.Sdi2Web}${!sdi2web ? " (not available on this device)" : ""}`,
        };
        const avds2Data = {
            key: EIpbeApplicationTypeKeys.AVDS2,
            value: `${EIpbeApplicationType.AVDS2}${!avds2 ? " (not available on this device)" : ""}`,
        };
        const ipbeData = {
            key: EIpbeApplicationTypeKeys.IPBE,
            value: `${EIpbeApplicationType.IPBE}${!ipbe ? " (not available on this device)" : ""}`,
        };
        return [ipbeData, avds2Data, sdi2webData];
    }, [sdi2web, ipbe, avds2]);

    const selectItems = useMemo(() => {
        return values.map((item) => (
            <MenuItem key={item.key} value={item.key} selected={item.key === value}>
                {item.value}
            </MenuItem>
        ));
    }, [values, value]);

    return (
        <Dropdown onChange={onChange} value={applicationType} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
