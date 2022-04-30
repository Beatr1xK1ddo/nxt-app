export type PageHeadingProps = {
    children?: React.ReactNode;
    textH1: string;
    content?: number;
    //onClick?(): React.MouseEventHandler<HTMLButtonElement> | undefined;
    clickBtnChild?(): (e:  React.MouseEvent<HTMLButtonElement>) => void;
    
};
