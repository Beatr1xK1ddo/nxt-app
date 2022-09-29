import {FC, useCallback, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {EIpbeApplicationTypeKeys, EIpbeVideoEncoder, Optional} from "@nxt-ui/cp/types";
import {useSelector} from "react-redux";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";

interface ISelectVideoEncoder extends IDropdownProps<EIpbeVideoEncoder> {
    value: Optional<EIpbeVideoEncoder>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectVideoEncoder: FC<ISelectVideoEncoder> = ({value, onChange, ...rest}) => {
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);

    const videoEncoderValues = useMemo(() => {
        const result = [EIpbeVideoEncoder.x264];
        if (applicationType === EIpbeApplicationTypeKeys.AVDS2) {
            result.push(EIpbeVideoEncoder.AVC1, EIpbeVideoEncoder.QuickSync, EIpbeVideoEncoder.NVenc);
        }
        if (applicationType === EIpbeApplicationTypeKeys.Sdi2Web) {
            result.push(EIpbeVideoEncoder.VP8);
        }
        return result;
    }, [applicationType]);

    const renderEncoder = useCallback((encoder) => encoder, []);

    const selectItems = useMemo(() => {
        return videoEncoderValues.map((val) => (
            <MenuItem key={val} value={val} selected={val === value}>
                {val}
            </MenuItem>
        ));
    }, [value, videoEncoderValues]);

    return (
        <Dropdown renderValue={renderEncoder} onChange={onChange} value={value} {...rest}>
            {selectItems}
        </Dropdown>
    );
};
