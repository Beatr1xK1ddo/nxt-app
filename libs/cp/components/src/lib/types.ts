export * from "./card/types";
export interface IPost {
    id: number;
    content: React.ReactChild | React.ReactNode;
    heading?: string;
}
