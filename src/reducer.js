export const initialState = {
    inputValue: 1
  }
  
export function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case 'updateInputValue': {
            return { ...state, inputValue: payload };
        }
        default: return state;
    }
}