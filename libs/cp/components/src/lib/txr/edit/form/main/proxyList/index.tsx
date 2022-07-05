import {FC} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./index.css";

export const ProxyList: FC = () => {
    return (
        <ul className="proxy-list">
            <li>
                <span className="proxy-text">
                    <strong>test_dv_proxy2</strong>
                    <br />
                    207.35.238.5:10001 / 1500
                </span>
                <Button data-type="btn-icon">
                    <Icon name="delete" />
                </Button>
            </li>
            <li>
                <span className="proxy-text">
                    <strong>test_dv_proxy1</strong>
                    <br />
                    207.35.238.5:10001 / 1500
                </span>
                <Button data-type="btn-icon">
                    <Icon name="delete" />
                </Button>
            </li>
        </ul>
    );
};
