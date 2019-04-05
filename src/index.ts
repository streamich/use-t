import createTranslations from './createTranslations';

export * from './types';
export const {Consumer, Provider, Trans, context, useT, withT, T} = createTranslations();
