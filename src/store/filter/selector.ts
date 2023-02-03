import { RootState } from '@store/store';

const selectFilter = (state: RootState) => ({ filter: state.filter });

export { selectFilter };
