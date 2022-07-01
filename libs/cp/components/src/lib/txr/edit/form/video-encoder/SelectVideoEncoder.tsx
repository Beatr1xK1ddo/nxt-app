import {FC, useCallback, useMemo} from "react";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {ETxrApplicationType, ETxrVideoEncoder, Optional} from "@nxt-ui/cp/types";
import {useSelector} from "react-redux";
import {txrEditSelectors} from "@nxt-ui/cp-redux";

interface ISelectVideoEncoder extends IDropdownProps<ETxrVideoEncoder> {
    value: Optional<ETxrVideoEncoder>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectVideoEncoder: FC<ISelectVideoEncoder> = ({value, onChange, ...rest}) => {
    const applicationType = useSelector(txrEditSelectors.main.applicationType);

    const videoEncoderValues = useMemo(() => {
        const result = [ETxrVideoEncoder.x264];
        if (applicationType === ETxrApplicationType.AVDS2) {
            result.push(ETxrVideoEncoder.AVC1, ETxrVideoEncoder.QuickSync, ETxrVideoEncoder.NVenc);
        }
        if (applicationType === ETxrApplicationType.Sdi2Web) {
            result.push(ETxrVideoEncoder.VP8);
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
