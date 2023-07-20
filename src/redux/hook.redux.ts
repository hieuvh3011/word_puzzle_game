import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppThunkDispatch, RootState} from './store.redux';

export const useAppThunkDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
