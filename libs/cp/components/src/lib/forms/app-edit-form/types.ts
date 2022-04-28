import { IIpbe } from '@nxt-ui/cp/api';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

export type IFormProps = Partial<IIpbe & { dispatch: Dispatch<AnyAction> }>;