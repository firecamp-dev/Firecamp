import { create } from 'zustand';
import createContext from 'zustand/context';
import _cloneDeep from 'lodash/cloneDeep';
import { TId, IGraphQL } from '@firecamp/types';
import { _object } from '@firecamp/utils';
import { initialiseStoreFromRequest } from '../services/request.service';
import {
  createRequestSlice,
  createPlaygroundsSlice,
  createCollectionSlice,
  createRuntimeSlice,
  createUiSlice,
  createRequestChangeStateSlice,
  createExecutionSlice,
} from './slices';
import { IStore, IStoreState } from './store.type';

const {
  Provider: StoreProvider,
  useStore: useStore,
  useStoreApi: useStoreApi,
} = createContext();

const createStore = (initialState: IStoreState) =>
  create<IStore>((set, get): IStore => {
    return {
      ...createRequestSlice(
        set,
        get,
        initialState.request //_object.pick(initialState.request, requestSliceKeys)
      ),
      ...createPlaygroundsSlice(set, get),
      ...createRuntimeSlice(set, get, initialState.runtime),
      ...createCollectionSlice(set, get),
      ...createUiSlice(set, get, initialState.ui),
      ...createRequestChangeStateSlice(set, get),
      ...createExecutionSlice(set, get),

      initialise: (_request: Partial<IGraphQL>, tabId: TId) => {
        const state = get();
        const requestId = _request.__ref?.id;
        const requestPath = requestId
          ? state.context?.request.getPath(requestId)
          : { path: '', items: [] };
        const initState = initialiseStoreFromRequest(_request, {
          tabId,
          requestPath,
        });
        // console.log(initState, 'initState');
        set((s) => ({
          ...s,
          ...initState,
          originalRequest: _cloneDeep(initState.request) as IGraphQL,
        }));

        // if request has url then fetch introspection on the state initialization
        if (_request.url?.raw?.length) state.fetchIntrospectionSchema();
      },
      setContext: (ctx: any) => set({ context: ctx }),
    };
  });

export { StoreProvider, createStore, useStore, useStoreApi };
