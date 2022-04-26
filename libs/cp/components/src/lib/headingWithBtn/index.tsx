import { FC } from 'react';
import './headingWithBtn.css';

type HeadingProps = {
  title: string,
  paragraph: string
}

export const HeadingWithBtn: FC<HeadingProps> = (props) => <aside>
  <h2>{ props.title }</h2>
  <p>
    { props.paragraph }
  </p>
  { props.children }
</aside>