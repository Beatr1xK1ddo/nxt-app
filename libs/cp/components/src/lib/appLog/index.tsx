import { FC } from 'react';
import { GridTwoRows, FlexHolder, LogList } from '@nxt-ui/cp/components';
import { Button, CircularProgressWithLabel } from '@nxt-ui/components';
import { Icon } from '@nxt-ui/icons';
import img01 from './assets/img01-small.png';
import ImgGraph01 from './assets/ico-graph01.png';
import ImgGraph02 from './assets/ico-graph02.png';
import ImgGraph03 from './assets/ico-graph03.png';
import './app-log.css';

const postsSpeed = [
    { id: 1, content: <a href="/">239.0.0.4:1234</a> },
    {
        id: 2,
        content: (
            <div>
                <img src={ImgGraph01} alt="title" />
                <p className="speed-ok">7 Mbps</p>
            </div>
        ),
    },
    { id: 3, content: <a href="/">239.0.0.4:1234</a> },
    {
        id: 4,
        content: (
            <div>
                <img src={ImgGraph02} alt="title" />
                <p className="speed-ok">12 Mbps</p>
            </div>
        ),
    },
    { id: 5, content: <a href="/">239.0.0.4:1234</a> },
    {
        id: 6,
        content: (
            <div>
                <img src={ImgGraph03} alt="title" />
                <p className="speed-bad">3.5 Mbps</p>
            </div>
        ),
    },
];
const postsSystemInfo = [
    {
        id: 1,
        content: <span className="text-c text-light">Cpu/Governor mode</span>,
    },
    {
        id: 2,
        content: <strong className="text-c text-bold">1.8% (powersave)</strong>,
    },
    { id: 3, content: <span className="text-c text-light">Load Average</span> },
    {
        id: 4,
        content: (
            <strong className="text-c text-bold">1.49 (CPU cores: 32)</strong>
        ),
    },
    {
        id: 5,
        content: <span className="text-c text-light">Memory</span>,
    },
    {
        id: 6,
        content: <strong className="text-c text-bold">2.37 GB/31.33 GB</strong>,
    },
];
const postsLog = [
    {
        id: 1,
        content: (
            <div>
                <em className="log-time">Jan 5 07:35</em>
                <strong>obe[1320344]: using SAR=1/1</strong>
            </div>
        ),
    },
    {
        id: 2,
        content: (
            <div>
                <em className="log-time">Jan 5 07:33</em>
                <strong>
                    obe[1320344]: Opened DeckLink PCI card 10 (DeckLink Duo 2)
                </strong>
            </div>
        ),
    },
    {
        id: 3,
        content: (
            <div>
                <em className="log-time">Jan 5 07:31</em>
                <strong>
                    kernel: [7722841.356673] obecli[2738148]: segfault at
                    7fdd58000ed8 ip 00007f9d83dfc7e4 sp 00007f9d6c7cff48 error 4
                    in libc-2.31.so[7f9d83c93000+178000]
                </strong>
            </div>
        ),
    },
    {
        id: 4,
        content: (
            <div>
                <em className="log-time">Jan 5 07:35</em>
                <strong>obe[1320344]: using SAR=1/1</strong>
            </div>
        ),
    },
    {
        id: 5,
        content: (
            <div>
                <em className="log-time">Jan 5 07:33</em>
                <strong>
                    obe[1320344]: Opened DeckLink PCI card 10 (DeckLink Duo 2)
                </strong>
            </div>
        ),
    },
    {
        id: 6,
        content: (
            <div>
                <em className="log-time">Jan 5 07:31</em>
                <strong>
                    kernel: [7722841.356673] obecli[2738148]: segfault at
                    7fdd58000ed8 ip 00007f9d83dfc7e4 sp 00007f9d6c7cff48 error 4
                    in libc-2.31.so[7f9d83c93000+178000]
                </strong>
            </div>
        ),
    },
    {
        id: 7,
        content: (
            <div>
                <em className="log-time">Jan 5 07:35</em>
                <strong>obe[1320344]: using SAR=1/1</strong>
            </div>
        ),
    },
];

export const AppLog: FC = () => (
    <aside className="app-log">
        <FlexHolder className="app-info align-top">
            <img src={img01} alt="img title" />
            <CircularProgressWithLabel value={84} />
            <span className="card-status stopped">Stopped</span>
            <Button data-type="btn-icon">
                <Icon name="calendar" />
                <span className="counter">2</span>
            </Button>
            <Button data-type="btn-icon">
                <Icon name="desktop" />
            </Button>
            <Button data-type="btn-icon" style={{ margin: '0 0 0 auto' }}>
                <Icon name="properties" />
            </Button>
        </FlexHolder>

        <GridTwoRows>
            {postsSpeed.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </GridTwoRows>
        <GridTwoRows>
            {postsSystemInfo.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </GridTwoRows>
        <LogList>
            {postsLog.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </LogList>
        <FlexHolder justify="flex-start">
            <Button data-type="btn-icon">
                <Icon name="loop" />
            </Button>
            <Button data-type="btn-icon">
                <Icon name="stop" />
            </Button>
            <Button
                data-type="btn-icon"
                style={{ color: 'var(--danger)', marginLeft: 'auto' }}
            >
                <Icon name="delete" />
            </Button>
        </FlexHolder>
    </aside>
);
