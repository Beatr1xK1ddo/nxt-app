import React, {useReducer, useEffect, useMemo} from "react";
import {useFormData} from "@nxt-ui/cp/hooks";
import {IIpbeCardApiItem, NxtAPI} from "@nxt-ui/cp/api";
import {initialState, reducer, setInitialState} from "./reducers";
import {Main} from "./main/index";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./app-edit.css";
import {TabHolder} from "../../tabs";
import {TabElement} from "../../tabs/tab-element/index";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`main-form-tabpanel-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

export function AppEditForm() {
    const [value, setValue] = React.useState(0);

    const [state, dispatch] = useReducer(reducer, initialState);

    const {data} = useFormData<IIpbeCardApiItem>(1, NxtAPI.getIpbe);

    useEffect(() => {
        dispatch(setInitialState({}));
        // dispatch(setInitialState(data || {}));
    }, [data]);

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = useMemo(() => {
        return [
            {id: 0, heading: "MAIN", content: <Main {...state} dispatch={dispatch} />},
            {id: 1, heading: "VIDEO ENCODER", content: "tab video"},
            {id: 2, heading: "AUDIO ENCODER"},
            {id: 3, heading: "MPEG-TS Muxer", content: "tab mpeg-ts"},
            {id: 4, heading: "RTP Muxer", content: "tab rtp"},
            {id: 5, heading: "Advanced", content: "tab advanced"},
        ];
    }, [state]);

    return (
        <div className="form-container">
            <Button data-name="btn-info" data-type="btn-icon">
                <Icon name="info" />
            </Button>
            <TabHolder value={value} onChange={tabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            <div className="main-tab-holder">
                {tabs.map((item) => (
                    <TabPanel value={value} index={item.id}>
                        {item.content}
                    </TabPanel>
                ))}
            </div>
        </div>
    );
}
