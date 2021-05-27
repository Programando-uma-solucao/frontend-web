import React from 'react';

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode;
};
