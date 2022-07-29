import {Button, DatePickerStatic, Dropdown, InputText, ModalComponent, RadioButtonsStyled} from "@nxt-ui/components";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
// may be move to common
import {EventBox, FlexHolder} from "@nxt-ui/cp/components";
import {INodesListItem} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";

type ComponentProps = {
    nodeId?: number;
};

export const NxtDatePicker: FC<ComponentProps> = (props) => {
    const {nodeId} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>(new Date());
    const openDatePicker = useCallback(() => setOpen(true), []);
    const closeDatePicker = useCallback(() => setOpen(false), []);

    const node =
        nodeId &&
        useSelector<CpRootState, undefined | INodesListItem>((state) =>
            commonSelectors.nodes.selectById(state, nodeId)
        );

    const heading = useMemo(() => {
        return node ? `${node.name} (${node.hostname}) - ${node.serialNumber}` : "";
    }, [node]);

    const radioDate = [
        {id: 1, value: "date", label: "Date"},
        {id: 2, value: "period", label: "Period"},
    ];

    const radioTime = [
        {id: 1, value: "time", label: "Exact time, AT"},
        {id: 2, value: "interval", label: "Interval, EVERY"},
    ];
    return (
        <>
            <Button data-type="btn-icon" onClick={openDatePicker}>
                <Icon name="calendar" />
            </Button>
            <ModalComponent open={open} onClose={closeDatePicker} aria-labelledby="datepicker-modalinfo">
                <div id="datepicker-modalinfo">
                    <EventBox btnFooter heading={heading} onClose={closeDatePicker}>
                        <FlexHolder className="period-box">
                            <RadioButtonsStyled
                                defaultValue="date"
                                name="radioDate"
                                aria-labelledby="buttons-group"
                                radioArr={radioDate}
                            />
                            <DatePickerStatic date={date} onChange={(newDate) => setDate(newDate)} />
                        </FlexHolder>

                        <RadioButtonsStyled
                            defaultValue="time"
                            name="radioTime"
                            aria-labelledby="buttons-group"
                            radioArr={radioTime}
                            row={true}
                        />

                        <FlexHolder className="element-row">
                            <InputText label="SET TIME" />
                            <Dropdown label="TIME ZONE" />
                        </FlexHolder>
                        <FlexHolder className="element-row">
                            <Dropdown label="ACTION" />
                            <Button>Create event</Button>
                            <Button data-type="btn-gray">Cancel</Button>
                        </FlexHolder>
                    </EventBox>
                </div>
            </ModalComponent>
        </>
    );
};
