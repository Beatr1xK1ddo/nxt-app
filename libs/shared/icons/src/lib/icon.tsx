import { FC } from 'react';
import { IIconProps } from './types';
import * as icons from './icon-list';

export const Icon: FC<IIconProps> = (props) => {
    const { style, name, color, ...args } = props;
    const IconComponent = icons[name];

    return <IconComponent {...args} style={style} fill={color} />;
};
